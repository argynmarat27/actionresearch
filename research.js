const mongoose = require("mongoose");

const researchSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  tools: String,
  published: { type: Boolean, default: false },
  authors: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Research", researchSchema);
