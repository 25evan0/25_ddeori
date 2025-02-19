const Bakery = require("../models/bakery");
const Bread = require("../models/bread");

// 📌 모든 빵집 조회 (GET)
const getBakeries = async (req, res) => {
  try {
    const bakeries = await Bakery.find({});
    res.json({ success: true, data: bakeries });
  } catch (error) {
    res.status(500).json({ success: false, message: "서버 오류 발생" });
  }
};

// 📌 특정 빵집 조회 (GET)
const getBakeryById = async (req, res) => {
  try {
    const bakery = await Bakery.findOne({ bakery_id: req.params.id });
    res.json({ success: true, data: bakery });
  } catch (error) {
    res.status(500).json({ success: false, message: "서버 오류 발생" });
  }
};

// 📌 특정 빵집의 빵 목록 조회 (GET)
const getBreadsByBakeryId = async (req, res) => {
  try {
    const bakery = await Bakery.findOne({ bakery_id: req.params.id });
    res.json({ success: true, data: bakery?.breads || [] });
  } catch (error) {
    res.status(500).json({ success: false, message: "서버 오류 발생" });
  }
};

// 📌 특정 빵집에 빵 추가 (PUT)
const addBreadToBakery = async (req, res) => {
  try {
    const bakery = await Bakery.findOne({ bakery_id: req.params.id });
    if (!bakery) return res.status(404).json({ success: false, message: "빵집을 찾을 수 없음" });

    let bread = await Bread.findOne({ name: req.body.name });

    if (!bread) {
      bread = new Bread({ name: req.body.name, price: req.body.price, stock: req.body.stock || 0 });
      await bread.save();
    } else {
      bread.stock += req.body.stock;
      await bread.save();
    }

    bakery.breads.push({ name: bread.name, price: bread.price, stock: req.body.stock || 0 });
    await bakery.save();

    res.json({ success: true, message: "✅ 빵 추가됨 (Bread 컬렉션 + Bakery 동기화)", data: bakery.breads });
  } catch (error) {
    console.error("❌ 서버 오류:", error);
    res.status(500).json({ success: false, message: "서버 오류 발생", error: error.toString() });
  }
};

module.exports = {
  getBakeries,
  getBakeryById,
  addBreadToBakery,
  getBreadsByBakeryId,
};
