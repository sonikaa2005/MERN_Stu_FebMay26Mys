const OTP = require("../models/OTP");
const bcrypt = require("bycrypt");

//generate OTP
exports.generateOTP = async(eamil) => { // task to make to convert by using crypto to generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOTP = await bcrypt.hash(otp, 10); // 10 is the salt rounds for hashing

    const expiresAt = new Date(Date.now() + 5*60*1000);//5 minutes

    await OTP.create({
        email,
        otp:hashedOTP,
        expiresAt,
    });
    console.log("Generated OTP:",otp); // testing purpose only, remove in production
    return otp;
};