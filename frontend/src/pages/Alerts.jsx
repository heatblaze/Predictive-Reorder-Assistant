import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);

  
  useEffect(() => {
    axios.get("http://localhost:5000/api/inventory")
      .then(res => setAlerts(res.data.filter(i => i.daysUntilRunOut < 3)))
      .catch(console.error);
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
