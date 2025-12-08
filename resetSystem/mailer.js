
const nodemailer = require("nodemailer");

let transporterPromise = null;

async function getTransporter() {
  if (transporterPromise) return transporterPromise;
  transporterPromise = (async () => {
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {

      return nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });
    } else {
   
      const testAccount = await nodemailer.createTestAccount();
      return nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });
    }
  })();
  return transporterPromise;
}

async function sendMail({ to, subject, text, html, from }) {
  const transporter = await getTransporter();
  const info = await transporter.sendMail({
    from: from || process.env.FROM_EMAIL || '"No Reply" <noreply@example.com>',
    to,
    subject,
    text,
    html
  });


  const previewUrl = nodemailer.getTestMessageUrl(info);
  return { info, previewUrl };
}

module.exports = { sendMail };
