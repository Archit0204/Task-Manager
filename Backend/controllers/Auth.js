const User = require("../models/User");
const { validation } = require("../utils/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.userSignup = async(req, res) => {

    try{
        // fetch data
        const {firstName, lastName, email, password, confirmPassword} = req.body;

        // validation
        if (!validation(firstName, "name") || !validation(lastName, "name") || !validation(email, "email") || !validation(password, "pass") || !validation(confirmPassword, "pass")) {
            return res.status(400).json({
                success: true,
                message: "Invalid Input Fields"
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password do not match"
            });
        }

        // check if user already exists
        let user = await User.findOne({email});

        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        // hash the password
        const hashed = await bcrypt.hash(password, 10);

        // create entry in DB
        const newuser = await User.create({
            firstName, lastName, email,
            password: hashed
        });
        
        // send response
        return res.status(200).json({
            success: true,
            message: "User Signed Up"
        });
    }
    catch(err) {
        return res.status(500).json({
            success: false,
            message: "Error signing up",
            error: err.message
        });
    }

}

exports.userLogin = async(req, res) => {
    try{
        // fetch data
        const {email, password} = req.body;
        // console.log(email + " " + password);

        // validate data
        if (!validation(email, "email") || !validation(password, "pass")) {
            return res.status(400).json({
                success: false,
                message: "Invalid Input Fields"
            });
        }

        // check if User exists or not
        const user = await User.findOne({email});

        if (!user) {
            return res.status(404).json({
                success: false, 
                message: "User does not exist"
            });
        }

        // compare the passwords
        if (await bcrypt.compare(password, user.password)) {
            const payload = {
                userId: user._id,
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h"
            });

            user.password = undefined;
            user.token = token;

            return res.cookie("token", token, {
                expiresIn: "2h",
                httpOnly: true
            }).status(200).json({
                success: true,
                message: "Logged In",
                user, token
            });
        }
        else {
            res.status(403).json({
                success: false,
                message: "Password Incorrect"
            })
        }
    }
    catch(err) {
        return res.status(500).json({
            success: false,
            message: "Error logging in",
            error: err.message
        });
    }
}