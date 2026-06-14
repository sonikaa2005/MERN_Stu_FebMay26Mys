//MERN_Stu_FebMay26Mys\W9\D0\movie-booking-backend\src\models\Movie.js
const mongoose = require("mongoose");

/*
-----------------------------------------
MOVIE SCHEMA
-----------------------------------------
*/

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Movie title is required"],
      trim: true,
      index: true, // 🔥 improves search performance
    },

    genre: {
      type: String,
      required: [true, "Genre is required"],
      enum: [
        "Action",
        "Comedy",
        "Drama",
        "Horror",
        "Sci-Fi",
        "Romance",
        "Thriller",
      ],
      index: true, // 🔥 filter optimization
    },

    rating: {
      type: Number,
      required: true,
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
      index: true, // 🔥 sorting + filtering
    },

    duration: {
      type: Number,
      required: [true, "Duration is required"],
    },

    releaseDate: {
      type: Date,
      required: [true, "Release date is required"],
      index: true, // 🔥 sorting recent movies
    },

    poster: {
      type: String, // file path
      default: "",
    },

    isActive: {
      type: Boolean,
      default: true, // used for soft delete
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

// Optimizes combined queries (genre + rating)
movieSchema.index({ genre: 1, rating: -1 });

/*
-----------------------------------------
TEXT INDEX (SEARCH)
-----------------------------------------
*/

// Enables text search on title
movieSchema.index({ title: "text" });

/*
-----------------------------------------
VIRTUAL FIELD: isReleased
-----------------------------------------
*/

movieSchema.virtual("isReleased").get(function () {
  return this.releaseDate <= new Date();
});

module.exports = mongoose.model("Movie", movieSchema);