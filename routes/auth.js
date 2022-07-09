const express = require("express");
const authRouter = express.Router();

const auth = require("../middleware/auth");
const {
  getUserData,
  signIn,
  signUp,
  tokenIsValid,
} = require("../controllers/auth-controller");

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);
authRouter.post("/tokenIsValid", tokenIsValid);
authRouter.get("/", auth, getUserData);

module.exports = authRouter;
