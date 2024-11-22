const url = '/api/users/login';

export const userLogin = async (loginData: { username: string; password: string }) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    if (!response.ok) {
      throw new Error(`You don't have an account.Please Sign up`);
    }

    return await response.json();


  } catch (error) {
    console.error('Login error:', error);
    return { 
      error: error instanceof Error ? error.message : 'An unknown error occurred' 
    };
  }
};