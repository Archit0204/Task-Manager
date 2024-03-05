const Task = require("../models/Task");
const User = require("../models/User");

exports.create = async(req, res) => {
    try{   
        // fetch data
        const {title, description, deadline, priority} = req.body;

        // validate
        if (!deadline) {
            return res.status(403).json({
                success: false,
                message: "Invalid Input Fields"
            });
        }

        // console.log(title + " " + description + " " + deadline);
        // console.log(req.body);
        // console.log(req.user);

        // create task
        const task = await Task.create({
            title, description, deadline, priority
        });

        // fetch user 
        const userId = req.user.userId;
        const user = await User.findByIdAndUpdate(userId, {
            $push: {tasks: task._id}
        });

        // send response
        return res.status(200).json({
            success: true,
            message: "Task Added",
            // user
        });
    }
    catch(err) {
        return res.status(500).json({
            success: false,
            message: "Error adding a Task",
            error: err.message
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

exports.updateStatus = async(req, res) => {
    
    try{
        // fetch data
        const {taskId} = req.params;

        // find and update

        const task = await Task.findByIdAndUpdate(taskId, {
            status: "Completed"
        }, {new: true});

        // return response
        return res.status(200).json({
            success: true,
            message: "Status Updated",
            task
        });
    }
    catch(err) {
        return res.status(500).json({
            success: false,
            message: "Error Updating Status",
            error: err.message
        });
    }
}

exports.updateTask = async(req, res) => {
    try{
        // fetch data
        const {title, description, deadline, priority} = req.body;
        const {taskId} = req.params;

        // console.log(title + " " + description + " " + deadline);

        // validate
        if (!deadline) {
            return res.status(403).json({
                success: false,
                message: "Invalid Input Fields"
            });
        }

        // check for existing task
        if (!await Task.findById(taskId)) {
            return res.status(404).json({
                success: false,
                message: "Invalid Task Id"
            });
        }

        // update with the data
        const updatedTask = await Task.findByIdAndUpdate(taskId, {
            title: title,
            description: description,
            deadline: deadline,
            priority: priority
        }, {new: true});

        // return response
        return res.status(201).json({
            success: true,
            message: "Task Updated",
            updatedTask
        })
    }
    catch(err) {
        return res.status(500).json({
            success: false,
            message: "Error updating task",
            error: err.message
        });
    }
}

exports.deleteTask = async(req, res) => {
    try{
        // fetch taskId
        const {taskId} = req.params;

        // fetch user to remove from his tasklist
        const userId = req.user.userId;
        const user = await User.findByIdAndUpdate(userId, {
            $pull: {
                tasks: taskId
            }
        });

        // find the task and delete it
        await Task.findByIdAndDelete(taskId);

        // send response
        return res.status(200).json({
            success: true,
            message: "Task Deleted",
        });
    }
    catch(err) {
        return res.status(500).json({
            success: false,
            message: "Error deleting task",
            error: err.message
        });
    }
}

exports.search = async(req, res) => {
    try{
        const {searchVal} = req.params;

        const userId = req.user.userId;

        const user = await User.findById(userId).populate({
            path: 'tasks',
            match: {
                title: {
                    $regex: new RegExp(searchVal, "i")
                }
            }  
        }).exec();

        return res.status(200).json({
            success: true,
            message: "Search Successfull",
            user
        });
    }
    catch(err) {
        return res.status(500).json({
            success: false,
            messsage: "Error while searching",
            error: err.message
        });
    }
}