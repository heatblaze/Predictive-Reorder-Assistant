import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ReorderRequests() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/inventory")
      .then(res => setItems(res.data.filter(i => i.daysUntilRunOut <= 5)))
      .catch(console.error);
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
