//connection related to db using mongodb and mongoose

const mongoose = require("mongoose");
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }
    catch (error) {
        console.log("DB connection failed:",error.message);

        process.exit(1); //program termination with errors
    }
};
module.exports = connectDB;