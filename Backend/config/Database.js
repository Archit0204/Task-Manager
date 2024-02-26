const mongoose = require("mongoose");

const dbConnect = () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(console.log("DB Connected Successfully"))
    .catch((err) => console.log("Error in DB Connection"));
}

module.exports = dbConnect;