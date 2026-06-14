//MERN_Stu_FebMay26Mys\W9\D0\movie-booking-backend\src\models\Show.js
const mongoose = require("mongoose");

/*
-----------------------------------------
SEAT SUB-SCHEMA
-----------------------------------------
*/

const seatSchema = new mongoose.Schema(
  {
    seatNumber: {
      type: String,
      required: true,
    },
    isBooked: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

/*
-----------------------------------------
SHOW SCHEMA
-----------------------------------------
*/

const showSchema = new mongoose.Schema(
  {
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
      index: true,
    },

    date: {
      type: Date,
      required: true,
      index: true,
    },

    time: {
      type: String,
      required: true,
    },

    totalSeats: {
      type: Number,
      required: true,
    },

    availableSeats: {
      type: Number,
      required: true,
    },

    seats: {
      type: [seatSchema],
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

/*
-----------------------------------------
COMPOUND INDEX
-----------------------------------------
*/

// Optimize queries like:
// find shows by movie + date
showSchema.index({ movieId: 1, date: 1 });

/*
-----------------------------------------
VALIDATE AVAILABLE SEATS
-----------------------------------------
*/

showSchema.pre("save", async function () {
  if (this.availableSeats > this.totalSeats) {
    throw new Error("Available seats cannot exceed total seats");
  }
});

module.exports = mongoose.model("Show", showSchema);