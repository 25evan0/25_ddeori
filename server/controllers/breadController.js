const Bread = require("../models/bread");
const Bakery = require("../models/bakery");

// 모든 빵 조회
const getBreads = async (req, res) => {
  try {
    const breads = await Bread.find();
    res.json(breads);
  } catch (error) {
    res.status(500).json({ error: "서버 오류로 빵 조회 실패" });
  }
};

// 특정 빵 조회 (ObjectId로 조회)
const getBreadById = async (req, res) => {
  try {
    const bread = await Bread.findById(req.params.id);
    if (!bread) {
      return res.status(404).json({ error: "빵을 찾을 수 없음" });
    }
    res.json(bread);
  } catch (error) {
    res.status(500).json({ error: "서버 오류로 빵 조회 실패" });
  }
};

// 빵 추가 (빵집이 없으면 자동 생성)
const addBread = async (req, res) => {
  try {
    const { bakery_id, name, price, stock } = req.body;
    if (!bakery_id || !name) {
      return res.status(400).json({ error: "빵집 ID와 빵 이름은 필수" });
    }
    let bakery = await Bakery.findOne({ bakery_id });
    if (!bakery) {
      bakery = new Bakery({
        bakery_id,
        name: "자동 생성된 빵집",
        address: "미정",
        phone: "미정",
        owner: "미정",
        business_hours: { open: "00:00", close: "00:00" },
      });
      await bakery.save();
    }
    const newBread = new Bread({ bakery_id, name, price, stock });
    await newBread.save();
    bakery.breads.push(newBread._id);
    await bakery.save();
    res.status(201).json({ success: true, bread: newBread });
  } catch (error) {
    res.status(500).json({ error: "서버 오류로 빵 추가 실패" });
  }
};

// 빵 업데이트 (미구현)
const updateBread = async (req, res) => {
  res.status(501).json({ message: "업데이트 기능 미구현" });
};

// 빵 삭제 (미구현)
const deleteBread = async (req, res) => {
  res.status(501).json({ message: "삭제 기능 미구현" });
};

module.exports = {
  getBreads,
  getBreadById,
  addBread,
  updateBread,
  deleteBread,
};
