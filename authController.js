// authController.js ішінде
exports.verifyEmail = async (req, res) => {
  const token = req.params.token;
  const Research = require("../models/Research");
  
exports.getMyResearches = async (req, res) => {
  const { userId } = req.params;

  try {
    const researches = await Research.find({ authors: userId });
    res.status(200).json(researches);
  } catch (error) {
    res.status(500).json({ message: "Қате орын алды." });
  }
};
  try {
    const user = await User.findOne({ emailVerificationToken: token });

    if (!user) {
      return res.status(400).json({ message: "Сілтеме жарамсыз немесе мерзімі өткен." });
    }

    user.emailVerified = true;
    user.emailVerificationToken = undefined;
    await user.save();

    // ✅ Мұнда redirect орнына JSON қайтару
    return res.status(200).json({ message: "Пошта сәтті расталды!" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Сервер қатесі" });
  }
};