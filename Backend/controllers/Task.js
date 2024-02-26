const Task = require("../models/Task");
const User = require("../models/User");

exports.create = async(req, res) => {
    try{   
        // fetch data
        const {title, description, deadline} = req.body;

        // create task
        const task = await Task.create({
            title, description, deadline
        });

        // fetch user 
        const userId = req.user.userId;
        const user = await User.findOneAndUpdate(userId, {
            $push: {tasks: task._id}
        });

        // send response
        return res.status(200).json({
            success: true,
            message: "Task Added"
        });
    }
    catch(err) {
        return res.status(500).json({
            success: false,
            message: "Error adding a Task"
        });
    }
}

exports.showAll = async(req, res) => {
    try{
        // fetch userId
        const userId = req.user.userId;

        // find the user
        const user = await User.findById(userId).populate("tasks").exec();

        // return response
        return res.status(200).json({
            success: true,
            message: "Tasks Fetched Successfully",
            user
        });
    }
    catch(err) {
        return res.status(500).json({
            success: false,
            message: "Error fetching all Tasks"
        });
    }
}