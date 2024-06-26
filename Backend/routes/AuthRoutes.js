const express = require("express");
const { userSignup, userLogin } = require("../controllers/Auth");
const authRouter = express.Router();

authRouter.post("/signup", userSignup);
authRouter.post("/login", userLogin);

module.exports = authRouter;