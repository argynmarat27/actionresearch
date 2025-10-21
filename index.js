const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/auth');
const researchRoutes = require("./routes/research");
require('dotenv').config(); // .env бірінші жүктелуі керек

const app = express();

// ✅ CORS middleware ең басында тұру керек
app.use(cors({
  origin: "http://localhost:5173", // React қосымшаңның адресі
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ✅ JSON парсер міндетті түрде қосылады
app.use(express.json());

// ✅ Суреттер папкасын сыртқа ашу
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Негізгі роуттар
app.use("/api/auth", authRoutes);
app.use("/api/research", researchRoutes);

// ✅ Тест үшін /api/researches маршруты
app.post("/api/researches", (req, res) => {
  console.log("📥 Қабылданған зерттеу:", req.body);
  res.status(201).json({
    message: "Зерттеу сәтті қабылданды!",
    data: req.body
  });
});

// ✅ MongoDB-ге қосылу
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB-ге қосылды'))
.catch((err) => console.error('❌ MongoDB қосылу қатесі:', err));

// ✅ Серверді іске қосу
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Сервер http://localhost:${PORT} портында іске қосылды`);
});
