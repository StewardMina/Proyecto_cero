const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

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

app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor Proyecto C.E.R.O. corriendo en el puerto ${PORT}`);
});