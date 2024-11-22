'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  BarChart3,
  Users,
  PieChart,
  Home,
  ChevronLeft,
  Menu,
  LogOut 
} from 'lucide-react';

const Sidebar = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const router = useRouter();

  
  const handleLogout = () => {
    const confirmed = window.confirm('Are you sure you want to logout?');
    if (confirmed) {
      
      localStorage.removeItem('token'); 
      router.push('/login'); 
    }
  };

  return (
    <div className={`min-h-screen bg-amber-900 text-yellow-300 transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex items-center justify-between p-4 border-b border-amber-800 text-200">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-amber-800 text-yellow-200"
        >
          {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <div className={`flex p-4 ${collapsed ? 'p-4' : 'p-8'}`}>
        <div className={`relative ${collapsed ? 'w-10 h-10' : 'w-40 h-40'} transition-all duration-300`}>
          <Image
            src="/images/logoKuwala.png"
            alt="dishhub"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      <nav className="p-3 mt-[40px]">
        <ul className="space-y-2">
          <li>
            <Link href="/dashboard" className="flex items-center p-3 rounded-lg hover:bg-amber-500 transition-colors group font-bold text-500">
              <Home size={20} className="text-yellow-300 group-hover:text-yellow-200" />
              <span className={`ml-3 text-yellow-300 group-hover:text-yellow-200 ${collapsed ? 'hidden' : 'block'}`}>
                Overview
              </span>
            </Link>
          </li>
          <br />
          <br />
          <br />

          <li>
            <Link href="/components/CategoriesChart" className="flex items-center p-3 rounded-lg hover:bg-amber-500 transition-colors group font-bold text-500">
              <BarChart3 size={20} className="text-yellow-300 group-hover:text-yellow-200" />
              <span className={`ml-3 text-yellow-300 group-hover:text-yellow-200 ${collapsed ? 'hidden' : 'block'}`}>
                Categories Chart
              </span>
            </Link>
          </li>
          <br />
          <br />
          <br />

          <li>
            <Link href="/components/activeUserChart" className="flex items-center p-3 rounded-lg hover:bg-amber-500 transition-colors group font-bold text-500">
              <PieChart size={20} className="text-yellow-300 group-hover:text-yellow-200" />
              <span className={`ml-3 text-yellow-300 group-hover:text-yellow-200 ${collapsed ? 'hidden' : 'block'}`}>
              Users Per Month
              </span>
            </Link>
          </li>
          <br />
          <br />
          <br />

          <li>
            <Link href="/registered" className="flex items-center p-3 rounded-lg hover:bg-amber-500 transition-colors group font-bold text-500">
              <Users size={20} className="text-yellow-300 group-hover:text-yellow-200" />
              <span className={`ml-3 text-yellow-300 group-hover:text-yellow-200 ${collapsed ? 'hidden' : 'block'}`}>
                Registered Users
              </span>
            </Link>
          </li>
          <br />
          <br />
          <br />

        </ul>
      </nav>

      <div className="mt-auto p-4">
        <button onClick={handleLogout} className="flex items-center p-3 rounded-lg hover:bg-amber-500 transition-colors group font-bold text-500">
          <LogOut size={20} className="text-yellow-300 group-hover:text-yellow-200" />
          <span className={`ml-3 text-yellow-300 group-hover:text-yellow-200 ${collapsed ? 'hidden' : 'block'}`}>
            Logout
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
