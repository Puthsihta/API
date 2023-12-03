const { verify } = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  let token = req.get("authorization");
  if (token) {
    token = token.slice(7);
    verify(token, process.env.JWT_SERCRET_KEY, (error, response) => {
      if (error) {
        res.status(500).json({
          error: true,
          message: "Invalid token!",
        });
      } else {
        next();
      }
    });
  } else {
    res.status(500).json({
      error: true,
      message: "Authorization User Token is required",
    });
  }
};

module.exports = { checkToken };
