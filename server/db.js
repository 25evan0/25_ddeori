const mongoose = require("mongoose");
require("dotenv").config(); // ✅ .env 파일 로드

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("❌ 환경 변수에서 MONGO_URI를 찾을 수 없습니다. .env 파일을 확인하세요.");
    }
    console.log("📌 현재 사용 중인 MONGO_URI:", process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // ⏳ 5초 후 연결 실패 방지
    });

    console.log("✅ MongoDB 연결 성공! 현재 사용 중인 DB:", mongoose.connection.db.databaseName);
  } catch (error) {
    console.error("❌ MongoDB 연결 실패:", error.message || error);
    process.exit(1);
  }
};

module.exports = connectDB;
