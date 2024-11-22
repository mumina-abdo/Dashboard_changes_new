export const fetchData = async () => {
  try {
    const response = await fetch(`/api/overview`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();

    const { searches, users, totalFoodItems, totalCategories } = data;

    return {
      successfulSearches: searches,
      activeUsers: users,
      totalFoodItems: totalFoodItems,
      totalCategories: totalCategories,
    };
  } catch (error) {
    throw new Error(`Failed to fetch data: ${(error as Error).message}`);
  }
};
