import { useState, useEffect } from 'react';
import { fetchUsers } from '../utils/fetchUsers';
import { fetchCategories } from '../utils/fetchCategories';

export const useGetDashboardData = () => {
  const [metrics, setMetrics] = useState({
    TotalFoodItems: 0,
    TotalUsers: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const usersResult = await fetchUsers();
        const foodItemsResult = await fetchCategories();

        setMetrics({
          TotalFoodItems: foodItemsResult.length ?? 0, 
          TotalUsers: usersResult.length ?? 0,  
        });
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error('An unknown error occurred'));
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchMetrics();
  }, []);

  return { metrics, isLoading, error };
};
