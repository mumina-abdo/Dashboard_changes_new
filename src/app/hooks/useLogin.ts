import { useState } from 'react';
import { userLogin as loginAPI } from '../utils/userLogin';

const defaultMessages = {
  genericError: 'An unexpected error occurred.',
};

const useLogin = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [userData, setUserData] = useState(null); 

  const userLogin = async (loginData: { username: string; password: string }) => {
    try {
      setIsSubmitting(true);
      const { data, error } = await loginAPI(loginData);
      if (error) {
        setErrorMessage(error);
        setSuccessMessage('');
        setUserData(null); 
      } else {
        setUserData(data);
        return data;
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : defaultMessages.genericError);
      setUserData(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    errorMessage,
    successMessage,
    userData, 
    userLogin,
  };
};

export default useLogin;
