const router = require("express").Router();
const {
  ensureAuthenticated,
  ensureAuthorized,
} = require("../middlewares/authMiddleware");
const { register } = require("../controllers/authController");

const {
  getAll,
  getOne,
  getLoggedInUser,
} = require("../controllers/admin/adminController");

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

router.post(
  "/loggedinuser",
  ensureAuthenticated,
  ensureAuthorized(["admin"]),
  async (req, res) => {
    await getLoggedInUser(req, res);
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
