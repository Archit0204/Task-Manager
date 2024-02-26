const express = require("express");
const { auth } = require("../middlewares/Auth");
const { create, showAll } = require("../controllers/Task");
const taskRouter = express.Router();

taskRouter.post("/create", auth, create);
taskRouter.get("/showTasks", auth, showAll);

module.exports = taskRouter;