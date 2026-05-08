import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

// Manual env loader
const envPath = path.resolve(process.cwd(), '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) env[key.trim()] = value.trim();
});

async function testEmail() {
  console.log('Using Email:', env.EMAIL_USER);
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: env.EMAIL_USER,
      pass: env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: `"ConecTAÍ" <${env.EMAIL_USER}>`,
    to: 'hayatoamfm@gmail.com',
    subject: 'Teste de Boas-vindas - ConecTAÍ',
    html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h1 style="color: #1d4ed8;">Teste de Conexão Bem-sucedido!</h1>
          <p>Olá,</p>
          <p>Este é um e-mail de teste solicitado para validar a nova configuração de segurança do <strong>ConecTAÍ</strong>.</p>
          <p>Se você recebeu este e-mail, significa que o sistema de envio programático (via API) está funcionando corretamente com a nova senha de app.</p>
          <br/>
          <p>Abraços,</p>
          <p><strong>Equipe ConecTAÍ</strong></p>
        </div>
      `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('E-mail enviado com sucesso para hayatoamfm@gmail.com!');
    console.log('ID da mensagem:', info.messageId);
  } catch (err) {
    console.error('ERRO AO ENVIAR EMAIL:', err.message);
  }
}

testEmail();
