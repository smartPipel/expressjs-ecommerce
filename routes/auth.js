const express = require("express");
const authRouter = express.Router();

const auth = require("../middleware/auth");
const {
  getUserData,
  signIn,
  signUp,
  tokenIsValid,
} = require("../controllers/auth-controller");

authRouter.post("/api/signup", signUp);
authRouter.post("/api/signin", signIn);
authRouter.post("/tokenIsValid", tokenIsValid);
authRouter.get("/", auth, getUserData);

module.exports = authRouter;
