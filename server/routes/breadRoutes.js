// routes/breadRoutes.js
const express = require('express');
const router = express.Router();
const { getBreads, addBread, updateBreadStock } = require('../controllers/breadController');

// 📌 모든 빵 조회 (GET)
router.get('/', getBreads);

// 📌 새로운 빵 추가 (POST)
router.post('/', addBread);

// 📌 특정 빵의 재고 업데이트 (PUT)
router.put('/:id/update-stock', updateBreadStock);

module.exports = router;
