const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// ✅ 회원가입 (Register)
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 이메일 중복 확인
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "이미 존재하는 이메일입니다." });
    }

    // 새 유저 생성
    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: "회원가입 성공", user: newUser });
  } catch (error) {
    res.status(500).json({ error: "회원가입 실패" });
  }
};

// ✅ 로그인 (Login)
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "이메일이 존재하지 않습니다." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "비밀번호가 틀렸습니다." });

    // JWT 토큰 생성
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "로그인 성공", token });
  } catch (error) {
    res.status(500).json({ error: "로그인 실패" });
  }
};

module.exports = { registerUser, loginUser };
