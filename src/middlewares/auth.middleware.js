const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { SECRET } = require("../secret");

const verifyToken = asyncHandler(async (req, res, next) => {
  //Check token
  let token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ error: "Access Denied!" });
  }
  token = token.replace("Bearer ", "");
  const decoded = jwt.verify(token, SECRET);
  req.user = decoded;
  next();
});

module.exports = { verifyToken };
