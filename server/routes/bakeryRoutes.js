const express = require("express");
const router = express.Router();
const {
  getBakeries,
  getBakeryById,
  addBakery,
  updateBakery,
  deleteBakery,
} = require("../controllers/bakeryController");

router.get("/", getBakeries);
router.get("/:id", getBakeryById);
router.post("/", addBakery);
router.put("/:id", updateBakery);
router.delete("/:id", deleteBakery);

module.exports = router;
