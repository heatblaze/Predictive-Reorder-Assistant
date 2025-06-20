import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function InventoryDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/inventory/${id}`);
        setItem(res.data);
      } catch (err) {
        console.error("Error fetching item:", err.response?.data || err.message);
      }
    };
    fetchItem();
  }, [id]);

  if (!item) return <div className="page-container"><p>Loading...</p></div>;

  return (
    <div className="page-container">
      <div className="page-content">
        <h2>📦 {item.itemName} Details</h2>
        <ul style={{ textAlign: 'left', listStyle: 'none', padding: 0 }}>
          <li><strong>Current Stock:</strong> {item.currentStock}</li>
          <li><strong>Average Daily Usage:</strong> {item.avgDailyUsage}</li>
          <li><strong>Days Until Run Out:</strong> {item.daysUntilRunOut}</li>
          <li><strong>Suggested Reorder Quantity:</strong> {item.suggestedReorderQuantity}</li>
        </ul>
      </div>
    </div>
  );
}
