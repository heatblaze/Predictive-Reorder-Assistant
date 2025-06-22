import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);

  
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
      <h1>⚠️ Alerts</h1>
      {alerts.length ? alerts.map(a => (
        <p key={a.id}>⚠️ {a.itemName} running out in {a.daysUntilRunOut} days!</p>
      )) : <p>✅ All items are in healthy stock levels.</p>}
    </div>
  );
}
