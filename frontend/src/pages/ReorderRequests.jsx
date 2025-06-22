import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ReorderRequests() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const BASE_URL = "https://predictive-reorder-assistant.onrender.com";

    axios.get(`${BASE_URL}/api/inventory`)
      .then(res => {
        const processed = res.data.map(item => {
          const daysUntilRunOut = Math.floor(item.currentStock / item.avgDailyUsage);
          const suggestedReorderQuantity = Math.max((item.avgDailyUsage * 7) - item.currentStock, 0);
          return {
            ...item,
            daysUntilRunOut,
            suggestedReorderQuantity
          };
        });

        const urgent = processed.filter(i => i.daysUntilRunOut <= 7);
        setItems(urgent);
      })
      .catch(err => {
        console.error("Failed to fetch inventory:", err);
      });
  }, []);

  return (
    <div className="page-content">
      <h2>🔄 Reorder Requests</h2>
      {items.length ? (
        <ul>
          {items.map(i => (
            <li key={i._id}>
              {i.itemName} — reorder {i.suggestedReorderQuantity} units.
            </li>
          ))}
        </ul>
      ) : <p>No urgent reorders needed.</p>}
    </div>
  );
}
