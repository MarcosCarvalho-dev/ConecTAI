import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { qrcode } from 'vite-plugin-qrcode';

// Plugin do Vite para emular a Serverless Function da Vercel localmente
import nodemailer from 'nodemailer';

const emailPlugin = () => ({
  name: 'email-plugin',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      if (req.url === '/api/send-email' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });
        req.on('end', async () => {
          try {
            const data = JSON.parse(body);
            const { name, email } = data;

            if (!email) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ success: false, message: 'E-mail é obrigatório' }));
            }

            console.log(`[Vite Local] Iniciando envio de e-mail via SMTP para: ${email}`);

            const transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: 'conectaai001@gmail.com',
                pass: 'bluy bvuc atuf vxyi' // Senha de app
              }
            });

            const mailOptions = {
              from: '"ConecTAÍ" <conectaai001@gmail.com>',
              to: email,
              subject: 'Bem-vindo ao ConecTAÍ! Confirmação de Cadastro',
              html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                  <h1 style="color: #1d4ed8;">Seja muito bem-vindo ao ConecTAÍ!</h1>
                  <p>Olá ${name || ''},</p>
                  <p>Seu cadastro no <strong>Marketplace do Microempreendedor</strong> foi realizado com sucesso.</p>
                  <p>Agora você tem acesso a milhares de produtos, serviços e consultorias exclusivas para alavancar seu negócio.</p>
                  <br/>
                  <p>Abraços,</p>
                  <p><strong>Equipe ConecTAÍ</strong></p>
                </div>
              `
            };

            await transporter.sendMail(mailOptions);
            console.log(`✅ [Vite Local] E-mail enviado com sucesso para ${email}!`);

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, message: 'E-mail enviado via SMTP' }));
          } catch (error) {
            console.error('❌ [Vite Local] Erro ao enviar e-mail:', error);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, error: error.message }));
          }
        });
      } else {
        next();
      }
    });
  }
});

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true, // Garante que o Network seja exposto
  },
  plugins: [
    react(), 
    tailwindcss(), 
    emailPlugin(),
    qrcode() // Gera o QR Code gigante no terminal
  ],
})
