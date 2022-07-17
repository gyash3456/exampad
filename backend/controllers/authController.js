const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const db = require("../models");
const User = db.user;
const Role = db.role;
const RefreshToken = db.refreshToken;

const {
  getToken,
  COOKIE_OPTIONS,
  getRefreshToken,
} = require("../helpers/auth");

const { welcomeSender, forgotPasswordSender } = require("../mailers/senders");

const register = async (data, res) => {
  try {
    const userTaken = await validateEmail(data.email);
    if (userTaken) {
      return res.status(400).json({
        email: "Email is already taken",
        message: "Registration failure",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(data.password, 16);
    const code = crypto.randomInt(100000, 1000000);
    const newUser = new User({
      ...data,
      password: hashedPassword,
      verificationCode: code,
    });

    await newUser.save((err, user) => {
      if (err) {
        return res.status(500).send({ message: err });
      }

      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          return res.status(500).send({ message: err });
        }
        newUser.roles = [role._id];
        newUser.save((err) => {
          if (err) {
            return res.status(500).send({ message: err });
          }
          return res.send({ message: "User was registered successfully!" });
        });
        welcomeSender(newUser.email, newUser.name, newUser.verificationCode);
      });
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

const login = async (data, res) => {
  try {
    let { email, password } = data;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Failed login attempt",
        email: "Incorrect email",
        success: false,
      });
    }
    let isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      let token = getToken({
        user_id: user._id,
      });
      const refreshToken = getRefreshToken({
        user_id: user._id,
      });

      let profile = {
        email: user.email,
        role: user.role,
        name: user.name,
      };
      let result = {
        user: profile,
        accessToken: token,
      };

      await RefreshToken.findOneAndDelete({ user: user._id });

      let expiredAt = new Date();
      expiredAt.setSeconds(
        expiredAt.getSeconds() + process.env.REFRESH_TOKEN_EXPIRY
      );

      let refreshTokenObj = new RefreshToken({
        token: refreshToken,
        user: user._id,
        expiryDate: expiredAt.getTime(),
      });

      refreshTokenObj.save();

      user.save((err) => {
        if (err) {
          res.statusCode = 500;
          return res.send(err);
        } else {
          res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
          return res.send({ success: true, result });
        }
      });
    } else {
      return res.status(403).json({
        message: "Failed login attempt",
        email: "Incorrect password",
        success: false,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

const refreshToken = async (req, res) => {
  const { refreshToken: requestToken } = req.cookies;
  if (requestToken == null) {
    return res.status(403).json({ message: "Refresh Token is required!" });
  }
  try {
    let refreshToken = await RefreshToken.findOne({ token: requestToken });
    if (!refreshToken) {
      res.status(403).json({ message: "Refresh token is not in database!" });
      return;
    }
    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.findByIdAndRemove(refreshToken._id, {
        useFindAndModify: false,
      }).exec();

      res.status(403).json({
        message: "Refresh token was expired. Please make a new signin request",
      });
      return;
    }

    let newAccessToken = getToken({
      user_id: refreshToken.user._id,
    });
    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

const logout = async (req, res) => {
  const { refreshToken } = req.cookies;
  try {
    await RefreshToken.findOneAndDelete({ token: refreshToken });

    res.clearCookie("refreshToken", COOKIE_OPTIONS);
    return res.send({ success: true });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

const verify = async (data, res) => {
  try {
    let { code } = data;
    const user = await User.findOne({ verificationCode: code });
    if (!user) {
      return res.status(404).json({
        message: "Invalid code",
        success: false,
      });
    } else if (user.isEmailVerified) {
      return res.status(404).json({
        message: "Email already verified",
        success: false,
      });
    }
    await user.update({ isEmailVerified: true });
    return res.status(201).json({
      message: "Email verification success",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

const forgotPassword = async (data, res) => {
  try {
    let { email } = data;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        message: "Invalid email",
        success: false,
      });
    }

    const code = crypto.randomInt(100000, 1000000);
    const passwordResetCode = await bcrypt.hash(code.toString(), 16);
    await user.update({ passwordResetCode: passwordResetCode });
    forgotPasswordSender(user.email, user.name, code);
    return res.status(404).json({
      message: "Verication code sent to your email",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

const resetPassword = async (data, res) => {
  try {
    console.log(data);
    let { email, code, newPassword } = data;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        message: "Invalid email",
        success: false,
      });
    }
    let isMatch = await bcrypt.compare(code.toString(), user.passwordResetCode);
    if (isMatch) {
      const hashedPassword = await bcrypt.hash(newPassword, 16);
      await user.update(
        { password: hashedPassword },
        { passwordResetCode: "" }
      );
      return res.status(201).json({
        message: "Your password has been successfully reset",
        success: true,
      });
    } else {
      return res.status(404).json({
        message: "Invalid code",
        success: false,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

const changePassword = async (req, res) => {
  try {
    let { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);
    let isMatch = await bcrypt.compare(oldPassword, user.password);
    if (isMatch) {
      const hashedPassword = await bcrypt.hash(newPassword, 16);
      await user.update({ password: hashedPassword });
      return res.status(201).json({
        message: "Your password has been successfully reset",
        success: true,
      });
    } else {
      return res.status(404).json({
        message: "Your old password is incorrect",
        success: false,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

const validateEmail = async (email) => {
  let user = await User.findOne({ email });
  if (user) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  login,
  register,
  refreshToken,
  logout,
  verify,
  forgotPassword,
  resetPassword,
  changePassword,
};
