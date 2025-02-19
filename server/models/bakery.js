const mongoose = require('mongoose');

const bakerySchema = new mongoose.Schema({
  bakery_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  breads: [
    {
      name: String,
      price: Number,
      stock: Number,
    },
  ],
});

module.exports = mongoose.model('Bakery', bakerySchema);
