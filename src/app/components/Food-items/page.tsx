// components/FoodItemsChart.js
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const FoodItemsChart = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await fetch('https://dishhub-2ea9d6ca8e11.herokuapp.com/api/categories/1/food-items/');
        const data = await response.json();
        setFoodItems(data);
      } catch (error) {
        console.error('Error fetching food items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodItems();
  }, []);

  const chartData = {
    labels: foodItems.map(item => item.name),
    datasets: [
      {
        label: 'Quantity',
        data: foodItems.map(item => item.quantity),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Food Items Quantity' },
    },
  };

  if (loading) return <p>Loading chart...</p>;

  return <Bar data={chartData} options={options} />;
};

export default FoodItemsChart;
