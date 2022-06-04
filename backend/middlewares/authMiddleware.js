const passport = require("passport");
const db = require("../models");
const Role = db.role;

const ensureAuthenticated = passport.authenticate("jwt", { session: false });

const ensureAuthorized = (roleCheck) => (req, res, next) => {
  Role.find(
    {
      _id: { $in: req.user.roles },
    },
    (err, roles) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      for (let i = 0; i < roles.length; i++) {
        if (roleCheck.includes(roles[i].name)) {
          next();
          return;
        }
      }
      res.status(403).send({ message: "Require Admin Role!" });
      return;
    }
  );
};

module.exports = {
  ensureAuthenticated,
  ensureAuthorized,
};
