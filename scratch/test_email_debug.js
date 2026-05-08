import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

// Manual env loader
const envPath = path.resolve(process.cwd(), '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
    const parts = line.split('=');
    if (parts.length >= 2) {
        const key = parts[0].trim();
        const value = parts.slice(1).join('=').trim();
        env[key] = value;
    }
});

async function testEmail() {
  const pass = env.EMAIL_PASS;
  console.log('Testing Email:', env.EMAIL_USER);
  console.log('Password length:', pass ? pass.length : 0);
  // Do not log the password itself for security, but check the format
  console.log('Password format check (groups of 4?):', pass && pass.split(' ').length === 4);
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: env.EMAIL_USER,
      pass: pass
    }
  });

  const mailOptions = {
    from: `"ConecTAÍ" <${env.EMAIL_USER}>`,
    to: 'hayatoamfm@gmail.com',
    subject: 'Teste de Boas-vindas - ConecTAÍ',
    html: `<h1>Teste Funcional</h1><p>Se você recebeu isso, a nova senha está OK.</p>`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('SUCESSO! E-mail enviado.');
  } catch (err) {
    console.error('FALHA:', err.message);
  }
}

testEmail();
