
export interface User {
  id: string;
  email: string;
  name?: string;  // Making it optional for backward compatibility
  xp_total: number;
  current_step: number;
  avatar_status: number;
  is_admin: boolean;
  created_at: string;
  completed_modules?: string[]; // IDs dos módulos concluídos
}

export interface JourneyStep {
  id: number;
  title: string;
  description: string;
  content: string;
  xp_reward?: number;
  exercises: Exercise[];
  modules?: StepModule[]; // Novos módulos dentro dos passos
}

export interface StepModule {
  id: string;
  title: string;
  description: string;
  content: string;
  type: 'content' | 'exercises';
  xp_reward: number;
}

export interface Exercise {
  id: number;
  title: string;
  description: string;
  type: 'quiz' | 'dragdrop' | 'diary' | 'form' | 'challenge';
  xp_reward: number;
  content: string;
  completed?: boolean;
}

export interface DiaryEntry {
  id: string;
  user_id: string;
  date: string;
  hunger_level: number; // 1-10
  emotional_hunger: boolean;
  feeling: string;
  notes: string;
}

export interface ShoppingItem {
  id: string;
  name: string;
  category: string;
  completed: boolean;
  createdAt: string;
}

export interface Recipe {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string;
  prepTime: string;
  cookTime: string;
  imageUrl?: string;
}

export interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlocked_at?: string;
}

export type Emotion = 'happy' | 'sad' | 'anxious' | 'calm' | 'tired' | 'energetic' | 'stressed' | 'relaxed';

// Mock database state
export interface AppState {
  currentUser: User | null;
  isLoading: boolean;
  steps: JourneyStep[];
  achievements: Achievement[];
  diaryEntries: DiaryEntry[];
  recipes: Recipe[];
  shoppingList: ShoppingItem[];
}

// Supabase database user type
export interface SupabaseUser {
  id: string;
  email: string;
  admin: boolean;
  avatar_status: number;
  created_at: string;
  last_login: string | null;
  nivel_atual: number;
  xp_total: number;
}
