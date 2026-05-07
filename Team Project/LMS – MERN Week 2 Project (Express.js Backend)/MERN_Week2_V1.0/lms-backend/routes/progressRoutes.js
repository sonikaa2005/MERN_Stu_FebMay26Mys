const express = require("express");
const router = express.Router();

const {
  markLesson,
  getProgress,
} = require("../controllers/progressController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/:courseId/lesson", authMiddleware, markLesson);

router.get("/:courseId", authMiddleware, getProgress);

module.exports = router;
