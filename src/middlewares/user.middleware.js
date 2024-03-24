const { validationResult } = require("express-validator");

const userMiddleWare = async (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    next();
  } else {
    res.send({ message: false, errors: result.array()[0] });
  }
};

module.exports = { userMiddleWare };
