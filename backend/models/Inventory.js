const mongoose = require("mongoose");

const usageSchema = new mongoose.Schema({
  date: String,
  quantityUsed: Number,
});

const inventorySchema = new mongoose.Schema({
  itemName: String,
  currentStock: Number,
  usageHistory: [usageSchema],
});

module.exports = mongoose.model("Inventory", inventorySchema);
