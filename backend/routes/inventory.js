const express = require("express");
const router = express.Router();
const mongoose = require("mongoose"); // ✅ For ObjectId validation
const Inventory = require("../models/Inventory");

// Utility: Calculate average usage
function getAvg(history) {
  const total = history.reduce((sum, e) => sum + e.quantityUsed, 0);
  return history.length ? total / history.length : 0;
}

// 🔹 GET all inventory items
//  .\mongod.exe --dbpath D:\mongo-portable\mongo-portable1\data\db
router.get("/", async (req, res) => {
  try {
    const items = await Inventory.find();
    const result = items.map(item => {
      const avg = getAvg(item.usageHistory);
      const daysLeft = avg > 0 ? (item.currentStock / avg).toFixed(1) : "N/A";
      const reorderQty = (avg * 30).toFixed(0);
      return {
        id: item._id,
        itemName: item.itemName,
        currentStock: item.currentStock,
        avgDailyUsage: avg.toFixed(1),
        daysUntilRunOut: daysLeft,
        suggestedReorderQuantity: reorderQty,
      };
    });

    res.json(result);
  } catch (err) {
    console.error("❌ Error in GET /api/inventory:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 POST new inventory item
router.post("/", async (req, res) => {
  const { itemName, currentStock, avgDailyUsage } = req.body;
  const parsedStock = parseFloat(currentStock);
  const parsedUsage = parseFloat(avgDailyUsage);

  try {
    const newItem = new Inventory({
      itemName,
      currentStock: parsedStock,
      usageHistory: [{ quantityUsed: parsedUsage, date: new Date() }],
    });

    await newItem.save();
    res.status(201).json({ message: "Item added successfully!" });
  } catch (error) {
    console.error("❌ Failed to add item:", error);
    res.status(500).json({ message: "Failed to add item." });
  }
});

// 🔹 GET a specific inventory item by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  // ✅ Validate ObjectId before querying
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid item ID format" });
  }

  try {
    const item = await Inventory.findById(id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    const history = Array.isArray(item.usageHistory) ? item.usageHistory : [];
    const avg = getAvg(history);

    const daysLeft = avg > 0 ? (item.currentStock / avg).toFixed(1) : "N/A";
    const reorderQty = (avg * 30).toFixed(0);

    res.json({
      id: item._id,
      itemName: item.itemName,
      currentStock: item.currentStock,
      usageHistory: item.usageHistory,
      avgDailyUsage: avg.toFixed(1),
      daysUntilRunOut: daysLeft,
      suggestedReorderQuantity: reorderQty,
    });
  } catch (error) {
    console.error("❌ Error in GET /api/inventory/:id ➤", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
