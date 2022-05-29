const router = require("express").Router();
const {
  ensureAuthenticated,
  ensureAuthorized,
} = require("../middlewares/auth");
const { register } = require("../controllers/authController");

const { getAll, getOne } = require("../controllers/adminController");

router.get(
  "/users",
  ensureAuthenticated,
  ensureAuthorized(["admin"]),
  async (req, res) => {
    await getAll(req, res);
  }
);

router.get(
  "/users/:id",
  ensureAuthenticated,
  ensureAuthorized(["admin"]),
  async (req, res) => {
    await getOne(req, res);
  }
);

router.get("/seed", async (req, res) => {
  const admin = {
    name: "Admin",
    email: "admin@admin.com",
    password: "admin@123",
  };

  await register(admin, res);
});

module.exports = router;
