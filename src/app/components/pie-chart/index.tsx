'use client'
import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const mockData = {
  vegetables: 33,
  fruits: 40,
  grains: 21,
  dairy: 46,
};

const fetchCategoryData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData);
    }, 500); 
  });
};

const FoodCategoryDoughnutChart = () => {
  const [categoryData, setCategoryData] = useState({
    vegetables: 0,
    fruits: 0,
    grains: 0,
    dairy: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCategoryData();
      setCategoryData(data);
    };
    fetchData();
  }, []);

  const categories = ['vegetables', 'fruits', 'grains', 'dairy'];

  const totalCount = categories.reduce((total, category) => total + categoryData[category], 0);

  const data = {
    labels: categories.map(c => c.charAt(0).toUpperCase() + c.slice(1)), 
    datasets: [
      {
        label: '# of Food Items',
        data: categories.map(category => categoryData[category]),
        backgroundColor: [
          '#008000', 
          '#FFD700', 
          '#8B4513', 
          '#FF4500', 
        ],
        hoverBackgroundColor: [
          '#006400',
          '#FFC300', 
          '#6B4F3C', 
          '#FF6347',
        ],
    
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen"> 
      <h2 className='mb-4'>Food Items in Each Category</h2>
      <div className="flex flex-row space-x-4 mb-24 ">
        <Card category="Vegetables" itemCount={categoryData.vegetables} />
        <Card category="Fruits" itemCount={categoryData.fruits} />
        <Card category="Grains" itemCount={categoryData.grains} />
        <Card category="Dairy" itemCount={categoryData.dairy} />
      </div>
      <div className="flex mb-8 items-center gap-40">
        <div className="bg-[#f59e0b] border border-[#f59e0b] rounded-lg p-24">
          <h3 className='text-lg font-bold text-white'>Total Count of All Items: {totalCount}</h3>
        </div>
        <div className='w-[500px] h-[500px] mx-auto transition-transform duration-300 hover:scale-105'> 
          <Doughnut data={data} options={{ animation: { animateScale: true, animateRotate: true } }} />
        </div>
      </div>
    </div>
  );
};

const Card = ({ category, itemCount }) => {
  return (
    <div className='border rounded-lg shadow-lg p-6 w-1/5 transition-shadow duration-300 hover:shadow-2xl border-[#f59e0b]'>
      <h3 className='text-lg font-bold'>{category}</h3>
      <p>Total Items: {itemCount}</p>
    </div>
  );
};

export default FoodCategoryDoughnutChart;











