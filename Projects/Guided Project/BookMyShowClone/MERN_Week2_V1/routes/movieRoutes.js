//Handles requests related to movie

const express = require("express");
const {authMiddleware} = require("../middleware/authMiddleware");

const{
    getHome,
    getAllMovies,
    getMovieById,
    addMovie,
    updateMovie,
    deleteMovie
} = require("../controllers/movieController");
const roleMiddleware =require("../middleware/roleMiddleware");

const router = express.Router();
// sends a req to home page
router.get("/",getHome);
//sends a req to getAllMovies
router.get("/movies",getAllMovies);
//sends req to get movies based on id
router.get("/movies/:id",getMovieById);

//sends req to create a new movie
router.post("/movies",authMiddleware,roleMiddleware("admin"),addMovie);
//sends req to update movie detail/s
router.put("/movies/:id",authMiddleware,roleMiddleware("admin"),updateMovie); //put for updation
//sends a req delete a movie
router.delete("/movies/:id",authMiddleware,roleMiddleware("admin"),deleteMovie);

module.exports = router;