// MERN_Stu_FebMay26Mys\W9\D0\movie-booking-backend\src\routes\show.routes.js
const express = require("express");
const router = express.Router();

const showController = require("../controllers/show.controller");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");

/*
-----------------------------------------
USER ROUTES
-----------------------------------------
*/
router.get("/", showController.getShows);
router.get("/:id", showController.getShowById);

/*
-----------------------------------------
ADMIN ROUTES
-----------------------------------------
*/
router.post("/", protect, authorize("admin"), showController.createShow);
router.put("/:id", protect, authorize("admin"), showController.updateShow);
router.delete("/:id", protect, authorize("admin"), showController.deleteShow);

module.exports = router;