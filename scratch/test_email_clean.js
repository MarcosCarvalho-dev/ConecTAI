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
  const rawPass = env.EMAIL_PASS;
  const cleanPass = rawPass.replace(/\s/g, ''); // REMOVE SPACES
  
  console.log('Testing Email:', env.EMAIL_USER);
  console.log('Clean Password length:', cleanPass.length);
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: env.EMAIL_USER,
      pass: cleanPass
    }
  });

  const mailOptions = {
    from: `"ConecTAÍ" <${env.EMAIL_USER}>`,
    to: 'hayatoamfm@gmail.com',
    subject: 'Teste Final de Credenciais - ConecTAÍ',
    html: `<h1>Teste com Senha Limpa</h1><p>Se este e-mail chegou, era o espaço na senha que estava atrapalhando.</p>`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('SUCESSO TOTAL! E-mail enviado.');
  } catch (err) {
    console.error('FALHA AINDA PERSISTE:', err.message);
  }
}

testEmail();
