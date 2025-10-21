const express = require("express");
const router = express.Router();
const User = require("../models/User");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const researchRoutes = require("./routes/research");

app.use("/api/research", researchRoutes);

// 🔐 ЛОГИН МАРШРУТЫ
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Email табылмады" });

    if (!user.isVerified) {
      return res.status(401).json({ message: "Email растау қажет" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Құпиясөз қате" });
    }

    res.status(200).json({ message: "Кіру сәтті", user });
  } catch (error) {
    res.status(500).json({ message: "Сервер қатесі", error });
  }
});


// ✉️ Құпиясөзді ұмыту — /forgot-password
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Қолданушы табылмады" });

    const token = crypto.randomBytes(32).toString("hex");
    user.resetToken = token;
    user.resetTokenExpire = Date.now() + 3600000; // 1 сағат
    await user.save();

    const resetLink = `http://localhost:5173/resetPassword/${token}`;

    // Бұл тек тест үшін — нақты SMTP қолдану керек
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "argynmarat27@gmail.com", // өз email-ің
        pass: "aovt zzhl ukgg cyoz", // App Password қолдан
      },
    });

    await transporter.sendMail({
      from: "Сайт Қолдауы <youremail@gmail.com>",
      to: user.email,
      subject: "Құпиясөзді қалпына келтіру",
      html: `<p>Құпиясөзді өзгерту үшін мына сілтемеге өтіңіз:</p><a href="${resetLink}">${resetLink}</a>`,
    });

    res.json({ message: "Қалпына келтіру сілтемесі жіберілді" });
  } catch (err) {
    console.error("Қате:", err);
    res.status(500).json({ message: "Қате болды" });
  }
});


// 🔁 Жаңа құпиясөзді орнату — /reset-password/:token
router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpire: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: "Токен жарамсыз немесе ескірген" });

    user.password = password;
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;
    await user.save();

    res.json({ message: "Құпиясөз сәтті жаңартылды" });
  } catch (err) {
    res.status(500).json({ message: "Қате орын алды" });
  }
});


module.exports = router;
