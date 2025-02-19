const Bread = require("../models/bread");

const getBreads = async (req, res) => {
  try {
    const breads = await Bread.find({});
    res.json({ success: true, data: breads });
  } catch (error) {
    res.status(500).json({ success: false, message: "서버 오류 발생" });
  }
};

const getBreadById = async (req, res) => {
  try {
    const bread = await Bread.findById(req.params.id);
    if (!bread) {
      return res.status(404).json({ success: false, message: "해당 빵을 찾을 수 없습니다." });
    }
    res.json({ success: true, data: bread });
  } catch (error) {
    res.status(500).json({ success: false, message: "서버 오류 발생" });
  }
};

module.exports = { getBreads, getBreadById };
