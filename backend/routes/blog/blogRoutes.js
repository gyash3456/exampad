const router = require("express").Router();
const {
  ensureAuthenticated,
  ensureAuthorized,
} = require("../../middlewares/authMiddleware");
const {
  validationRules,
  validate,
} = require("../../validators/blog/postVallidator");
const {
  addOne,
  removeOne,
  updateOne,
  getAll,
  getOne,
  getOneBySlug,
  getTopPosts,
} = require("../../controllers/blog/postController");

router.post(
  "/posts",
  ensureAuthenticated,
  ensureAuthorized(["admin"]),
  validationRules(),
  validate,
  async (req, res) => {
    await addOne(req, res);
  }
);

module.exports = router;
