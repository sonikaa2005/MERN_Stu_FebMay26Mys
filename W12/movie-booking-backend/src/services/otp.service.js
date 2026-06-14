//MERN_Stu_FebMay26Mys\W9\D0\movie-booking-backend\src\services\otp.service.js
const OTP = require("../models/OTP");
const bcrypt = require("bcrypt");

/*
-----------------------------------------
GENERATE OTP
-----------------------------------------
*/
exports.generateOTP = async (email) => {
  await OTP.deleteMany({ email });
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const hashedOTP = await bcrypt.hash(otp, 10);

  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  await OTP.create({
    email,
    otp: hashedOTP,
    expiresAt,
  });

  console.log("Generated OTP:", otp); // testing only

  return otp;
};