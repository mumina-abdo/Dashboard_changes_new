const usersApi = '/api/numberUsers';

export const fetchUsers = async (month?: string) => {
  try {
    let apiUrl = usersApi;
    if (month) {
      apiUrl += `?month=${month}`;
    }

    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
