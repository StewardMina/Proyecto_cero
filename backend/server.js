const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');
const { execSync } = require('child_process');

// Run migrations on startup
try {
  console.log('🔄 Running database migrations...');
  execSync('npm run migrate', { 
    stdio: 'inherit', 
    cwd: __dirname,
    timeout: 60000
  });
  console.log('✓ Migrations completed');
} catch (error) {
  console.error('✗ Migration error:', error.message);
}

const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'http://localhost:3000'
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Permitir peticiones sin origin (apps móviles, Postman, Railway health checks)
    if (!origin) return callback(null, true);
    if (allowedOrigins.some(o => origin.startsWith(o))) return callback(null, true);
    // Si no hay FRONTEND_URL configurado, permitir cualquier origen de railway.app
    if (!process.env.FRONTEND_URL && origin.includes('railway.app')) return callback(null, true);
    callback(new Error('CORS no permitido'));
  }
}));
app.use(express.json());

app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor Proyecto C.E.R.O. corriendo en el puerto ${PORT}`);
});