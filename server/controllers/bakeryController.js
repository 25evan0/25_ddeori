const Bakery = require("../models/bakery");

const addBakery = async (req, res) => {
  try {
    const { bakery_id, name, address, phone, owner, business_hours, breads } = req.body;
    if (!bakery_id || !name) {
      return res.status(400).json({ error: "빵집 ID와 이름은 필수입니다." });
    }

    // 중복 bakery_id 체크
    const existing = await Bakery.findOne({ bakery_id });
    if (existing) {
      return res.status(400).json({ error: "이미 존재하는 bakery_id입니다." });
    }

    // 먼저 빵집 등록 (breads 없이)
    const newBakery = new Bakery({ bakery_id, name, address, phone, owner, business_hours });
    await newBakery.save();

    // 만약 breads 배열이 있다면, Bread 컬렉션에 삽입 후 Bakery의 breads 필드를 업데이트
    if (breads && Array.isArray(breads) && breads.length > 0) {
      const Bread = require("../models/bread");
      const insertedBreads = await Bread.insertMany(
        breads.map(bread => ({ ...bread, bakery_id }))
      );
      newBakery.breads = insertedBreads.map(b => b._id);
      await newBakery.save();
    }

    res.status(201).json({ success: true, bakery: newBakery });
  } catch (error) {
    console.error("addBakery error:", error);
    res.status(500).json({ error: "서버 오류로 빵집 추가 실패" });
  }
};

// (다른 컨트롤러 함수들은 그대로 유지)

const getBakeries = async (req, res) => {
  try {
    const bakeries = await Bakery.find().populate("breads");
    res.json(bakeries);
  } catch (error) {
    res.status(500).json({ error: "서버 오류로 빵집 조회 실패" });
  }
};

const getBakeryById = async (req, res) => {
  try {
    const bakery = await Bakery.findOne({ bakery_id: req.params.id }).populate("breads");
    if (!bakery) {
      return res.status(404).json({ error: "빵집을 찾을 수 없음" });
    }
    res.json(bakery);
  } catch (error) {
    res.status(500).json({ error: "서버 오류로 빵집 조회 실패" });
  }
};

const updateBakery = async (req, res) => {
  res.status(501).json({ message: "업데이트 기능 미구현" });
};

const deleteBakery = async (req, res) => {
  res.status(501).json({ message: "삭제 기능 미구현" });
};

module.exports = {
  addBakery,
  getBakeries,
  getBakeryById,
  updateBakery,
  deleteBakery,
};
