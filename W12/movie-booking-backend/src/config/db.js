//MERN_Stu_FebMay26Mys\W9\D0\movie-booking-backend\src\config\db.js
const mongoose = require("mongoose");

/*
-----------------------------------------
CONNECT TO MONGODB
-----------------------------------------
*/

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Database connection failed:", error.message);

    // Exit process if DB fails
    process.exit(1);
  }
};

module.exports = connectDB;