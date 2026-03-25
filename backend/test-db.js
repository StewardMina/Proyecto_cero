const db = require('./config/db');

async function probarConexion() {
    console.log("🔍 Probando conexión con la base de datos...");
    try {
        // Intentamos hacer una consulta simple
        const [rows] = await db.query("SELECT 1 + 1 AS resultado");
        
        if (rows[0].resultado === 2) {
            console.log("✅ ¡ÉXITO! Node.js se conectó correctamente a MySQL.");
            console.log("🚀 El Proyecto C.E.R.O. está listo para recibir reportes.");
        }
    } catch (error) {
        console.error("❌ ERROR de conexión:");
        console.error("Asegúrate de que:");
        console.error("1. MySQL esté encendido.");
        console.error("2. El usuario y contraseña en backend/config/db.js sean correctos.");
        console.error("3. La base de datos 'proyecto_cero' haya sido creada.");
        console.error("\nDetalle técnico:", error.message);
    } finally {
        process.exit();
    }
}

probarConexion();