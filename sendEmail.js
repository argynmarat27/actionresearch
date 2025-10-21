const nodemailer = require('nodemailer');
require('dotenv').config(); // .env айнымалыларын оқу

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

   await transporter.sendMail({
  from: `"Action Research" <${process.env.EMAIL_USER}>`,
  to: email,
  subject: "Поштаңызды растаңыз",
  html: `
    <p>Сәлем, ${fullName}!</p>
    <p>Тіркеуді аяқтау үшін мына сілтемені басыңыз:</p>
    <a href="${verificationLink}">${verificationLink}</a>
  `,
});

    await transporter.sendMail(mailOptions);
    console.log('✅ Email жіберілді!');
  } catch (err) {
    console.error('❌ Email жіберу қатесі:', err); // Қате нақты шығады
    throw err; // Қатені қайта лақтыру — тіркелу процесі білсін
  }
};

module.exports = sendEmail;