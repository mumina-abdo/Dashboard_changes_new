'use client';
import React from 'react';
import { useGetDashboardData } from '../hooks/useGetUsers';
import FoodItemsChart from '../components/CategoriesChart/page';
import ActiveUsersChart from '../components/Userchart/page';
import Sidebar from '../Sidebar/page';
import FoodCategoryPieChart from '../components/pie-chart';

const DashboardOverview = () => {
  const { metrics, isLoading, error } = useGetDashboardData();

  if (isLoading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const totalFoodItems = metrics?.TotalFoodItems ?? 0;
  const totalUsers = metrics?.TotalUsers ?? 0;

  return (
    <div className="mt-12 ml-[50px]">
      <div className="flex gap-16 mt-10 justify-between">
        {/* <div className="bg-[#FF7F50] text-white text-center text-[24px] font-bold p-6 rounded-lg shadow-md w-[400px] h-[200px]
          nesthub:w-[190px] nesthub:h-[100px] nesthub:text-[16px]
          nesthubmax:w-[100px] nesthubmax:h-[80px] nesthubmax:text-[20px] 
          2xl:w-[500px] 2xl:h-[200px] 2xl:text-[32px] ml-[500px] ">
          Total Food Items: {totalFoodItems }
        </div> */}
      
      </div>

      <div className="ml-20 mt-10">
   

        <div>
          <FoodCategoryPieChart/>
        </div>

      </div>
    </div>
  );
};

const Dashboard = () => (
  <div className="flex flex-col lg:flex-row">
    <Sidebar />
    <div className="flex-grow">
      <DashboardOverview />
    </div>
  </div>
);

export default Dashboard;
