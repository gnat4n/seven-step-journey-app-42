import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { JourneyStep, User, DiaryEntry, ShoppingItem, Recipe, Achievement, AppState, StepModule } from '@/types';
import { toast } from '@/components/ui/sonner';
import demoData from '@/data/demoData';
import { mockSteps } from '@/data/steps';

// Mock data for development

type AppAction = 
  | { type: 'SET_LOADING', payload: boolean }
  | { type: 'SET_USER', payload: User | null }
  | { type: 'ADD_XP', payload: number }
  | { type: 'COMPLETE_STEP', payload: number }
  | { type: 'COMPLETE_MODULE', payload: string }
  | { type: 'UPDATE_USER', payload: User }
  | { type: 'ADD_DIARY_ENTRY', payload: Omit<DiaryEntry, 'id' | 'user_id'> }
  | { type: 'ADD_SHOPPING_ITEM', payload: Omit<ShoppingItem, 'id'> }
  | { type: 'TOGGLE_SHOPPING_ITEM', payload: string }
  | { type: 'REMOVE_SHOPPING_ITEM', payload: string };

const initialState: AppState = {
  isLoading: true,
  currentUser: null,
  steps: mockSteps,
  diaryEntries: [],
  shoppingList: [],
  recipes: [],
  achievements: [],
};

const AppContext = createContext<{
  state: AppState;
  login: (email: string) => Promise<void>;
  logout: () => void;
  addXP: (amount: number) => void;
  completeStep: (stepId: number) => Promise<void>;
  completeModule: (moduleId: string) => void;
  updateUser: (userData: User) => Promise<void>;
  addDiaryEntry: (entry: Omit<DiaryEntry, 'id' | 'user_id'>) => void;
  addShoppingItem: (item: Omit<ShoppingItem, 'id'>) => void;
  toggleShoppingItem: (itemId: string) => void;
  removeShoppingItem: (itemId: string) => void;
  isModuleCompleted: (moduleId: string) => boolean;
}>({
  state: initialState,
  login: async () => {},
  logout: () => {},
  addXP: () => {},
  completeStep: async () => {},
  completeModule: () => {},
  updateUser: async () => {},
  addDiaryEntry: () => {},
  addShoppingItem: () => {},
  toggleShoppingItem: () => {},
  removeShoppingItem: () => {},
  isModuleCompleted: () => false,
});

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_USER':
      return { ...state, currentUser: action.payload };
    case 'ADD_XP':
      if (!state.currentUser) return state;
      
      const newXP = state.currentUser.xp_total + action.payload;
      const updatedUser = { 
        ...state.currentUser, 
        xp_total: newXP 
      };
      
      return { 
        ...state, 
        currentUser: updatedUser 
      };
    case 'COMPLETE_STEP':
      if (!state.currentUser) return state;
      
      // Only increment if the completed step is the user's current step
      if (action.payload === state.currentUser.current_step) {
        const nextStep = Math.min(action.payload + 1, state.steps.length);
        
        // Give XP reward for completing a step (100 XP per step)
        const stepXP = 100;
        const totalXP = state.currentUser.xp_total + stepXP;
        
        // Update avatar status based on progress
        let avatarStatus = state.currentUser.avatar_status;
        if (nextStep > avatarStatus) {
          avatarStatus = nextStep;
        }
        
        return {
          ...state,
          currentUser: {
            ...state.currentUser,
            current_step: nextStep,
            xp_total: totalXP,
            avatar_status: avatarStatus
          }
        };
      }
      return state;
    case 'COMPLETE_MODULE':
      if (!state.currentUser) return state;
      
      const moduleId = action.payload;
      const completedModules = state.currentUser.completed_modules || [];
      
      // Check if module is already completed
      if (completedModules.includes(moduleId)) {
        return state;
      }
      
      // Add to completed modules
      const updatedCompletedModules = [...completedModules, moduleId];
      
      // Find module to add XP
      let moduleXP = 0;
      state.steps.forEach(step => {
        if (step.modules) {
          const foundModule = step.modules.find(m => m.id === moduleId);
          if (foundModule) {
            moduleXP = foundModule.xp_reward;
          }
        }
      });
      
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          completed_modules: updatedCompletedModules,
          xp_total: state.currentUser.xp_total + moduleXP
        }
      };
    case 'UPDATE_USER':
      return { ...state, currentUser: action.payload };
    case 'ADD_DIARY_ENTRY':
      const newEntry: DiaryEntry = { 
        ...action.payload, 
        id: `entry-${Date.now()}`,
        user_id: state.currentUser?.id || 'anonymous' 
      };
      
      return { 
        ...state, 
        diaryEntries: [...state.diaryEntries, newEntry] 
      };
    case 'ADD_SHOPPING_ITEM':
      const newItem = {
        ...action.payload,
        id: `item-${Date.now()}`
      };
      
      return {
        ...state,
        shoppingList: [...state.shoppingList, newItem]
      };
    case 'TOGGLE_SHOPPING_ITEM':
      return {
        ...state,
        shoppingList: state.shoppingList.map(item => 
          item.id === action.payload 
            ? { ...item, completed: !item.completed } 
            : item
        )
      };
    case 'REMOVE_SHOPPING_ITEM':
      return {
        ...state,
        shoppingList: state.shoppingList.filter(item => item.id !== action.payload)
      };
    default:
      return state;
  }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // In a real app, this would be API calls
        // For now, we'll use mock data from localStorage or demo data
        
        // Check if user is stored in localStorage
        const storedUser = localStorage.getItem('user');
        
        if (storedUser) {
          const user = JSON.parse(storedUser);
          
          // Load other data based on user
          dispatch({ type: 'SET_USER', payload: user });
          
          // Load diary entries
          const storedEntries = localStorage.getItem('diaryEntries');
          if (storedEntries) {
            const entries = JSON.parse(storedEntries);
            // We would dispatch these entries to state
          }
          
          // Load shopping list
          const storedShoppingList = localStorage.getItem('shoppingList');
          if (storedShoppingList) {
            const shoppingList = JSON.parse(storedShoppingList);
            // We would dispatch this shopping list to state
          }
        } else {
          // For demo purposes, no need to show this toast
          // toast.info("Nenhum usuário encontrado. Faça login para começar.");
        }
      } catch (error) {
        console.error('Error loading initial data:', error);
        toast.error('Erro ao carregar dados. Tente novamente.');
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };
    
    loadInitialData();
  }, []);
  
  // Save user data to localStorage when it changes
  useEffect(() => {
    if (state.currentUser) {
      localStorage.setItem('user', JSON.stringify(state.currentUser));
    }
  }, [state.currentUser]);
  
  const login = async (email: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      // Em um app real, isso seria uma chamada de API
      // Para fins de demonstração, usaremos dados fictícios
      
      // Validação simples - aceita qualquer email
      if (email) {
        // Para o e-mail de demonstração, usamos os dados de demo
        if (email === 'demo@7steps.com') {
          dispatch({ type: 'SET_USER', payload: demoData.user });
        } else {
          // Para outros e-mails, criamos um usuário temporário
          const tempUser: User = {
            id: `user-${Date.now()}`,
            email: email,
            xp_total: 0,
            current_step: 1,
            avatar_status: 1,
            is_admin: false,
            created_at: new Date().toISOString()
          };
          dispatch({ type: 'SET_USER', payload: tempUser });
        }
        
        dispatch({ type: 'SET_LOADING', payload: false });
        toast.success('Login realizado com sucesso!');
        return;
      }
      
      throw new Error('E-mail inválido');
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      console.error('Login error:', error);
      throw error;
    }
  };
  
  const logout = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'SET_USER', payload: null });
    toast.success('Logout realizado com sucesso!');
  };
  
  const addXP = (amount: number) => {
    dispatch({ type: 'ADD_XP', payload: amount });
    toast.success(`+${amount} XP adicionado!`);
  };
  
  const completeStep = async (stepId: number) => {
    dispatch({ type: 'COMPLETE_STEP', payload: stepId });
    toast.success(`Passo ${stepId} concluído! +100 XP`);
  };
  
  const completeModule = (moduleId: string) => {
    dispatch({ type: 'COMPLETE_MODULE', payload: moduleId });
    toast.success(`Módulo concluído!`);
  };
  
  const isModuleCompleted = (moduleId: string): boolean => {
    if (!state.currentUser || !state.currentUser.completed_modules) {
      return false;
    }
    return state.currentUser.completed_modules.includes(moduleId);
  };
  
  const updateUser = async (userData: User) => {
    dispatch({ type: 'UPDATE_USER', payload: userData });
    toast.success('Perfil atualizado com sucesso!');
    return Promise.resolve();
  };
  
  const addDiaryEntry = (entry: Omit<DiaryEntry, 'id' | 'user_id'>) => {
    const fullEntry: Omit<DiaryEntry, 'id'> = {
      ...entry,
      user_id: state.currentUser?.id || 'anonymous'
    };
    
    dispatch({ type: 'ADD_DIARY_ENTRY', payload: fullEntry });
    toast.success('Entrada adicionada ao diário!');
    addXP(10); // Small XP reward for diary entries
  };
  
  const addShoppingItem = (item: Omit<ShoppingItem, 'id'>) => {
    dispatch({ type: 'ADD_SHOPPING_ITEM', payload: item });
    toast.success('Item adicionado à lista de compras!');
  };
  
  const toggleShoppingItem = (itemId: string) => {
    dispatch({ type: 'TOGGLE_SHOPPING_ITEM', payload: itemId });
  };
  
  const removeShoppingItem = (itemId: string) => {
    dispatch({ type: 'REMOVE_SHOPPING_ITEM', payload: itemId });
    toast.success('Item removido da lista de compras!');
  };
  
  return (
    <AppContext.Provider
      value={{
        state,
        login,
        logout,
        addXP,
        completeStep,
        completeModule,
        updateUser,
        addDiaryEntry,
        addShoppingItem,
        toggleShoppingItem,
        removeShoppingItem,
        isModuleCompleted
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
