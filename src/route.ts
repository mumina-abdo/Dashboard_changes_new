import { useState, useEffect } from "react";

interface ApiData {
  successfulSearches: Array<{ month: string; searches: number }>;
  activeUsers: Array<{ month: string; users: number }>;
  totalFoodItems: Array<{ month: string; recipes: number }>;
  totalCategories: Array<{ month: string; count: number }>;
}

export const useGetAllData = () => {
  const [data, setData] = useState<ApiData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/overview");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result: ApiData = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error occurred"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  return { data, isLoading, error };
};
