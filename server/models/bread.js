const mongoose = require("mongoose");

const breadSchema = new mongoose.Schema({
  bakery_id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true }
});

module.exports = mongoose.model("Bread", breadSchema);
