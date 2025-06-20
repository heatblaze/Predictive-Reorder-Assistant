const mongoose = require("mongoose");
const Inventory = require("./models/Inventory");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI);

const start = new Date("2025-06-01");

function generateUsage() {
  const data = [];
  for (let i = 0; i < 15; i++) {
    const date = new Date(start);
    date.setDate(date.getDate() + i);
    data.push({
      date: date.toISOString().split("T")[0],
      quantityUsed: Math.floor(Math.random() * 11 + 5),
    });
  }
  return data;
}

async function seed() {
  await Inventory.deleteMany();
  for (let i = 0; i < 10; i++) {
    await Inventory.create({
      itemName: `Item ${String.fromCharCode(65 + i)}`,
      currentStock: Math.floor(Math.random() * 100 + 50),
      usageHistory: generateUsage(),
    });
  }
  console.log("✅ Mock data seeded");
  process.exit();
}

seed();
