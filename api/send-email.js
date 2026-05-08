import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'E-mail é obrigatório' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'conectaai001@gmail.com',
        pass: 'bluy bvuc atuf vxyi'
      }
    });

    const mailOptions = {
      from: '"ConecTAÍ" <conectaai001@gmail.com>',
      to: email,
      subject: 'Bem-vindo ao ConecTAÍ! Confirmação de Cadastro',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h1 style="color: #1d4ed8;">Seja muito bem-vindo ao ConecTAÍ!</h1>
          <p>Olá,</p>
          <p>Seu cadastro no <strong>Marketplace do Microempreendedor</strong> foi realizado com sucesso.</p>
          <p>Agora você tem acesso a milhares de produtos, serviços e consultorias exclusivas para alavancar seu negócio.</p>
          <br/>
          <p>Abraços,</p>
          <p><strong>Equipe ConecTAÍ</strong></p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('E-mail enviado:', info.messageId);

    return res.status(200).json({ success: true, message: 'E-mail de confirmação enviado com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    return res.status(500).json({ success: false, error: 'Erro interno ao tentar enviar o e-mail' });
  }
}
