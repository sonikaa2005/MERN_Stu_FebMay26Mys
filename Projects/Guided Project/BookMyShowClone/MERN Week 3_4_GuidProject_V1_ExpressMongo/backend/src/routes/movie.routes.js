const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");

// public route
router.get("/", (req, res) => {
    res.send("Get Movies");
});

//Admin only route
router.post("/", protect, authorize("admin"), (req, res) => {
    res.send("Create Movie");
});
module.exports = router;