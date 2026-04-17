//Generating OTP using crypto and hashing it using bcrypt

const crypto = require('crypto');
const bcrypt = require('bcrypt');

function generateOTP(length = 6) {
    return crypto.randomInt(100000, 999999).toString();
}

async function hashOTP(otp) {
    return await bcrypt.hash(otp, 10); // converts redable otp to hashed otp
}

async function verifyOTP(input, hash) {
    return await bcrypt.compare(input, hash); // compares the input otp with the hashed otp
}

(async () => {
    const otp = generateOTP(); 
    console.log("Generated OTP:", otp);

    const hashedOTP = await hashOTP(otp);
    console.log("Hashed OTP:", hashedOTP);

    console.log("Verification: ",await verifyOTP(otp, hashedOTP));
})(); // covert the code into integrated code