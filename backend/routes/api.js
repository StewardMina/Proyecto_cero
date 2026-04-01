const express = require('express');
const router = express.Router();
const { Usuario, Colegio, Reporte, ReportePanico } = require('../models');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const crypto = require('crypto');
const { Resend } = require('resend');
const rateLimit = require('express-rate-limit');

// Máximo 3 reportes de pánico por IP cada 15 minutos
const panicoLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 3,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: 'Demasiados reportes enviados. Espera 15 minutos antes de intentar de nuevo.' },
});

function getResend() {
    return new Resend(process.env.RESEND_API_KEY);
}

// Ruta para carga masiva de estudiantes
router.post('/estudiantes/carga-masiva', async (req, res) => {
    const { estudiantes, colegio_id } = req.body;

    if (!estudiantes || !colegio_id || estudiantes.length === 0) {
        return res.status(400).json({ success: false, message: "Faltan datos." });
    }

    try {
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash('Cero2026*', saltRounds);
        
        const errores = [];
        const insertados = [];

        for (const est of estudiantes) {
            try {
                await Usuario.create({
                    nombre: est.nombre,
                    correo: est.correo.toLowerCase().trim(),
                    password: passwordHash,
                    rol: 'estudiante',
                    grado: est.grado || null,
                    grupo: est.grupo || null,
                    colegio_id: colegio_id,
                    must_change_password: 1
                });
                insertados.push(est.correo);
            } catch (err) {
                if (err.name === 'SequelizeUniqueConstraintError') {
                    errores.push(`${est.correo} (Ya existe en el sistema)`);
                } else {
                    errores.push(`${est.correo} (Error técnico: ${err.message})`);
                }
            }
        }

        if (errores.length > 0 && insertados.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No se pudo registrar a nadie. Verifique los correos.",
                detalles: errores
            });
        }

        res.json({ 
            success: true, 
            message: `Proceso terminado. Registrados: ${insertados.length}.`,
            errores: errores
        });

    } catch (error) {
        console.error("Error general en carga masiva:", error);
        res.status(500).json({ success: false, message: "Error interno del servidor." });
    }
});

// --- RUTAS DE COLEGIOS ---

router.post('/colegios/registro', async (req, res) => {
    const { nit, nombre, password, ubicacion, rector, sector, correo } = req.body;

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const nuevoColegio = await Colegio.create({
            nit, nombre, password: hashedPassword, ubicacion, rector, sector
        });

        await Usuario.create({
            nombre: rector,
            correo: nit,
            correo_recuperacion: correo ? correo.toLowerCase().trim() : null,
            password: hashedPassword,
            rol: 'admin',
            colegio_id: nuevoColegio.id
        });
        
        res.json({ 
            success: true, 
            message: "Colegio y Rector registrados con éxito. Inicie sesión con su NIT." 
        });

    } catch (error) {
        console.error("Error detallado en registro:", error);
        res.status(500).json({ 
            success: false, 
            message: "Error al registrar: " + error.message 
        });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { correo, password } = req.body;
        const { Op } = require('sequelize');

        const user = await Usuario.findOne({
            where: {
                [Op.or]: [
                    { correo: correo },
                    { correo_recuperacion: correo.toLowerCase().trim() }
                ]
            },
            include: [{ model: Colegio, attributes: ['nombre'] }]
        });

        if (user) {
            const coincide = await bcrypt.compare(password, user.password);
            
            if (coincide) {
                return res.json({ 
                    success: true, 
                    user: { 
                        id: user.id, 
                        nombre: user.nombre, 
                        rol: user.rol,
                        colegio_id: user.colegio_id,
                        nombre_colegio: user.Colegio ? user.Colegio.nombre : null,
                        mustChangePassword: user.must_change_password === 1
                    } 
                });
            }
        }
        res.status(401).json({ success: false, message: "Correo o contraseña incorrectos" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// --- RUTAS DE REPORTES ---

router.get('/estadisticas/:colegio_id', async (req, res) => {
    try {
        const { colegio_id } = req.params;
        const { usuario_id, rol } = req.query;

        let whereClause = { colegio_id };
        if (rol !== 'admin') {
            whereClause.usuario_id = usuario_id;
        }

        const reports = await Reporte.findAll({
            where: whereClause,
            include: [{ model: Usuario, as: 'usuario', attributes: ['nombre'] }],
            order: [['fecha', 'DESC']]
        });

        const result = reports.map(r => ({
            ...r.toJSON(),
            nombre_usuario: r.usuario ? r.usuario.nombre : null
        }));

        res.json(result);
    } catch (error) {
        console.error("Error al obtener reportes:", error);
        res.status(500).json({ error: error.message });
    }
});

router.post('/reportes', async (req, res) => {
    const { tipo, descripcion, ubicacion, usuario_id, colegio_id } = req.body;

    if (!usuario_id || !colegio_id) {
        return res.status(400).json({ 
            success: false, 
            message: "Faltan datos de identificación (usuario/colegio)." 
        });
    }

    try {
        await Reporte.create({
            tipo, descripcion, ubicacion, usuario_id, colegio_id, estado: 'nuevo', fecha: new Date()
        });
        res.json({ success: true, message: "Reporte guardado correctamente" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error en el servidor" });
    }
});

router.put('/reportes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { descripcion, estado, seguimiento, tipo } = req.body; 

        const [updated] = await Reporte.update({
            descripcion, estado, seguimiento, tipo, editado: 1
        }, {
            where: { id }
        });

        if (updated === 0) {
            return res.status(404).json({ success: false, message: "No se encontró el reporte" });
        }

        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// --- GESTIÓN DE USUARIOS ---

router.post('/usuarios', async (req, res) => {
    const { nombre, correo, password, rol, grado, grupo, colegio_id, correo_recuperacion } = req.body;

    if (!nombre || !correo || !password || !rol || !colegio_id) {
        return res.status(400).json({ success: false, message: "Faltan datos obligatorios." });
    }

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const nuevoUsuario = await Usuario.create({
            nombre,
            correo: correo.toLowerCase().trim(),
            password: hashedPassword,
            rol,
            grado: grado || null,
            grupo: grupo || null,
            colegio_id,
            must_change_password: 1,
            correo_recuperacion: correo_recuperacion ? correo_recuperacion.toLowerCase().trim() : null
        });

        res.json({ 
            success: true, 
            message: "Usuario creado con éxito.",
            usuario: {
                id: nuevoUsuario.id,
                nombre: nuevoUsuario.nombre,
                correo: nuevoUsuario.correo,
                rol: nuevoUsuario.rol
            }
        });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ success: false, message: "El correo ya está registrado." });
        }
        res.status(500).json({ success: false, message: "Error al crear usuario: " + error.message });
    }
});

router.put('/usuarios/rol/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nuevoRol } = req.body;
        await Usuario.update({ rol: nuevoRol }, { where: { id } });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/usuarios/:colegio_id', async (req, res) => {
    const { colegio_id } = req.params;
    try {
        const users = await Usuario.findAll({
            where: { colegio_id },
            attributes: ['id', 'nombre', 'correo', 'rol', 'grado', 'grupo']
        });
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener usuarios");
    }
});

router.put('/usuarios/password/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nuevaPassword } = req.body;
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(nuevaPassword, saltRounds);

        await Usuario.update({ 
            password: hashedPassword, 
            must_change_password: 0 
        }, { where: { id } });

        res.json({ success: true, message: "Contraseña actualizada correctamente." });
    } catch (error) {
        console.error("Error al actualizar password:", error);
        res.status(500).json({ success: false, message: "Error interno del servidor." });
    }
});

router.post('/usuarios/actualizar-password-inicial', async (req, res) => {
    try {
        const { usuarioId, nuevoPassword } = req.body;

        if (!usuarioId || !nuevoPassword) {
            return res.status(400).json({ success: false, message: "Datos incompletos." });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(nuevoPassword, saltRounds);

        const [updated] = await Usuario.update({ 
            password: hashedPassword, 
            must_change_password: 0 
        }, { where: { id: usuarioId } });

        if (updated === 0) {
            return res.status(404).json({ success: false, message: "Usuario no encontrado." });
        }

        res.json({ 
            success: true, 
            message: "Contraseña actualizada. Ahora puedes acceder al sistema." 
        });
    } catch (error) {
        console.error("Error al actualizar password inicial:", error);
        res.status(500).json({ success: false, message: "Error interno del servidor." });
    }
});

router.delete('/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Usuario.findByPk(id);
        
        if (!user) {
            return res.status(404).json({ success: false, message: "Usuario no encontrado." });
        }

        if (user.rol === 'admin' || user.rol === 'rector') {
            return res.status(403).json({ 
                success: false, 
                message: "Protección de seguridad: No se pueden eliminar usuarios de nivel administrativo." 
            });
        }

        await user.destroy();
        res.json({ success: true, message: "Usuario eliminado correctamente." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error al intentar eliminar." });
    }
});

// ─── BASE DE CONOCIMIENTO LOCAL ───────────────────────────────────────────────
function respuestaLocal(mensaje) {
    const c = mensaje.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    if (/hola|buenos|buenas|saludos/.test(c))
        return '¡Hola! Soy el asistente de C.E.R.O. Puedo ayudarte con información sobre acoso escolar, Ley 1620, cómo reportar casos y más. ¿En qué puedo ayudarte?';

    if (/ley 1620|ley1620/.test(c))
        return 'La Ley 1620 de 2013 crea el Sistema Nacional de Convivencia Escolar en Colombia. Establece el Comité de Convivencia en cada institución y define tres tipos de situaciones: Tipo I (conflictos esporádicos), Tipo II (acoso sistemático/ciberacoso) y Tipo III (presuntos delitos). Su objetivo es proteger a estudiantes y garantizar ambientes escolares seguros.';

    if (/tipo i|tipo 1|conflicto esporadico/.test(c))
        return 'La Situación Tipo I corresponde a conflictos esporádicos o malentendidos entre estudiantes que no afectan de forma sistemática la integridad. Se resuelven mediante diálogo, mediación y compromisos entre las partes. El colegio debe dar respuesta en máximo 5 días hábiles.';

    if (/tipo ii|tipo 2|acoso|bullying|ciberacoso|hostigamiento/.test(c))
        return 'La Situación Tipo II es acoso escolar (bullying) o ciberacoso: agresiones repetitivas que dañan gravemente el bienestar del estudiante. Incluye burlas sistemáticas, exclusión social, amenazas y hostigamiento en redes. Requiere intervención del Comité de Convivencia y seguimiento obligatorio.';

    if (/tipo iii|tipo 3|delito|agresion grave|abuso|extorsion/.test(c))
        return 'La Situación Tipo III involucra hechos que por su gravedad constituyen presuntos delitos: agresión física grave, abuso sexual, extorsión, porte de armas. Requiere intervención inmediata de autoridades como el ICBF, Policía de Infancia y Adolescencia o la Fiscalía, además del protocolo escolar.';

    if (/reportar|reporte|denunciar|como report/.test(c))
        return 'Para reportar un caso en C.E.R.O.: inicia sesión con tu usuario, ve al panel y haz clic en "Nuevo Reporte". Describe los hechos con detalle, indica la ubicación y puedes hacerlo de forma anónima. El Comité de Convivencia revisará tu reporte y realizará el seguimiento correspondiente.';

    if (/anonimo|anonimato|identidad|privacidad/.test(c))
        return 'Sí, los reportes pueden ser totalmente anónimos. Tu identidad estará protegida y solo el administrador y rector podrán gestionar los casos. Reportar de forma anónima es válido y tiene el mismo peso que un reporte con nombre.';

    if (/señales|señal|como saber|identificar|victima/.test(c))
        return 'Señales de alerta en víctimas de acoso: rechazo repentino a ir al colegio, cambios de humor o tristeza constante, bajo rendimiento académico, pérdida frecuente de objetos, heridas sin explicación, aislamiento de amigos y familia, o cambios en el uso del celular. Si notas estas señales, actúa con empatía y orienta a la persona a pedir ayuda.';

    if (/verbal/.test(c))
        return 'El acoso verbal incluye insultos, apodos ofensivos, burlas sistemáticas, amenazas y humillaciones repetidas. Aunque no deja marcas físicas, causa daño emocional grave. Si lo estás viviendo, guarda evidencias, cuéntaselo a un adulto de confianza y repórtalo en C.E.R.O.';

    if (/fisico|golpe|empujon|daño|danar/.test(c))
        return 'El acoso físico incluye golpes, empujones, daño intencional a objetos personales o cualquier contacto físico no deseado. Es una Situación Tipo II o III según la gravedad. Debes reportarlo de inmediato al colegio y, si hay lesiones, buscar atención médica y notificar a tus padres o acudientes.';

    if (/cibera|redes|internet|whatsapp|instagram|tiktok|foto|video/.test(c))
        return 'El ciberacoso es el hostigamiento a través de medios digitales: mensajes ofensivos, difusión de fotos/videos sin consentimiento, exclusión de grupos, suplantación de identidad. Es Situación Tipo II. Guarda capturas de pantalla como evidencia, bloquea al agresor y repórtalo en C.E.R.O. y a la plataforma digital.';

    if (/icbf|linea|emergencia|ayuda|numero|telefono/.test(c))
        return 'Líneas de ayuda disponibles:\n• ICBF: 018000 918080 (gratuita, 24/7)\n• Línea 106: salud mental para niños y adolescentes (gratuita)\n• Policía Nacional: 123\n• Defensoría del Pueblo: 01800 914814\nNo dudes en llamar si tú o alguien que conoces está en riesgo.';

    if (/comite|convivencia|quienes|quien resuelve/.test(c))
        return 'El Comité de Convivencia Escolar es el órgano institucional encargado de gestionar los conflictos según la Ley 1620. Está conformado por el rector, el personero estudiantil, docentes y padres de familia. Su función es prevenir, atender y hacer seguimiento a los casos de convivencia reportados.';

    if (/padres|familia|acudiente|que hacer como padre/.test(c))
        return 'Si eres padre o acudiente y sospechas que tu hijo/a sufre acoso: escúchalo sin juzgar, visita el colegio y habla con el director de grupo o rector, solicita una reunión con el Comité de Convivencia y, si es necesario, acude al ICBF. Mantén comunicación abierta en casa y refuerza su autoestima.';

    if (/docente|profesor|maestro|que hacer como profe/.test(c))
        return 'Como docente, si detectas acoso escolar debes: documentar los hechos observados, informar al rector y al Comité de Convivencia, intervenir para separar a las partes, nunca minimizar la situación, y hacer seguimiento al estudiante afectado. La Ley 1620 establece que los docentes son corresponsables de la convivencia escolar.';

    if (/cero|plataforma|sistema|app/.test(c))
        return 'C.E.R.O. (Convivencia Escolar con Respeto y Orden) es una plataforma digital que permite reportar, gestionar y hacer seguimiento a casos de convivencia escolar según la Ley 1620. Estudiantes reportan casos (anónimos o no), y el Comité de Convivencia los gestiona clasificándolos en Tipo I, II o III según su gravedad.';

    if (/gracias|listo|ok|perfecto|entendi/.test(c))
        return 'Con gusto. Recuerda que ante cualquier situación de acoso o malestar, no estás solo/a. Puedes usar C.E.R.O. para reportar o llamar a la línea 106. ¡Cuídate mucho!';

    return 'No tengo información específica sobre eso, pero puedo ayudarte con temas como: acoso escolar, Ley 1620, tipos de situaciones (I, II, III), cómo reportar, ciberacoso, señales de alerta o líneas de ayuda. ¿Sobre cuál de estos temas tienes dudas?';
}

// ─── CHATBOT IA ───────────────────────────────────────────────────────────────
router.post('/chatbot', async (req, res) => {
    const { mensaje, historial } = req.body;
    if (!mensaje) return res.status(400).json({ success: false, message: 'Mensaje vacío.' });

    // Sin API key → base de conocimiento local
    if (!process.env.ANTHROPIC_API_KEY) {
        const respuesta = respuestaLocal(mensaje);
        return res.json({ success: true, respuesta });
    }

    try {
        const Anthropic = require('@anthropic-ai/sdk');
        const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

        const systemPrompt = `Eres el asistente virtual de C.E.R.O. (Convivencia Escolar con Respeto y Orden), una plataforma colombiana de gestión del clima escolar alineada con la Ley 1620 de 2013.

Tu rol es orientar a estudiantes, docentes, rectores y padres de familia sobre:

1. LEY 1620 DE 2013:
- Crea el Sistema Nacional de Convivencia Escolar y Formación para los Derechos Humanos
- Establece el Comité de Convivencia Escolar en cada institución
- Define tres tipos de situaciones:
  * TIPO I: Conflictos esporádicos, malentendidos, diferencias sin daño sistemático. Se resuelven con diálogo y mediación.
  * TIPO II: Acoso escolar (bullying) o ciberacoso repetitivo que afecta el bienestar. Requiere intervención del Comité de Convivencia.
  * TIPO III: Situaciones que constituyen presuntos delitos (agresión grave, abuso, extorsión). Requieren intervención de autoridades judiciales (ICBF, Policía, Fiscalía).

2. TIPOS DE ACOSO ESCOLAR:
- Verbal: insultos, apodos, amenazas, burlas repetidas
- Físico: golpes, empujones, daño a objetos personales
- Social/Relacional: exclusión, rumores, aislamiento
- Ciberacoso: hostigamiento por redes sociales, mensajes, difusión de contenido sin consentimiento
- Sexual: comentarios o tocamientos inapropiados

3. SEÑALES DE ALERTA en víctimas:
- Cambios de humor, tristeza o ansiedad
- Rechazo a ir al colegio
- Bajo rendimiento académico repentino
- Heridas sin explicación
- Pérdida de objetos
- Aislamiento de amigos y familia

4. CÓMO USAR C.E.R.O.:
- Estudiantes pueden enviar reportes anónimos o con nombre
- Los reportes son revisados por el Comité de Convivencia
- Se hace seguimiento y gestión del caso
- El administrador categoriza el tipo de situación

5. DERECHOS Y PROTOCOLOS:
- Toda víctima tiene derecho a protección, escucha y respuesta oportuna
- El colegio tiene 5 días hábiles para dar respuesta a un Tipo I, acción inmediata para Tipo II/III
- ICBF: 018000 918080 (línea gratuita)
- Línea 106: salud mental adolescentes (gratuita)
- Policía Nacional: 123

6. CONSEJOS PARA VÍCTIMAS:
- No estás solo/a, pedir ayuda es un acto de valentía
- Guarda evidencias (capturas, mensajes)
- Cuéntale a un adulto de confianza
- No respondas agresiones con más agresión
- Usa la plataforma C.E.R.O. para reportar

Responde siempre en español, de forma empática, clara y concisa. Máximo 3 párrafos por respuesta. Si la pregunta no está relacionada con convivencia escolar, bullying, Ley 1620 o C.E.R.O., redirige amablemente al tema.`;

        const messages = [];
        if (historial && Array.isArray(historial)) {
            historial.slice(-6).forEach(msg => {
                messages.push({
                    role: msg.emisor === 'usuario' ? 'user' : 'assistant',
                    content: msg.texto
                });
            });
        }
        messages.push({ role: 'user', content: mensaje });

        const response = await client.messages.create({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 400,
            system: systemPrompt,
            messages
        });

        res.json({ success: true, respuesta: response.content[0].text });
    } catch (error) {
        console.error('Error chatbot IA, usando respuesta local:', error.message);
        const respuesta = respuestaLocal(mensaje);
        res.json({ success: true, respuesta });
    }
});

// --- RESTAURAR CONTRASEÑA ---

router.post('/auth/forgot-password', async (req, res) => {
    try {
        const { correo } = req.body;
        if (!correo) return res.status(400).json({ success: false, message: "Ingresa tu correo." });

        const correoNorm = correo.toLowerCase().trim();
        let usuario;
        try {
            usuario = await Usuario.findOne({
                where: {
                    [Op.or]: [
                        { correo: correoNorm },
                        { correo_recuperacion: correoNorm }
                    ]
                }
            });
        } catch (dbErr) {
            // Si correo_recuperacion no existe aún en la BD, buscar solo por correo
            usuario = await Usuario.findOne({ where: { correo: correoNorm } });
        }
        // Siempre responder igual para no revelar si el correo existe
        if (!usuario) {
            return res.json({ success: true, message: "Si el correo está registrado, recibirás un enlace." });
        }

        const token = crypto.randomBytes(32).toString('hex');
        const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hora

        await usuario.update({ reset_token: token, reset_token_expires: expires });

        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        const resetLink = `${frontendUrl}?token=${token}`;

        if (!process.env.RESEND_API_KEY) {
            return res.status(500).json({ success: false, message: "El servicio de correo no está configurado. Contacta al administrador." });
        }

        const resend = getResend();
        const destinatario = usuario.correo_recuperacion || usuario.correo;
        await resend.emails.send({
            from: 'Proyecto C.E.R.O. <onboarding@resend.dev>',
            to: destinatario,
            subject: 'Restaurar contraseña - Proyecto C.E.R.O.',
            html: `
                <div style="font-family:Arial,sans-serif;max-width:500px;margin:auto;padding:24px;border:1px solid #e5e7eb;border-radius:16px;">
                    <h2 style="color:#1e3a8a;text-align:center;">Proyecto C.E.R.O.</h2>
                    <p>Hola <strong>${usuario.nombre}</strong>,</p>
                    <p>Recibimos una solicitud para restaurar tu contraseña. Haz clic en el botón para crear una nueva:</p>
                    <div style="text-align:center;margin:32px 0;">
                        <a href="${resetLink}" style="background:#2563eb;color:#fff;padding:14px 28px;border-radius:12px;text-decoration:none;font-weight:bold;">
                            Restaurar contraseña
                        </a>
                    </div>
                    <p style="color:#6b7280;font-size:12px;">Este enlace vence en 1 hora. Si no solicitaste esto, ignora este correo.</p>
                </div>
            `
        });

        res.json({ success: true, message: "Si el correo está registrado, recibirás un enlace." });
    } catch (error) {
        console.error("Error forgot-password:", error);
        res.status(500).json({ success: false, message: "Error al enviar el correo. Intenta de nuevo." });
    }
});

router.post('/auth/reset-password', async (req, res) => {
    try {
        const { token, nuevaPassword } = req.body;
        if (!token || !nuevaPassword) {
            return res.status(400).json({ success: false, message: "Datos incompletos." });
        }

        const usuario = await Usuario.findOne({
            where: {
                reset_token: token,
                reset_token_expires: { [Op.gt]: new Date() }
            }
        });

        if (!usuario) {
            return res.status(400).json({ success: false, message: "El enlace no es válido o ya expiró." });
        }

        const hash = await bcrypt.hash(nuevaPassword, 10);
        await usuario.update({
            password: hash,
            must_change_password: 0,
            reset_token: null,
            reset_token_expires: null
        });

        res.json({ success: true, message: "Contraseña actualizada correctamente. Ya puedes iniciar sesión." });
    } catch (error) {
        console.error("Error reset-password:", error);
        res.status(500).json({ success: false, message: "Error interno del servidor." });
    }
});

// ─── BOTÓN DEL PÁNICO ────────────────────────────────────────────────────────

// POST /panico/reporte — crea reporte de emergencia y notifica a las autoridades
router.post('/panico/reporte', panicoLimiter, async (req, res) => {
    const { latitud, longitud, direccion, descripcion, tipo_archivo, archivo_base64, nombre_archivo, mime_type } = req.body;

    try {
        // Bloquear si ya hay un reporte reciente de la misma IP en los últimos 10 minutos
        const ip = req.ip || req.headers['x-forwarded-for'] || 'desconocida';
        try {
            const hace10min = new Date(Date.now() - 10 * 60 * 1000);
            const reporteReciente = await ReportePanico.findOne({
                where: { ip_origen: ip, fecha: { [Op.gte]: hace10min } },
            });
            if (reporteReciente) {
                return res.status(429).json({
                    success: false,
                    message: 'Ya enviaste un reporte de emergencia recientemente. Por favor espera antes de enviar otro.',
                });
            }
        } catch (_) { /* columna ip_origen aún no existe, ignorar */ }

        const reporte = await ReportePanico.create({
            latitud: latitud || null,
            longitud: longitud || null,
            direccion: direccion || null,
            descripcion: descripcion || null,
            tipo_archivo: tipo_archivo || null,
            archivo_base64: archivo_base64 || null,
            nombre_archivo: nombre_archivo || null,
            mime_type: mime_type || null,
            fecha: new Date(),
            estado: 'recibido',
            ...(ip ? { ip_origen: ip } : {}),
        });

        // Enviar correo de alerta a las autoridades
        const emailAutoridades = process.env.PANICO_EMAIL;
        let emailEnviado = false;
        let emailError = null;

        if (!emailAutoridades) {
            console.error('[PANICO] PANICO_EMAIL no está configurado.');
        } else if (!process.env.RESEND_API_KEY) {
            console.error('[PANICO] RESEND_API_KEY no está configurado.');
        } else {
            try {
                const resend = getResend();
                const mapaUrl = latitud && longitud
                    ? `https://www.google.com/maps?q=${latitud},${longitud}`
                    : null;

                // Procesar imagen
                let attachments = [];
                let htmlArchivo = '';
                const MAX_ATTACH_BYTES = 8 * 1024 * 1024; // 8MB

                if (archivo_base64 && mime_type && mime_type.startsWith('image/')) {
                    const rawBase64 = archivo_base64.replace(/^data:[^;]+;base64,/, '');
                    const imgBuffer = Buffer.from(rawBase64, 'base64');

                    if (imgBuffer.length <= MAX_ATTACH_BYTES) {
                        attachments = [{
                            filename: nombre_archivo || 'evidencia.jpg',
                            content: imgBuffer,
                        }];
                        htmlArchivo = `<p><strong>Evidencia fotográfica adjunta al correo.</strong></p>`;
                    } else {
                        htmlArchivo = `<p><strong>Evidencia:</strong> Imagen almacenada en el sistema (${(imgBuffer.length / 1024 / 1024).toFixed(1)} MB). Consultar reporte #${reporte.id}.</p>`;
                    }
                }

                const { data, error: resendError } = await resend.emails.send({
                    from: 'ALERTA PANICO C.E.R.O. <onboarding@resend.dev>',
                    to: emailAutoridades,
                    subject: `ALERTA DE PANICO #${reporte.id} - ${new Date().toLocaleString('es-CO')}`,
                    html: `
                    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;">
                        <div style="background:#dc2626;color:white;padding:20px;border-radius:8px 8px 0 0;text-align:center;">
                            <h1 style="margin:0;font-size:24px;">ALERTA DE PANICO</h1>
                            <p style="margin:5px 0 0;">Reporte #${reporte.id} - Sistema C.E.R.O.</p>
                        </div>
                        <div style="background:#fff;padding:20px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;">
                            <p><strong>Fecha y hora:</strong> ${new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' })}</p>
                            ${latitud && longitud ? `
                            <p><strong>Ubicación GPS:</strong><br>
                            Latitud: ${latitud} | Longitud: ${longitud}<br>
                            ${direccion ? `Dirección aproximada: ${direccion}<br>` : ''}
                            <a href="${mapaUrl}" style="color:#2563eb;font-weight:bold;">Ver en Google Maps</a></p>
                            ` : '<p><strong>Ubicación:</strong> No disponible (GPS no compartido)</p>'}
                            ${descripcion ? `<p><strong>Descripción del incidente:</strong><br>${descripcion}</p>` : ''}
                            ${htmlArchivo}
                            <hr style="border:1px solid #e5e7eb;margin:20px 0;">
                            <p style="color:#6b7280;font-size:12px;">Este mensaje fue generado automáticamente por el sistema C.E.R.O.</p>
                        </div>
                    </div>`,
                    attachments,
                });

                if (resendError) {
                    throw new Error(JSON.stringify(resendError));
                }

                emailEnviado = true;
                console.log(`[PANICO] Email enviado. ID Resend: ${data?.id}`);
            } catch (emailErr) {
                emailError = emailErr.message;
                console.error('[PANICO] Error enviando email:', emailErr.message);
            }
        }

        res.json({ success: true, id: reporte.id, message: 'Reporte de emergencia enviado.', emailEnviado, emailError });
    } catch (error) {
        console.error('Error creando reporte de pánico:', error);
        res.status(500).json({ success: false, message: 'Error al enviar el reporte.' });
    }
});

// GET /panico/reportes — lista reportes de pánico (solo para uso administrativo)
router.get('/panico/reportes', async (req, res) => {
    try {
        const reportes = await ReportePanico.findAll({
            attributes: ['id', 'latitud', 'longitud', 'direccion', 'descripcion', 'tipo_archivo', 'nombre_archivo', 'mime_type', 'fecha', 'estado'],
            order: [['fecha', 'DESC']],
        });
        res.json({ success: true, reportes });
    } catch (error) {
        console.error('Error obteniendo reportes de pánico:', error);
        res.status(500).json({ success: false, message: 'Error del servidor.' });
    }
});

module.exports = router;
