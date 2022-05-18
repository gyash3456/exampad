const { authJwt } = require("../middlewares");
const controller = require("../controllers/userController");
module.exports = function (app) {
  app.get("/api/user/all", controller.allAccess);
  app.get("/api/user", [authJwt.verifyToken], controller.userBoard);
  app.get(
    "/api/user/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );
  app.get(
    "/api/user/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};
