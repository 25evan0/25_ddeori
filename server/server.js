const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./db");

// 라우트 파일 불러오기
const bakeryRoutes = require("./routes/bakeryRoutes");
const breadRoutes = require("./routes/breadRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// DB 연결
connectDB();

// 기본 테스트 라우트
app.get("/", (req, res) => {
  res.send("🚀 떨이 API 서버 실행 중");
});

// 라우트 설정
app.use("/api/bakeries", bakeryRoutes);
app.use("/api/breads", breadRoutes);

const PORT = 5002;
app.listen(PORT, () => {
  console.log(`✅ 서버 실행 중: http://localhost:${PORT}`);
});
