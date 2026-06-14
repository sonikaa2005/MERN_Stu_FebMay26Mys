// MERN_Stu_FebMay26Mys\W9\D0\movie-booking-backend\src\models\Booking.js
const mongoose = require("mongoose");

/*
-----------------------------------------
BOOKING SCHEMA
-----------------------------------------
*/

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    showId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Show",
      required: true,
      index: true,
    },

    seats: {
      type: [String], // ["A1", "A2"]
      required: true,
    },

    totalSeats: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["booked", "cancelled"],
      default: "booked",
      index: true,
    },

    bookingTime: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

/*
-----------------------------------------
VALIDATE SEATS COUNT
-----------------------------------------
*/

bookingSchema.pre("save", async function () {
  if (this.seats.length === 0) {
    throw new Error("At least one seat must be selected");
  }

  if (this.totalSeats !== this.seats.length) {
    throw new Error("Seat count mismatch");
  }
});

/*
-----------------------------------------
COMPOUND INDEX
-----------------------------------------
*/

// Optimize queries like:
// bookings by user + show
bookingSchema.index({ userId: 1, showId: 1 });

module.exports = mongoose.model("Booking", bookingSchema);