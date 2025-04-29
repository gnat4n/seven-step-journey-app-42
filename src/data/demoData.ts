
import { User, DiaryEntry, ShoppingItem, Recipe, Achievement } from '@/types';
import { mockSteps } from './steps';

// Demo user for testing purposes
const user: User = {
  id: 'demo-user-1',
  email: 'demo@7steps.com',
  name: 'Usuária Demo',
  xp_total: 145,
  current_step: 2,
  avatar_status: 2,
  is_admin: false,
  created_at: '2023-12-01T10:20:30Z'
};

// Sample diary entries
const diaryEntries: DiaryEntry[] = [
  {
    id: 'entry-1',
    user_id: 'demo-user-1',
    date: '2023-12-15',
    hunger_level: 7,
    emotional_hunger: true,
    feeling: 'ansiedade',
    notes: 'Percebi que estava com fome emocional depois de uma reunião estressante no trabalho. Apliquei a técnica STOP e consegui esperar 15 minutos antes de comer algo saudável.'
  },
  {
    id: 'entry-2',
    user_id: 'demo-user-1',
    date: '2023-12-16',
    hunger_level: 4,
    emotional_hunger: false,
    feeling: 'normal',
    notes: 'Tomei água com inulina pela manhã e senti menos fome durante todo o dia. Consegui me concentrar melhor no trabalho.'
  }
];

// Sample shopping list
const shoppingList: ShoppingItem[] = [
  {
    id: 'item-1',
    name: 'Inulina em pó',
    category: 'Suplementos',
    completed: false,
    createdAt: '2023-12-14T09:15:00Z'
  },
  {
    id: 'item-2',
    name: 'Espirulina em cápsulas',
    category: 'Suplementos',
    completed: true,
    createdAt: '2023-12-14T09:16:00Z'
  },
  {
    id: 'item-3',
    name: 'Chicória',
    category: 'Vegetais',
    completed: false,
    createdAt: '2023-12-14T09:17:00Z'
  },
  {
    id: 'item-4',
    name: 'Bananas verdes',
    category: 'Frutas',
    completed: false,
    createdAt: '2023-12-14T09:18:00Z'
  },
  {
    id: 'item-5',
    name: 'Iogurte natural',
    category: 'Laticínios',
    completed: false,
    createdAt: '2023-12-14T09:19:00Z'
  }
];

// Sample recipes
const recipes: Recipe[] = [
  {
    id: 'recipe-1',
    title: 'Smoothie de Espirulina',
    ingredients: [
      '1 banana madura',
      '1 colher de chá de espirulina',
      '1 colher de chá de inulina',
      '1 copo de leite vegetal',
      'Gelo a gosto'
    ],
    instructions: '1. Adicione todos os ingredientes no liquidificador.\n2. Bata até ficar homogêneo.\n3. Sirva imediatamente.',
    prepTime: '5 minutos',
    cookTime: '0 minutos',
    imageUrl: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2724&q=80'
  },
  {
    id: 'recipe-2',
    title: 'Água de Inulina',
    ingredients: [
      '1 colher de chá de inulina em pó',
      '1 copo de água filtrada',
      'Suco de meio limão (opcional)',
      'Canela a gosto (opcional)'
    ],
    instructions: '1. Dissolva a inulina na água.\n2. Adicione o suco de limão e/ou canela se desejar.\n3. Beba preferencialmente em jejum.',
    prepTime: '2 minutos',
    cookTime: '0 minutos'
  }
];

// Sample achievements
const achievements: Achievement[] = [
  {
    id: 1,
    title: 'Primeira Jornada',
    description: 'Completou o primeiro passo do método 7Steps',
    icon: 'trophy',
    unlocked: true,
    unlocked_at: '2023-12-10T18:30:00Z'
  },
  {
    id: 2,
    title: 'Diário Consistente',
    description: 'Manteve o diário por 3 dias consecutivos',
    icon: 'book',
    unlocked: true,
    unlocked_at: '2023-12-13T21:15:00Z'
  },
  {
    id: 3,
    title: 'Mestre da Inulina',
    description: 'Experimentou 3 receitas diferentes com inulina',
    icon: 'star',
    unlocked: false
  },
  {
    id: 4,
    title: '7 Dias Sem Fome Emocional',
    description: 'Passou uma semana inteira identificando e controlando a fome emocional',
    icon: 'award',
    unlocked: false
  }
];

export default {
  user,
  diaryEntries,
  shoppingList,
  recipes,
  achievements,
  steps: mockSteps
};
