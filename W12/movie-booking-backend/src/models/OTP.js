// MERN_Stu_FebMay26Mys\W9\D0\movie-booking-backend\src\models\OTP.js
const mongoose = require("mongoose");

/*
-----------------------------------------
OTP SCHEMA
-----------------------------------------
*/

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
    },

    otp: {
      type: String,
      required: true,
      select: false, // 🔥 do not expose OTP
    },

    expiresAt: {
      type: Date,
      required: true,
    },

    attempts: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

/*
-----------------------------------------
TTL INDEX
-----------------------------------------
*/

// Automatically delete OTP after expiry
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("OTP", otpSchema);