import nodemailer from 'nodemailer';

async function testEmail() {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'conectaai001@gmail.com',
      pass: 'atgpnsmembxfftkg'
    }
  });

  const mailOptions = {
    from: '"Conecta Aí" <conectaai001@gmail.com>',
    to: 'conectaai001@gmail.com',
    subject: 'Teste Conecta Aí',
    text: 'Funciona sem espacos?'
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Success:', info.messageId);
  } catch (err) {
    console.error('Error:', err.message);
  }
}

testEmail();
