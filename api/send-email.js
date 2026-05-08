import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { email, name = 'Usuário' } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'E-mail é obrigatório' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: '"ConecTAÍ" <conectaai001@gmail.com>',
      to: email,
      subject: 'Bem-vindo ao ConecTAÍ! Sua nova plataforma de conexões',
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-w-lg; margin: 0 auto; padding: 30px; background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <div style="text-align: center; margin-bottom: 25px;">
            <!-- A logo anexada será referenciada aqui (certifique-se de que a imagem 'logo.png' esteja na pasta public do seu projeto na Vercel) -->
            <img src="https://conec-tai.vercel.app/logo.png" alt="ConecTAÍ Logo" style="max-height: 80px; width: auto;" />
          </div>
          
          <h1 style="color: #1d4ed8; text-align: center; font-size: 24px; margin-bottom: 20px;">Olá, ${name}! Bem-vindo ao ConecTAÍ 🚀</h1>
          
          <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 15px;">
            É um prazer ter você conosco! O <strong>ConecTAÍ</strong> é a sua plataforma definitiva que conecta clientes diretamente aos melhores vendedores e prestadores de serviços, criando um ambiente seguro e dinâmico para negócios.
          </p>
          
          <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 15px;">
            Seja você um profissional autônomo, um microempreendedor, uma grande empresa, ou alguém buscando os melhores serviços, aqui você encontra o espaço ideal para crescer e se conectar.
          </p>

          <div style="background-color: #f8fafc; border-left: 4px solid #10b981; padding: 15px; margin: 25px 0; border-radius: 0 8px 8px 0;">
            <h3 style="color: #0f172a; margin-top: 0; margin-bottom: 10px;">💡 Quer empreender melhor?</h3>
            <p style="color: #475569; font-size: 15px; line-height: 1.5; margin: 0;">
              Descubra nossa área de <strong>Consultoria</strong>! Se você deseja otimizar sua gestão ou tem dúvidas sobre finanças, nós oferecemos acesso aos melhores especialistas financeiros do mercado. Eles estão prontos para te ajudar a estruturar e expandir o seu negócio com segurança.
            </p>
          </div>
          
          <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
            Acesse a plataforma agora mesmo, explore o Marketplace e comece a fechar negócios!
          </p>
          
          <div style="text-align: center; margin-bottom: 30px;">
            <a href="https://conec-tai.vercel.app" style="background-color: #1d4ed8; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Acessar o ConecTAÍ</a>
          </div>

          <hr style="border: none; border-top: 1px solid #e2e8f0; margin-bottom: 20px;" />
          
          <p style="text-align: center; color: #94a3b8; font-size: 13px; margin: 0;">
            © ${new Date().getFullYear()} ConecTAÍ. Todos os direitos reservados.
          </p>
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
