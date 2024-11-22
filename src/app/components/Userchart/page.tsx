'use client';
import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';
import { Chart as ChartJS, LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { fetchUsers } from '@/app/utils/fetchUsers'; 
import Sidebar from '@/app/Sidebar/page';
import { Bold } from 'lucide-react';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface UserData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  created_at: string;
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

const ActiveUsersChart = () => {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: 'Total Users Per Month',
        data: [],
        backgroundColor: '#7C3A19',
        borderColor: '#7C3A19',
        borderWidth: 1,
      },
    ],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0);
  const [month, setMonth] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: UserData[] = await fetchUsers(month); 
        const processedData = processChartData(data);
        setChartData(processedData);
        setTotalUsers(data.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [month]);

  const processChartData = (data: UserData[]) => {
    const userCountsByMonth: Record<string, number> = {
      'Jan': 0, 'Feb': 0, 'Mar': 0, 'Apr': 0, 'May': 0, 'Jun': 0,
      'Jul': 0, 'Aug': 0, 'Sep': 0, 'Oct': 0, 'Nov': 0, 'Dec': 0,
    };

    data.forEach(user => {
      const date = new Date(user.created_at);
      if (isNaN(date.getTime())) return;

      const month = date.toLocaleString('default', { month: 'short' });
      if (userCountsByMonth[month] !== undefined) {
        userCountsByMonth[month] += 1;
      }
    });

    const labels = Object.keys(userCountsByMonth);
    const counts = labels.map(label => userCountsByMonth[label]);

    return {
      labels,
      datasets: [
        {
          label: 'Total Users Per Month',
          data: counts,
          backgroundColor: '#7C3A19',
          borderColor: '#7C3A19',
          borderWidth: 1,
        },
      ],
    };
  };

  const options: ChartOptions<'bar'> = {
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            size: 20, 
          },
        },
      },
      title: {
        display: true,
        text: 'Total Users Per Month',
        font: {
          size: 24, 
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Months',
          font: {
            size: 24, 
          },

          color:"#",
        },

        ticks: {
          font: {
            size: 18, 
          },

          color:'#7C3A19',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Users',
          font: {
            size: 24, 
          },

          color:"#"
        },
        ticks: {
          font: {
            size: 18, 
          },

          color:'#7C3A19',

        },
      },
    },
  };

  if (isLoading) return <div>Loading chart...</div>;

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-4 flex flex-col">
        <div className="bg-amber-500 text-orange-900 text-center text-5xl font-bold p-12 rounded-lg shadow-md w-full max-w-[1200px] my-12 mx-auto">
          Total Users: {totalUsers}
        </div>

        <div className="chart-container shadow-lg w-full max-w-[1200px] flex-1 mx-auto my-12">
          <Bar data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default ActiveUsersChart;








