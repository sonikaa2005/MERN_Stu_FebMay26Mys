const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
        trim:true, // remove extra spaces
    },
     email:{
        type:String,
        required:[true,"Email is required"],
        unique:true, // no two users can have same email
        lowercase:true, // convert email to lowercase
        match:[/^\s+@\s+\.\s+$/,"Please enter a valid email"], 
        index:true, // create index on email field for faster queries
    },
     password:{
        type:String,
        required:[true,"Password is required"],
        minlength:6,
        select:false, //it hides the password
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user",
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
},
{
    timestamps:true, // it will automatically add createdAt and updatedAt fields
});
//Hash password before saving user to db
userSchema.pre("save",async function(){
    if(!this.isModified("password")){
        return;
    }
    try{
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password,saltRounds);
    }
    catch(error){
        throw error;
    }
});

//method to compare password during login
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
};

module.exports = mongoose.model("User",userSchema);