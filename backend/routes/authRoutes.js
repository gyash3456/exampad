const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/authController");
module.exports = function (app) {
  app.post(
    "/api/signup",
    [verifySignUp.checkDuplicateEmail, verifySignUp.checkRolesExisted],
    controller.signup
  );
  app.post("/api/signin", controller.signin);
  app.post("/api/signout", controller.signout);

  app.post("/api/refreshtoken", controller.refreshToken);
};
