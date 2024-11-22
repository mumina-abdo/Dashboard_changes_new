interface UserSignupData {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
}

const url = '/api/users/register';

export const userSignup = async (userData: UserSignupData) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    
    if (!response.ok) {
      return { success: false, error: data.error || 'An error occurred during signup' };
    }

    return { success: true, message: data.message || 'Signup successful' };
  } catch (error) {
    console.error('Error during signup:', error);
    return { success: false, error: 'An unexpected error occurred during signup' };
  }
};
