
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppState, User, JourneyStep, Achievement, DiaryEntry } from '@/types';
import { mockSteps } from '@/data/steps';
import { mockAchievements } from '@/data/achievements';
import { useToast } from '@/hooks/use-toast';

// Default state for our app
const initialState: AppState = {
  currentUser: null,
  isLoading: true,
  steps: mockSteps,
  achievements: mockAchievements,
  diaryEntries: [],
  users: [],
};

type AppContextType = {
  state: AppState;
  login: (email: string) => Promise<boolean>;
  logout: () => void;
  completeStep: (stepId: number) => void;
  addDiaryEntry: (entry: Omit<DiaryEntry, 'id' | 'user_id'>) => void;
  unlockAchievement: (achievementId: number) => void;
  addXP: (amount: number) => void;
  fetchUsers: () => void; // For admin panel
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(initialState);
  const { toast } = useToast();

  // Simulate loading user from localStorage on app initialization
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    const storedDiaryEntries = localStorage.getItem('diaryEntries');
    const storedAchievements = localStorage.getItem('achievements');
    
    if (storedUser) {
      setState(prev => ({
        ...prev,
        currentUser: JSON.parse(storedUser),
        isLoading: false,
        diaryEntries: storedDiaryEntries ? JSON.parse(storedDiaryEntries) : [],
        achievements: storedAchievements ? JSON.parse(storedAchievements) : mockAchievements,
      }));
    } else {
      setState(prev => ({
        ...prev,
        isLoading: false
      }));
    }
  }, []);

  // Mock login function - in a real app, this would call a backend API
  const login = async (email: string): Promise<boolean> => {
    try {
      // Simulate API call
      setState(prev => ({ ...prev, isLoading: true }));
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user is admin (for demo)
      const isAdmin = email.includes('admin');
      
      // In a real app, you would validate the email against your database
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        xp_total: 0,
        current_step: 1,
        avatar_status: 1,
        is_admin: isAdmin,
        created_at: new Date().toISOString(),
      };
      
      localStorage.setItem('currentUser', JSON.stringify(mockUser));
      
      setState(prev => ({
        ...prev,
        currentUser: mockUser,
        isLoading: false,
      }));
      
      toast({
        title: "Login efetuado com sucesso",
        description: "Bem-vinda à sua jornada 7Steps!",
      });
      
      return true;
    } catch (error) {
      console.error("Login error:", error);
      setState(prev => ({ ...prev, isLoading: false }));
      
      toast({
        title: "Erro ao fazer login",
        description: "Verifique seu e-mail e tente novamente.",
        variant: "destructive",
      });
      
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setState(prev => ({
      ...prev,
      currentUser: null,
    }));
    
    toast({
      title: "Logout realizado",
      description: "Você saiu da sua conta com sucesso.",
    });
  };

  const completeStep = (stepId: number) => {
    if (!state.currentUser) return;
    
    // Only complete if it's the current step
    if (state.currentUser.current_step !== stepId) return;
    
    const nextStep = stepId + 1;
    const step = state.steps.find(s => s.id === stepId);
    const xpReward = step?.xp_reward || 50;
    
    const updatedUser = {
      ...state.currentUser,
      current_step: nextStep,
      xp_total: state.currentUser.xp_total + xpReward,
      avatar_status: Math.min(7, Math.max(1, Math.floor(nextStep / 2) + 1)),
    };
    
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    setState(prev => ({
      ...prev,
      currentUser: updatedUser,
    }));
    
    // Show confetti and toast
    showConfetti();
    
    toast({
      title: `Passo ${stepId} concluído!`,
      description: `Você ganhou ${xpReward} XP. Continue sua jornada!`,
    });
    
    // Check for achievements based on step completion
    if (stepId === 7) {
      unlockAchievement(7); // Transformada achievement
    } else if (stepId === 1) {
      unlockAchievement(1); // First step achievement
    }
  };

  const addDiaryEntry = (entry: Omit<DiaryEntry, 'id' | 'user_id'>) => {
    if (!state.currentUser) return;
    
    const newEntry: DiaryEntry = {
      id: Math.random().toString(36).substr(2, 9),
      user_id: state.currentUser.id,
      ...entry,
    };
    
    const updatedEntries = [...state.diaryEntries, newEntry];
    localStorage.setItem('diaryEntries', JSON.stringify(updatedEntries));
    
    // Add XP for diary entry
    const updatedUser = {
      ...state.currentUser,
      xp_total: state.currentUser.xp_total + 10,
    };
    
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    setState(prev => ({
      ...prev,
      diaryEntries: updatedEntries,
      currentUser: updatedUser,
    }));
    
    toast({
      title: "Diário atualizado",
      description: "Sua entrada foi registrada com sucesso. +10 XP!",
    });
    
    // Check for diary-related achievements
    const userEntries = updatedEntries.filter(e => e.user_id === state.currentUser?.id);
    if (userEntries.length >= 5) {
      unlockAchievement(3); // Consistent diary keeper
    }
  };

  const unlockAchievement = (achievementId: number) => {
    if (!state.currentUser) return;
    
    const achievement = state.achievements.find(a => a.id === achievementId);
    if (!achievement || achievement.unlocked) return;
    
    const updatedAchievements = state.achievements.map(a => 
      a.id === achievementId 
        ? { ...a, unlocked: true, unlocked_at: new Date().toISOString() } 
        : a
    );
    
    localStorage.setItem('achievements', JSON.stringify(updatedAchievements));
    
    setState(prev => ({
      ...prev,
      achievements: updatedAchievements,
    }));
    
    showConfetti();
    
    toast({
      title: "Nova conquista desbloqueada!",
      description: achievement?.title || "Parabéns pelo seu progresso!",
    });
  };

  const addXP = (amount: number) => {
    if (!state.currentUser) return;
    
    const updatedUser = {
      ...state.currentUser,
      xp_total: state.currentUser.xp_total + amount,
    };
    
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    setState(prev => ({
      ...prev,
      currentUser: updatedUser,
    }));
    
    toast({
      title: "XP adicionado",
      description: `Você ganhou +${amount} XP!`,
    });
  };

  const fetchUsers = async () => {
    // In a real app, this would fetch users from your backend
    // For this mockup, we'll create some sample users
    setState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUsers: User[] = [
      {
        id: '1',
        email: 'user1@example.com',
        xp_total: 120,
        current_step: 3,
        avatar_status: 2,
        is_admin: false,
        created_at: '2023-01-01T10:00:00Z',
      },
      {
        id: '2',
        email: 'user2@example.com',
        xp_total: 220,
        current_step: 5,
        avatar_status: 3,
        is_admin: false,
        created_at: '2023-01-05T14:30:00Z',
      },
      {
        id: '3',
        email: 'user3@example.com',
        xp_total: 50,
        current_step: 2,
        avatar_status: 1,
        is_admin: false,
        created_at: '2023-01-10T09:15:00Z',
      },
      // Add the current user to the list if admin
      ...(state.currentUser?.is_admin ? [state.currentUser] : []),
    ];
    
    setState(prev => ({
      ...prev,
      users: mockUsers,
      isLoading: false,
    }));
  };

  // Helper function to show confetti animation
  const showConfetti = () => {
    const colors = ['#fce1e4', '#e7d9f7', '#d6bcfa', '#9b87f5', '#7E69AB'];
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '9999';
    document.body.appendChild(container);
    
    // Create confetti pieces
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.top = `-20px`;
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.opacity = `${0.6 + Math.random() * 0.4}`;
      confetti.style.animationDelay = `${Math.random() * 0.5}s`;
      confetti.style.animationDuration = `${1 + Math.random() * 2}s`;
      container.appendChild(confetti);
    }
    
    // Remove confetti after animation completes
    setTimeout(() => {
      document.body.removeChild(container);
    }, 3000);
  };

  return (
    <AppContext.Provider
      value={{
        state,
        login,
        logout,
        completeStep,
        addDiaryEntry,
        unlockAchievement,
        addXP,
        fetchUsers,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
