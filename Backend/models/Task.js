const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        trim: true,
        required: true,
    },
    status: {
        type: String,
        enum: ["Pending", "Completed"],
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    deadline: {
        type: Date,
    }
});

module.exports = mongoose.model("Task", taskSchema);