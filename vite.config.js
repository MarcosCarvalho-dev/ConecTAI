import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { qrcode } from 'vite-plugin-qrcode';

// Plugin do Vite para interceptar chamadas e disparar e-mails via Nodemailer
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

            // Automação: Monta a URL do Gmail com os dados preenchidos
            const subject = encodeURIComponent("Boas vindas novo usuario da plataforma ConecTAÍ");
            const mailBody = encodeURIComponent(
                `Olá ${name.trim()}!\n\n` +
                `Bem-vindo(a) ao ConecTAÍ! Seu cadastro foi realizado com sucesso.\n` +
                `Agora você já pode acessar nossa plataforma para comprar ou vender seus produtos e serviços.\n\n` +
                `Estamos muito felizes em ter você conosco!\n\n` +
                `Atenciosamente,\n` +
                `Equipe ConecTAÍ`
            );
            
            const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email.trim()}&su=${subject}&body=${mailBody}`;

            // Abre o Chrome minimizado na barra de tarefas com o e-mail já preenchido
            const { exec } = require('child_process');
            exec(`Start-Process -WindowStyle Minimized -FilePath "chrome" -ArgumentList "--new-window \\"${gmailUrl}\\""`, { shell: 'powershell.exe' }, (error) => {
                if (error) {
                    console.error("⚠️ Erro ao abrir o Chrome minimizado:", error.message);
                } else {
                    console.log(`\n✅ Chrome aberto minimizado com o e-mail para ${email.trim()} pronto para envio.`);
                }
            });

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, message: 'Chrome minimizado acionado' }));
          } catch (error) {
            console.error('Email plugin error:', error);
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
