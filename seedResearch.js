
const mongoose = require("mongoose");
const Research = require("./server/models/Research"); // дұрыс жол көрсет
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/action-research-db";

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB қосылды");

    // Тест пайдаланушы ID (JWT-тен алған id-мен сәйкес болу керек)
    const testUserId = "68ece2d6bbbbdecba5d6afbc";

    // Тест зерттеу
    const testResearch = new Research({
      title: "Тест зерттеу жұмысы",
      description: "Бұл тесттік зерттеу жұмысы React бетінде көрінуі керек",
      tools: ["Сауалнама", "Сұқбат"],
      published: true,
      authors: [testUserId],
    });

    await testResearch.save();
    console.log("✅ Тест зерттеу қосылды:", testResearch);

    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Қате:", err);
  }
};

seed();
