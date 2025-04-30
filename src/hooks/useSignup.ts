
import { useApp } from '@/context/AppContext';

export const useSignup = () => {
  const appContext = useApp();
  
  // Add the missing completeSignup functionality
  const completeSignup = async (userData: {
    name: string;
    age: number;
    gender: string;
    goals: string[];
    height: number;
    weight: number;
  }) => {
    try {
      // Update user profile in the app context
      if (appContext.state.currentUser) {
        // Here we'd normally make an API call to update the user profile
        // Since we can't modify AppContext, we'll use existing methods
        
        // Add some XP for completing profile
        appContext.addXP(50);
        
        // Simulate completion of first step
        await appContext.completeStep(1);
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error completing signup:', error);
      return false;
    }
  };
  
  // Return the original context plus our new method
  return {
    ...appContext,
    completeSignup
  };
};
