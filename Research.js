const mongoose = require("mongoose");

const researchSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  tools: Array,
  published: { type: Boolean, default: false },
  authors: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // ✅ дұрыс тип
}, { timestamps: true });

router.get("/", async (req, res) => {
  try {
    const researches = await Research.find({ published: true })
      .populate("authors", "name"); // автордың атын алу үшін
    res.status(200).json(researches);
  } catch (error) {
    console.error("❌ Барлық зерттеулер қатесі:", error);
    res.status(500).json({ message: "Қате орын алды." });
  }
});

module.exports = mongoose.model("Research", researchSchema);
