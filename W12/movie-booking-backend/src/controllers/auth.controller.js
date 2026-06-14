//MERN_Stu_FebMay26Mys\W9\D0\movie-booking-backend\src\controllers\auth.controller.js
const authService = require("../services/auth.service");

/*
-----------------------------------------
REGISTER
-----------------------------------------
*/
exports.register = async (req, res, next) => {
  try {
    const result = await authService.registerUser(req.body);

    res.status(201).json({
      success: true,
      message: "User registered. OTP sent.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/*
-----------------------------------------
VERIFY OTP
-----------------------------------------
*/
exports.verifyOTP = async (req, res, next) => {
  try {
    await authService.verifyOTP(req.body);

    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    next(error);
  }
};

/*
-----------------------------------------
LOGIN
-----------------------------------------
*/
exports.login = async (req, res, next) => {
  try {
    const result = await authService.loginUser(req.body);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};