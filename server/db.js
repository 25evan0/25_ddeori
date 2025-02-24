const mongoose = require("mongoose");
require("dotenv").config(); // ✅ .env 파일 로드 (1️⃣ 여기에서 환경 변수 불러옴)

const connectDB = async () => {
  try {
    // ✅ 현재 MONGO_URI 값 확인 (디버깅용)
    if (!process.env.MONGO_URI) {  // 2️⃣ 환경 변수에서 MONGO_URI 가져옴
      throw new Error("❌ 환경 변수에서 MONGO_URI를 찾을 수 없습니다. .env 파일을 확인하세요.");
    }
    console.log("📌 현재 사용 중인 MONGO_URI:", process.env.MONGO_URI); // 3️⃣ 콘솔에 MONGO_URI 값 출력

    // ✅ MongoDB 연결 (4️⃣ 여기에서 실제로 MONGO_URI를 MongoDB 연결에 사용)
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // ⏳ 5초 내에 응답이 없으면 오류 반환
      autoIndex: true, // ✅ 인덱스 자동 생성
    });

    console.log("✅ MongoDB 연결 성공! 현재 사용 중인 DB:", mongoose.connection.db.databaseName);

    // ✅ 연결된 DB에서 컬렉션 목록 확인
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("📌 현재 DB의 컬렉션 목록:", collections.map((col) => col.name));
  } catch (error) {
    console.error("❌ MongoDB 연결 실패:");
    console.error("🚨 오류 메시지:", error.message || error);
    process.exit(1);
  }
};

module.exports = connectDB;
