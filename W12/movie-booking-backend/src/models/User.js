// MERN_Stu_FebMay26Mys\W9\D0\movie-booking-backend\src\models\User.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

/*
-----------------------------------------
USER SCHEMA
-----------------------------------------
*/

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email"],
      index: true, // improves login performance
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false, // 🔥 hide password by default
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

/*
-----------------------------------------
HASH PASSWORD BEFORE SAVE
-----------------------------------------
*/

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  try {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  } catch (error) {
    throw error; // ✅ correct way in async middleware
  }
});

/*
-----------------------------------------
COMPARE PASSWORD METHOD
-----------------------------------------
*/

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);