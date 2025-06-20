import { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default function Reports() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/inventory")
      .then(res => setData(res.data))
      .catch(console.error);
  }, []);

  const chartData = {
    labels: data.map(i => i.itemName),
    datasets: [{
      label: "Avg Daily Usage",
      data: data.map(i => i.avgDailyUsage),
      backgroundColor: "rgba(0, 240, 255, 0.2)",
      borderColor: "#00f0ff",
      borderWidth: 3,
      pointBackgroundColor: "#00f0ff",
      pointBorderColor: "#00f0ff",
      tension: 0.4,
      fill: true,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#fff",
          font: {
            size: 14
          }
        }
      },
      tooltip: {
        backgroundColor: "#222",
        titleColor: "#fff",
        bodyColor: "#fff"
      }
    },
    scales: {
      x: {
        ticks: {
          color: "#fff",
        },
        grid: {
          color: "#444"
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#fff"
        },
        grid: {
          color: "#444"
        }
      }
    }
  };

  return (
    <div className="reports-container">
      <h2>📈 Reports</h2>
      <div className="custom-chart-wrapper">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
