const { validationResult } = require("express-validator");

const userMiddleWare = async (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    next();
  } else {
    res.send({ errors: result.array() });
  }
};

module.exports = { userMiddleWare };
