import nodemailer from 'nodemailer';

async function testEmail() {
  let transporter;
  try {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'conectaai001@gmail.com',
        pass: 'bluy bvuc atuf vxyi'
      }
    });
    await transporter.verify();
    console.log("Gmail works!");
  } catch (err) {
    console.log("Gmail failed. Falling back to Ethereal.");
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  }

  const mailOptions = {
    from: '"Conecta Aí" <contato@conectaai.com>',
    to: 'teste@example.com',
    subject: 'Teste Conecta Aí',
    text: 'A nova senha de app funciona?'
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Success:', info.messageId);
    const url = nodemailer.getTestMessageUrl(info);
    if(url) {
        console.log('Preview URL:', url);
    }
  } catch (err) {
    console.error('Error:', err.message);
  }
}

testEmail();
