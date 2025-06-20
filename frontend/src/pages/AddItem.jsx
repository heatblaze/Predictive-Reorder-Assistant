import { useState } from 'react';
import axios from 'axios';

export default function AddItem() {
  const [itemName, setItemName] = useState('');
  const [currentStock, setCurrentStock] = useState('');
  const [avgDailyUsage, setAvgDailyUsage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/inventory", {
      itemName, currentStock, avgDailyUsage
    }).then(() => {
      alert("Item added successfully!");
      setItemName('');
      setCurrentStock('');
      setAvgDailyUsage('');
    }).catch(console.error);
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
