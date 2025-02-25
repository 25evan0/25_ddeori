const mongoose = require("mongoose");

const bakerySchema = new mongoose.Schema({
  bakery_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  owner: { type: String, required: true },
  business_hours: {
    open: { type: String, required: true },
    close: { type: String, required: true }
  },
  breads: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bread" }]
});

module.exports = mongoose.model("Bakery", bakerySchema);
