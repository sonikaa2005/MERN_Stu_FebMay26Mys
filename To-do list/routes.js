const express = require("express");
const router = express.Router();

const ctrl = require("./controller");

// create
router.post("/", ctrl.create);
// read (update all)
router.get("/", ctrl.getAll);
// read one
router.get("/:id", ctrl.getOne);
// update
router.put("/:id", ctrl.update);
// delete
router.delete("/:id", ctrl.remove);

module.exports = router;