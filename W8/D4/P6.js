// Generate, store and verify OTP using MongoDB
const crypto = require('crypto');
const mongoose = require("mongoose");
const { type } = require('os');

mongoose.connect("mongodb://127.0.0.1:27017/datedb1").then(()=>console.log("MongoDB connected"))
.catch((err)=>console.log(err));

const otpSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
        unique:true
    },
    otp:{
        type:String,
        required:true
    },
    expiresAt:{
        type:Date,
        required:true,
        index:{expires:0}
    },
    attempts:{
        type:Number,
        default:0
    }
});
const OTP = mongoose.model("OTP",otpSchema);
async function generateOTP(userId){
    const otp = crypto.randomInt(100000,999999).toString(); 
    await OTP.findOneAndUpdate(
        {userId},
        {
            userId,
            otp,
            expiresAt:new Date(Date.now()+6000),
             //expiresAt:new Date(Date.now()-1000),//expire
            attempts:0
        },
        {
            upsert:true,
            returnDocument:'after'
        }
    );
    console.log("OTP:",otp);
}
async function verifyOTP(userId,enteredOtp) {
    const record = await OTP.findOne({userId});
    
    if(!record){return "No OTP";}
    if(Date.now()>record.expiresAt) return "EXpired";
    if(record.attempts>=3) return "BLocked";

    record.attempts++;
    if(record.otp === String(enteredOtp)){
        await OTP.deleteOne({userId});
        return "Valid";
    }
    await record.save();
    return "Invalid";
}
async function main() {
    await generateOTP("user1");

    const storedRecord = await OTP.findOne({ userId: "user1" }); 

    const userEnteredOtp = storedRecord.otp;
    const result = await verifyOTP("user1", "userEnteredOtp");

    // const result = await verifyOTP("user1", "11111");
    // await verifyOTP("user1", "22222");
    // await verifyOTP("user1", "44444");
    // console.log(await verifyOTP("user1", "33333"));//Blocked

     //const result = await verifyOTP("user1", "1234");//invalid
      //const result = await verifyOTP("user2", "1234"); //no otp

    console.log(result);

    await mongoose.connection.close();
}
main();