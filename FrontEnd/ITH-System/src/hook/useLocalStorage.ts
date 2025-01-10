// Import useState from React for managing state
import { useState } from 'react';

// Define interface for User data structure
interface UserData {
  USER_USERNAME: string,
  USER_EMAIL: string,
  USER_FIRSTNAME: string,
  USER_LASTNAME: string,
  USER_ROLE: string,
  USER_CHANGEPASS: string,
  USER_STATUS: string,
}

// Custom hook useLocalStorage for storing data in localStorage
const useLocalStorage = (key: string, initialValue: UserData[]) => {
  // Initialize state storedValue with localStorage data or initialValue
  const [storedValue, setStoredValue] = useState<UserData[]>(() => {
    try {
      const item = window.localStorage.getItem(key);
      // Parse stored JSON or return initialValue if parsing fails or no data exists
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // Define setValue function to update state and store data in localStorage
  const setValue = (value: UserData[]) => {
    try {
      // Allow value to be a function to update based on previous state
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Update state
      setStoredValue(valueToStore);
      // Store in localStorage as JSON
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  // Return storedValue state and setValue function as a tuple
  return [storedValue, setValue] as const;
};

// Export useLocalStorage hook for use in other components
export default useLocalStorage;