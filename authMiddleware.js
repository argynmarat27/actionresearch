const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Токен табылмады" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // JWT ішіндегі өрісті нақтыла
    // Егер сен token генерациялаған кезде user._id салсаң:
    req.user = { id: decoded._id, role: decoded.role }; 
    next();
  } catch (err) {
    return res.status(403).json({ message: "Токен дұрыс емес" });
  }
};



module.exports = authenticateUser;