const express = require("express");
const router = express.Router();

const {
  getCourses,
  getCourseById,
  createCourse,
} = require("../controllers/courseController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get("/", getCourses);
router.get("/:id", getCourseById);

router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  createCourse
);

module.exports = router;
