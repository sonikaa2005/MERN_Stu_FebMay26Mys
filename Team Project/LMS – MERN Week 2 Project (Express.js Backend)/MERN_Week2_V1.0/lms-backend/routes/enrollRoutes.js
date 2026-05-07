const express = require("express");
const router = express.Router();

const {
  enrollCourse,
  getEnrollments,
  withdrawCourse,
} = require("../controllers/enrollController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/:courseId", authMiddleware, enrollCourse);

router.get("/user/all", authMiddleware, getEnrollments);

router.delete("/:courseId", authMiddleware, withdrawCourse);

module.exports = router;
