const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async(req, res, next) => {

    try{
        const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ", "");

        if (!token || token === undefined) {
            return res.status(404).json({
                success: false,
                message: "Token not Found"
            });
        }

        const payload = jwt.verify(token, JWT_SECRET);

        req.user = payload;

        next();
    }
    catch(err) {
        return res.status(500).json({
            success: false,
            message: "Error Authenticating"
        });
    }
} 