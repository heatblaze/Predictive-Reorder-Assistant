import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function InventoryList() {
  const [data, setData] = useState([]);

 useEffect(() => {
  axios.get("https://predictive-reorder-assistant.onrender.com/api/inventory")
    .then((res) => {
      console.log("Inventory fetched:", res.data);
      setInventory(res.data);
    })
    .catch(console.error);
}, []);


  return (
    <div className="page-container">
      <div className="page-content">
        <h1>📦 Inventory</h1>
        <div className="table-wrapper">
          <table className="inventory-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Stock</th>
                <th>Avg Usage</th>
                <th>Days Left</th>
                <th>Suggested Reorder</th>
              </tr>
            </thead>
            <tbody>
              {data.map(item => (
                <tr key={item.id}>
                  <td>
                    <Link to={`/inventory/${item.id}`}>
                      {item.itemName}
                    </Link>
                  </td>
                  <td>{item.currentStock}</td>
                  <td>{item.avgDailyUsage}</td>
                  <td>{item.daysUntilRunOut}</td>
                  <td>{item.suggestedReorderQuantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
