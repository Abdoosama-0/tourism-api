const jwt = require("jsonwebtoken");

const protect =(req, res, next)=> {
  try {

    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }


    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();

  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

const logged =(req, res, next)=> {
  try {

    const token = req.cookies.jwt;

    if (!token) {
      return next();
    }
    return res.status(401).json({ message: "you are already logged in" });

  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied, admin only" });
  }
};

module.exports = {
    protect,
    adminOnly,
    logged
}
