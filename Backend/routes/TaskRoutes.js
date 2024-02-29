const express = require("express");
const { auth } = require("../middlewares/Auth");
const { create, showAll, updateStatus, updateTask, deleteTask } = require("../controllers/Task");
const taskRouter = express.Router();

taskRouter.post("/create", auth, create);
taskRouter.get("/showTasks", auth, showAll);
taskRouter.put("/updateStatus/:taskId", auth, updateStatus);
taskRouter.put("/updateTask/:taskId", auth, updateTask);
taskRouter.delete("/deleteTask/:taskId", auth, deleteTask);

module.exports = taskRouter;