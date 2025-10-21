const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const User = require("../models/User");

// ✅ Фото сақтау
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// ✅ Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ Тіркелу
router.post("/register", upload.single("photo"), async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      organization,
      specialty,
      experience,
      grade,
      teacher,
      gender,
      birthdate,
      role,
    } = req.body;

    const photo = req.file ? req.file.filename : null;

    // Почта бұрын тіркелген бе?
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Бұл почта бұрын қолданылған." });

    // ✅ Растау токені
    const emailVerificationToken = crypto.randomBytes(32).toString("hex");
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Жаңа пайдаланушы
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      organization,
      specialty,
      experience,
      grade,
      teacher,
      gender,
      birthDate: birthdate,
      role,
      photo,
      emailVerificationToken,
      emailVerified: false,
    });

    await newUser.save();

    // ✅ Сілтеме жасау
    const verificationLink = `${process.env.CLIENT_URL}/verify/${emailVerificationToken}`;

    // 📧 Пошта жіберу
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

    console.log("✅ Растау сілтемесі жіберілді:", verificationLink);
    res
      .status(201)
      .json({ message: "Поштаңызды растаңыз! Сілтеме жіберілді." });
  } catch (error) {
    console.error("❌ Тіркелу қатесі:", error);
    res.status(500).json({ message: "Тіркелу сәтсіз аяқталды." });
  }
});

// ✅ Растау
// ✅ Растау
router.get('/verify/:token', async (req, res) => {
  try {
    const token = req.params.token;
    console.log("Түскен token:", token); 
    const user = await User.findOne({ emailVerificationToken: token });

    if (!user) {
      console.log("Пайдаланушы табылмады.");
      return res.status(400).json({ message: 'Сілтеме жарамсыз немесе қате.' });
    }
     console.log("Пайдаланушы:", user.email);

    user.emailVerified = true;
    user.emailVerificationToken = null;
    await user.save();

    return res.status(200).json({ message: "Пошта сәтті расталды!" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Сервер қатесі.");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Пайдаланушы табылмады." });
    }

    if (!user.emailVerified) {
      return res.status(403).json({ message: "Пошта расталмаған. Алдымен растаңыз." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Құпиясөз қате." });
    }

    // ✅ JWT токен жасау
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET, // 👈 .env ішіндегі құпия сөз
      { expiresIn: "1h" }
    );

    // ✅ МІНЕ ОСЫ КЕРЕК:
    res.status(200).json({
      message: "Кіру сәтті!",
      token, // 👈 токен қайтып жатыр ма?
      user
    });

  } catch (error) {
    console.error("Кіру қатесі:", error);
    res.status(500).json({ message: "Сервер қатесі." });
  }
});

// ✅ Құпиясөзді қалпына келтіру үшін токен жасау
router.post("/ForgotPassword", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "Мұндай почта табылмады." });

    // Қалпына келтіру токені жасау
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 сағат
    await user.save();

    const resetLink = `${process.env.CLIENT_URL}/ResetPassword/${resetToken}`;

    await transporter.sendMail({
      from: `"Action Research" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Құпиясөзді қалпына келтіру",
      html: `
        <p>Сәлем, ${user.fullName}!</p>
        <p>Құпиясөзіңізді жаңарту үшін мына сілтемеге өтіңіз:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>Бұл сілтеме 1 сағатқа ғана жарамды.</p>
      `,
    });

    res.status(200).json({ message: "Қалпына келтіру сілтемесі жіберілді." });
  } catch (error) {
    console.error("Қалпына келтіру қатесі:", error);
    res.status(500).json({ message: "Сервер қатесі." });
  }
});

// ✅ Құпиясөзді жаңарту (токен арқылы)
router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, // жарамдылық тексеру
    });

    if (!user) {
      return res.status(400).json({ message: "Сілтеме жарамсыз немесе мерзімі өткен." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: "Құпиясөз сәтті жаңартылды." });
  } catch (error) {
    console.error("Құпиясөз жаңарту қатесі:", error);
    res.status(500).json({ message: "Сервер қатесі." });
  }
});

module.exports = router;