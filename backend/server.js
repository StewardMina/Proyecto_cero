const express = require('express');
const cors = require('cors'); // <--- 1. Importar cors
const apiRoutes = require('./routes/api');
const { execSync } = require('child_process');

// Run migrations on startup
try {
  console.log('Running database migrations...');
  execSync('npm run migrate', { stdio: 'inherit', cwd: __dirname });
} catch (error) {
  console.error('Migration failed:', error.message);
  process.exit(1);
}

const app = express();

app.use(cors()); // <--- 2. Activar cors antes de las rutas
app.use(express.json());

app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor Proyecto C.E.R.O. corriendo en el puerto ${PORT}`);
});