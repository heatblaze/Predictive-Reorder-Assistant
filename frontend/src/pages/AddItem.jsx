import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddItem() {
  const [itemName, setItemName] = useState('');
  const [currentStock, setCurrentStock] = useState('');
  const [avgDailyUsage, setAvgDailyUsage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure numbers are parsed as integers/floats
    const stock = parseInt(currentStock);
    const usage = parseFloat(avgDailyUsage);

    axios.post("https://predictive-reorder-assistant.onrender.com/api/inventory", {
      itemName,
      currentStock: stock,
      avgDailyUsage: usage
    })
      .then(() => {
        alert("Item added successfully!");
        setItemName('');
        setCurrentStock('');
        setAvgDailyUsage('');
        navigate("/inventory");  // Redirect to inventory list
      })
      .catch((err) => {
        console.error("Failed to add item:", err);
        alert("Failed to add item. Please try again.");
      });
  };

  return (
    <div className="page-container">
      <div className="page-content">
        <h1>➕ Add Inventory Item</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Item Name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Current Stock"
            value={currentStock}
            onChange={(e) => setCurrentStock(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Average Daily Usage"
            value={avgDailyUsage}
            onChange={(e) => setAvgDailyUsage(e.target.value)}
            required
          />
          <button type="submit">Add Item</button>
        </form>
      </div>
    </div>
  );
}
