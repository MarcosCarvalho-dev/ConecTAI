import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

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
  console.log('Testing with secure SMTP (Port 465)...');
  
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: env.EMAIL_USER,
      pass: env.EMAIL_PASS
    }
  });

  try {
    await transporter.verify();
    console.log('AUTENTICAÇÃO COM SUCESSO!');
    
    await transporter.sendMail({
      from: env.EMAIL_USER,
      to: 'hayatoamfm@gmail.com',
      subject: 'Teste de Boas-vindas - ConecTAÍ',
      text: 'Teste de autenticação via porta 465.'
    });
    console.log('EMAIL ENVIADO!');
  } catch (err) {
    console.error('FALHA NA AUTENTICAÇÃO:', err.message);
  }
}

testEmail();
