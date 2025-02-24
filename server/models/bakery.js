const mongoose = require("mongoose");

const bakerySchema = new mongoose.Schema({
  bakery_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  address: { type: String },
  phone: { type: String },
  owner: { type: String },
  business_hours: {
    open: { type: String },
    close: { type: String },
  },
  // Bread와의 참조 관계: Bread 컬렉션의 ObjectId 배열
  breads: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bread" }],
});

module.exports = mongoose.model("Bakery", bakerySchema);
