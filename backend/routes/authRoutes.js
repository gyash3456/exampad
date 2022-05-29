const router = require("express").Router();
const { validationRules, validate } = require("../validators/userValidator");
const {
  login,
  register,
  refreshToken,
  logout,
  verify,
  forgotPassword,
  resetPassword,
  changePassword,
} = require("../controllers/authController");
const { ensureAuthenticated } = require("../middlewares/auth");
// const { validationRules: passwordValidationRules, validate: passwordValidate } = require("../validations/change-password-validator");

router.post("/login", async (req, res) => {
  await login(req.body, res);
});

router.post("/register", validationRules(), validate, async (req, res) => {
  await register(req.body, res);
});

router.post("/refreshToken", async (req, res) => {
  await refreshToken(req, res);
});

router.post("/logout", async (req, res) => {
  await logout(req, res);
});

router.post("/verify", async (req, res) => {
  await verify(req.body, res);
});

router.post("/forgotPassword", async (req, res) => {
  await forgotPassword(req.body, res);
});

// router.post('/resetPassword', passwordValidationRules(), passwordValidate, async (req, res) => {

//     await resetPassword(req.body, res);
// });

// router.post("/changePassword", ensureAuthenticated, passwordValidationRules(), passwordValidate, async (req, res) => {

//     await changePassword(req, res);
// });

module.exports = router;
