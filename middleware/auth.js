const jwt = require("jsonwebtoken");
const logger = require("../logger");

const auth = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      logger.info({
        message: "No auth token, access danied!",
        ip: req.ip,
        url: req.originalUrl,
        method: req.method,
      });
      return res.status(401).json({ msg: "No auth token, access danied!" });
    }

    const verified = jwt.verify(token, "passwordKey");
    if (!verified) {
      logger.info({
        message: "Token verification failed, authorization danied!",
        ip: req.ip,
        url: req.originalUrl,
        method: req.method,
      });
      return res
        .status(401)
        .json({ msg: "Token verification failed, authorization danied!" });
    }

    req.user = verified.id;
    req.token = verified.token;
    logger.info({
      message: "Token verification succes",
      ip: req.ip,
      url: req.originalUrl,
      method: req.method,
    });
    next();
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

module.exports = auth;
