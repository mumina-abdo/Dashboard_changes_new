"use client";
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { ChartOptions } from "chart.js";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { fetchCategories } from "@/app/utils/fetchCategories";
import Sidebar from "@/app/Sidebar/page";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface CategoryData {
  id: number;
  name: string;
  quantity: number;
  category: number;
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
}

const fetchFoodItemsByCategory = async () => {
  try {
    const response = await fetchCategories();
    return response;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

const FoodItemsChart = () => {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        backgroundColor: "",
        borderColor: "",
        borderWidth: 0,
      },
    ],
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: CategoryData[] = await fetchFoodItemsByCategory();
        if (data && data.length > 0) {
          const processedData = processChartData(data);
          setChartData(processedData);
        } else {
          setChartData(getDefaultChartData());
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setChartData(getDefaultChartData());
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const processChartData = (data: CategoryData[]) => {
    const categoryMap = data.reduce((acc, item) => {
      const categoryName = item.category;
      acc[categoryName] = (acc[categoryName] || 0) + item.quantity;
      return acc;
    }, {} as Record<string, number>);

    const categoryNames = Object.keys(categoryMap);
    const itemCounts = Object.values(categoryMap);

    return {
      labels: categoryNames,
      datasets: [
        {
          label: "No. of Food Items",
          data: itemCounts,
          backgroundColor: "#7C3A19",
          borderColor: "#7C3A19",
          borderWidth: 1,
        },
      ],
    };
  };

  const getDefaultChartData = () => {
    return {
      labels: ["Name Categories Available"],
      datasets: [
        {
          label: "No. of Food Items",
          data: [0],
          backgroundColor: "#7C3A19",
          borderColor: "#7C3A19",
          borderWidth: 1,
        },
      ],
    };
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 20,
        bottom: 20,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          font: {
            size: 18, 
            weight: 'bold',
          },
          padding: 20,
        },
      },
      title: {
        display: true,
        text: "No. of Food Items by Category",
        font: {
          size: 26, 
          weight: 'bold',
        },
        padding: {
          top: 20,
          bottom: 20,
        },
        color: "#7C3A19",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Available categories",
          font: {
            size: 24, 
          },

          padding: {
            top: 20,
            bottom: 20,
          },

          color:"#"

        },
        ticks: {
          font: {
            size: 20, 
          },

          color:'#7C3A19',

        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: "No. of Food Items",
          font: {
            size: 24, 
        
          },

          padding: {
            top: 20,
            bottom: 20,
          },

          color:"#"

        },
        ticks: {
          font: {
            size: 20, 
          },

          color:'#7C3A19',

        },
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-700">Loading chart...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <div className="h-screen flex items-center justify-center p-8">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-7xl">
              <div className="h-[80vh] p-6">
                <Bar data={chartData} options={options} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FoodItemsChart;
