const jwt = require("jsonwebtoken");

exports.COOKIE_OPTIONS = {
  httpOnly: true,
  maxAge: eval(process.env.REFRESH_TOKEN_EXPIRY) * 1000,
};

exports.getToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: eval(process.env.SESSION_EXPIRY),
  });
};

exports.getRefreshToken = (user) => {
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: eval(process.env.REFRESH_TOKEN_EXPIRY),
  });
  return refreshToken;
};

exports.getUserIdByToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
