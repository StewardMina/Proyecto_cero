const express = require('express');
const router = express.Router();
const { Usuario, Colegio, Reporte } = require('../models');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

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
    const { nit, nombre, password, ubicacion, rector, sector } = req.body;
    
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const nuevoColegio = await Colegio.create({
            nit, nombre, password: hashedPassword, ubicacion, rector, sector
        });

        await Usuario.create({
            nombre: rector,
            correo: nit,
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
        
        const user = await Usuario.findOne({
            where: { correo },
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
    const { nombre, correo, password, rol, grado, grupo, colegio_id } = req.body;
    
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
            must_change_password: 1
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

// ─── CHATBOT IA ───────────────────────────────────────────────────────────────
router.post('/chatbot', async (req, res) => {
    const { mensaje, historial } = req.body;
    if (!mensaje) return res.status(400).json({ success: false, message: 'Mensaje vacío.' });

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
        console.error('Error chatbot:', error.message);
        res.status(500).json({ success: false, message: 'Error al procesar tu pregunta.' });
    }
});

module.exports = router;
