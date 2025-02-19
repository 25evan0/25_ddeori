const express = require("express");
const router = express.Router();
const {
  getBakeries,
  getBakeryById,
  addBreadToBakery,
  getBreadsByBakeryId,
} = require("../controllers/bakeryController");

// 📌 모든 빵집 조회 (GET)
router.get("/", getBakeries);

// 📌 특정 빵집 조회 (GET)
router.get("/:id", getBakeryById);

// 📌 특정 빵집에 빵 추가 (PUT)
router.put("/:id/add-bread", addBreadToBakery);

// 📌 특정 빵집의 빵 목록 조회 (GET)
router.get("/:id/breads", getBreadsByBakeryId);

module.exports = router;
