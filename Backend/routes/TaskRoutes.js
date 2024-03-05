const express = require("express");
const { auth } = require("../middlewares/Auth");
const { create, showAll, updateStatus, updateTask, deleteTask, search, filter } = require("../controllers/Task");
const taskRouter = express.Router();

taskRouter.post("/create", auth, create);
taskRouter.get("/showTasks", auth, showAll);
taskRouter.put("/updateStatus/:taskId", auth, updateStatus);
taskRouter.put("/updateTask/:taskId", auth, updateTask);
taskRouter.delete("/deleteTask/:taskId", auth, deleteTask);
taskRouter.get("/search/:searchVal", auth, search);
taskRouter.get("/filter/:filterData", auth, filter);

module.exports = taskRouter;