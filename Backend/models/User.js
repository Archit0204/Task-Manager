const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: true,
    },
    lastName: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,  
        ref: "Task"
    }],
});

module.exports = mongoose.model( 'User', userSchema );