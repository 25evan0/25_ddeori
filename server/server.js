const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./db"); // MongoDB 연결
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// 빵집 API
const bakeryRoutes = require("./routes/bakeryRoutes");
app.use("/api/bakeries", bakeryRoutes);

// 서버 시작
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`✅ 서버가 http://localhost:${PORT}에서 실행 중!`);
});
