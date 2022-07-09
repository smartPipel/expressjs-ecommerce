const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    logger.info({
      message: `${email} try to signup`,
      ip: req.ip,
      url: req.originalUrl,
      method: req.method,
    });
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      logger.info({
        message: `User with ${email} email already exists!`,
        ip: req.ip,
        url: req.originalUrl,
        method: req.method,
      });
      return res
        .status(400)
        .json({ msg: "User with same email already exists!" });
    }

    const hashedPassword = await bcryptjs.hash(password, 8);

    let user = new User({
      email,
      password: hashedPassword,
      name,
    });

    user = await user.save();
    logger.info({
      message: `SignUp success`,
      ip: req.ip,
      url: req.originalUrl,
      method: req.method,
    });
    res.json(user);
  } catch (e) {
    logger.error({
      message: e.message,
      ip: req.ip,
      url: req.originalUrl,
      method: req.method,
    });
    res.status(500).json({ error: e.message });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    logger.info({
      message: `${email} try to signin`,
      ip: req.ip,
      url: req.originalUrl,
      method: req.method,
    });
    const user = await User.findOne({ email });

    if (!user) {
      logger.info({
        message: `User with ${email}  email doesn't exists!`,
        ip: req.ip,
        url: req.originalUrl,
        method: req.method,
      });
      return res
        .status(400)
        .json({ msg: "User with this email doesn't exists!" });
    }
    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      logger.info({
        message: `Incorrect password!`,
        ip: req.ip,
        url: req.originalUrl,
        method: req.method,
      });
      return res.status(400).json({ msg: "Incorrect password" });
    }

    const jwtToken = jwt.sign({ id: user._id }, "passwordKey");
    logger.info({
      message: `SignIn succes!`,
      ip: req.ip,
      url: req.originalUrl,
      method: req.method,
    });

    return res.json({ token: jwtToken, ...user._doc });
  } catch (e) {
    logger.error({
      message: e.message,
      ip: req.ip,
      url: req.originalUrl,
      method: req.method,
    });
    return res.status(500).json({ error: e.message });
  }
};

const tokenIsValid = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      logger.info({
        message: "token invalid!",
        ip: req.ip,
        url: req.originalUrl,
        method: req.method,
      });

      return res.json(false);
    }

    const verified = jwt.verify(token, "passwordKey");
    if (!verified) {
      logger.info({
        message: "verify token failed!!",
        ip: req.ip,
        url: req.originalUrl,
        method: req.method,
      });

      return res.json(false);
    }

    const user = await User.findById(verified.id);

    if (!user) return res.json(false);
    infoLog();
    logger.info({
      message: "token validation succes!",
      ip: req.ip,
      url: req.originalUrl,
      method: req.method,
    });

    return res.json(true);
  } catch (e) {
    logger.error({
      message: e.message,
      ip: req.ip,
      url: req.originalUrl,
      method: req.method,
    });

    return res.status(500).json({ error: e.message });
  }
};

const getUserData = async (req, res, next) => {
  try {
    const user = await User.findById(req.user);
    logger.info({
      message: "succes get data!",
      ip: req.ip,
      url: req.originalUrl,
      method: req.method,
    });

    return res.json({ ...user._doc, token: req.token });
  } catch (e) {
    logger.error({
      message: e.message,
      ip: req.ip,
      url: req.originalUrl,
      method: req.method,
    });

    return res.status(500).json({ error: e.message });
  }
};

module.exports = { signUp, tokenIsValid, getUserData, signIn };
