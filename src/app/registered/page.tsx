'use client';
import { useEffect, useState } from 'react';
import ActiveUsersChart from '../components/Userchart/page';
import Sidebar from '../Sidebar/page';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

const RegisteredUsersTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const usersPerPage = 15;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://dishhub-2ea9d6ca8e11.herokuapp.com/api/users/register/');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const totalPages = Math.ceil(users.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users
    .filter(user => user.first_name && user.last_name && user.email)
    .slice(indexOfFirstUser, indexOfLastUser);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen">
        <div className="w-64"></div>
        <div className="flex-1 p-4 flex items-center justify-center">
          Loading users...
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>
      <div className="flex-1 p-4">
        <div className="mx-auto max-w-4xl p-4">
          <h1 className="text-3xl font-bold mb-6 text-amber-900 text-center">Registered Users</h1>
          <table className="min-w-full border-collapse border border-gray-300 my-6">
            <thead>
              <tr>
                <th className="border border-orange-500 p-3 text-amber-900 text-lg">First Name</th>
                <th className="border border-orange-500 p-3 text-amber-900 text-lg">Last Name</th>
                <th className="border border-orange-500 p-3 text-amber-900 text-lg">Email</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.length > 0 ? (
                currentUsers.map(user => (
                  <tr key={user.id}>
                    <td className="border border-orange-500 p-3 text-lg">{user.first_name}</td>
                    <td className="border border-orange-500 p-3 text-lg">{user.last_name}</td>
                    <td className="border border-orange-500 p-3 text-lg">{user.email}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="border border-gray-300 p-3 text-center text-lg">No users to display</td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="flex justify-between items-center my-6">
            <button
              className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-orange-200 cursor-not-allowed' : 'bg-orange-500 text-white font-bold'}`}
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              className={`px-4 py-2 rounded-md ${currentPage === totalPages ? 'bg-orange-200 cursor-not-allowed' : 'bg-amber-900 text-orange-500 font-bold'}`}
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisteredUsersTable;





