const QRCode = require('qrcode');
const path = require('path');

const url = 'https://proyectocero-production.up.railway.app';
const outputPath = path.join(__dirname, 'dactacero-qr.png');

QRCode.toFile(outputPath, url, {
  type: 'png',
  width: 600,
  margin: 2,
  color: {
    dark: '#000000',
    light: '#ffffff'
  },
  errorCorrectionLevel: 'H'
}, (err) => {
  if (err) {
    console.error('Error generando QR:', err);
    process.exit(1);
  }
  console.log(`QR generado exitosamente: ${outputPath}`);
});
