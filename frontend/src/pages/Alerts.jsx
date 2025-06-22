import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const BASE_URL = "https://predictive-reorder-assistant.onrender.com";

    axios.get(`${BASE_URL}/api/inventory`)
      .then(res => {
        console.log("Fetched items:", res.data); // 🔍 Debug log

        const processed = res.data.map(item => {
          const daysUntilRunOut = Math.floor(item.currentStock / item.avgDailyUsage);
          return {
            ...item,
            daysUntilRunOut
          };
        });

        const critical = processed.filter(i => i.daysUntilRunOut <= 3);
        console.log("Critical alerts:", critical); // 🔍 Debug log

        setAlerts(critical);
      })
      .catch(err => {
        console.error("Failed to fetch inventory:", err);
      });
  }, []);

  return (
    <div className="page-content">
      <h1>⚠️ Alerts</h1>
      {alerts.length ? (
        alerts.map(a => (
          <p key={a._id || a.id}>
            ⚠️ {a.itemName} running out in {a.daysUntilRunOut} days!
          </p>
        ))
      ) : (
        <p>✅ All items are in healthy stock levels.</p>
      )}
    </div>
  );
}
