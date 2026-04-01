//JWT Fundamentals: token generation and verification

const jwt = require("jsonwebtoken"); //npm install jsonwebtoken

const secretKey = "mySecretKey";

//Payload holds small non-sensitive data
const payload = {
    userId:101,
    role:"member"
};

//creation of token
//jwt.sign() creates a signed JWT token
const token = jwt.sign(payload, secretKey, {expiresIn:"1h"});

console.log("Token generated successfully\n", token);

const tokenParts = token.split("."); //(.) dot indicate periods which separate the parts of the token. 
console.log("Header section:",tokenParts[0]);
console.log("Payload section:",tokenParts[1]);
console.log("Signature section:",tokenParts[2]);
console.log("JWT part count:",tokenParts.length);

const newSecretKey = "donkey123";
try{
    //verification of token
    //jwt.verify() checks trust, signature and expiration of the tokens
   // const verifiedPayload = jwt.verify(token, newSecretKey);
    const verifiedPayload = jwt.verify(token, secretKey);

    console.log("Verified payload: ",verifiedPayload);
}
catch(error){
    console.log("verification failed:",error.message);
}

const decodeWithoutVerification = jwt.decode(token);
console.log("Decoded token:", decodeWithoutVerification);
