const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// 회원가입
router.post("/register", userController.registerUser);

// 로그인
router.post("/login", userController.loginUser);

// 유저 목록 조회 (관리자 기능)
router.get("/users", userController.getUsers);

// 유저 삭제 (관리자 기능)
router.delete("/users/:userId", userController.deleteUser);

// 유저 정보 수정
router.put("/users/:userId", userController.updateUser);

module.exports = router;
