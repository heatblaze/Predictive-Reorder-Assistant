import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ReorderRequests() {
  const [items, setItems] = useState([]);

  useEffect(() => {
  const BASE_URL = "https://predictive-reorder-assistant.onrender.com"; // ← Hardcoded

  axios.get(`${BASE_URL}/api/inventory`)
    .then(res => setData(res.data))
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
            <li key={i.id}>
              {i.itemName} — reorder {i.suggestedReorderQuantity} units.
            </li>
          ))}
        </ul>
      ) : <p>No urgent reorders needed.</p>}
    </div>
  );
}
