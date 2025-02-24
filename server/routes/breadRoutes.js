const express = require("express");
const router = express.Router();
const {
  getBreads,
  getBreadById,
  addBread,
  updateBread,
  deleteBread,
} = require("../controllers/breadController");

router.get("/", getBreads);
router.get("/:id", getBreadById);
router.post("/", addBread);
router.put("/:id", updateBread);
router.delete("/:id", deleteBread);

module.exports = router;
