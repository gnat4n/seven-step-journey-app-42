import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { JourneyStep, User, DiaryEntry, ShoppingItem, Recipe, Achievement, AppState } from '@/types';
import { toast } from '@/components/ui/sonner';
import demoData from '@/data/demoData';

// Mock data for development
const mockSteps: JourneyStep[] = [
  {
    id: 1,
    title: "Consciência",
    description: "Desenvolver consciência alimentar e emocional",
    content: "<p>Este é o primeiro passo da sua jornada de 7 passos para controlar a fome emocional. No passo da <strong>Consciência</strong>, vamos aprender a identificar quando estamos com fome física verdadeira e quando é fome emocional.</p><p>A fome emocional muitas vezes surge de forma repentina, é específica por um tipo de alimento (geralmente doce ou salgado), não é satisfeita pelo estômago cheio e frequentemente gera culpa.</p><p>Através dos exercícios deste passo, você aprenderá a reconhecer seus gatilhos emocionais e a técnica S.T.O.P. para interromper o ciclo de alimentação automática baseada em emoções.</p>",
    exercises: [
      { 
        id: 101, 
        title: "Diagnóstico de Gatilhos", 
        description: "Identifique seus principais gatilhos emocionais para a fome",
        type: "form",
        content: "",
        xp_reward: 20
      },
      { 
        id: 102, 
        title: "Técnica S.T.O.P.", 
        description: "Aprenda a interromper o comportamento automático",
        type: "challenge",
        content: "Pare (Stop). Respire (Take a breath). Observe. Prossiga",
        xp_reward: 20
      },
      { 
        id: 103, 
        title: "Reprogramação de Pensamentos", 
        description: "Identifique pensamentos negativos e crie alternativas",
        type: "form",
        content: "",
        xp_reward: 30
      }
    ]
  },
  {
    id: 2,
    title: "Nutrição",
    description: "Entenda a nutrição que estabiliza sua fome",
    content: "<p>Bem-vinda ao segundo passo da sua jornada: <strong>Nutrição</strong>. Neste passo, vamos descobrir como certos alimentos podem trabalhar a seu favor para controlar a fome.</p><p>Você aprenderá sobre alimentos ricos em fibras, proteínas e gorduras saudáveis que promovem saciedade e estabilizam seus níveis de açúcar no sangue, reduzindo assim a probabilidade de experimentar fome emocional.</p><p>Veremos também como a inulina, uma fibra solúvel encontrada em certos alimentos, pode ser sua aliada nesta jornada.</p>",
    exercises: [
      { 
        id: 201, 
        title: "Quiz de Alimentos Sacietógenos", 
        description: "Teste seu conhecimento sobre alimentos que promovem saciedade",
        type: "quiz",
        content: "Quais alimentos são ricos em inulina?",
        xp_reward: 25
      },
      { 
        id: 202, 
        title: "Montando um Prato Equilibrado", 
        description: "Aprenda a montar refeições equilibradas e satisfatórias",
        type: "dragdrop",
        content: "Distribua os alimentos nas categorias apropriadas para criar um prato equilibrado",
        xp_reward: 35
      }
    ]
  },
  {
    id: 3,
    title: "Mindful Eating",
    description: "Comer com atenção plena",
    content: "<p>Neste terceiro passo, vamos praticar o <strong>Mindful Eating</strong>, ou Alimentação Consciente, uma abordagem que nos convida a trazer total atenção para o ato de comer.</p><p>Quando comemos distraídos — assistindo TV, navegando no celular ou trabalhando — tendemos a comer mais rapidamente, não mastigamos adequadamente e frequentemente nem percebemos o quanto comemos. Isso prejudica nossa digestão e faz com que seja mais difícil reconhecer os sinais de saciedade.</p><p>Nos exercícios a seguir, você aprenderá técnicas para trazer mais consciência às suas refeições e transformar sua relação com a comida.</p>",
    exercises: [
      { 
        id: 301, 
        title: "Prática de Refeição Consciente", 
        description: "Experimente uma refeição completa com atenção plena",
        type: "challenge",
        content: "Escolha uma refeição do seu dia. Elimine distrações. Observe o alimento antes de comer. Sinta o aroma. Mastigue lentamente, percebendo sabores e texturas. Coloque o talher para baixo entre cada garfada. Perceba quando começar a se sentir satisfeito.",
        xp_reward: 40
      },
      { 
        id: 302, 
        title: "Diário de Mindful Eating", 
        description: "Registre seus insights após praticar a alimentação consciente",
        type: "diary",
        content: "Após cada prática de Mindful Eating, registre como foi a experiência e o que notou sobre seus hábitos alimentares.",
        xp_reward: 30
      }
    ]
  },
  {
    id: 4,
    title: "Hidratação",
    description: "A importância da água para controlar a fome",
    content: "<p>Bem-vinda ao quarto passo da sua jornada: <strong>Hidratação</strong>. Muitas vezes confundimos sede com fome, o que pode levar a comer quando na verdade nosso corpo precisa de água.</p><p>Neste passo, você aprenderá sobre a importância da hidratação adequada não apenas para sua saúde geral, mas especificamente como uma estratégia para controlar a fome.</p><p>A água desempenha um papel crucial no metabolismo, na digestão e na regulação da temperatura corporal. Além disso, estar bem hidratada pode ajudar a reduzir desejos por comida, especialmente por doces.</p>",
    exercises: [
      { 
        id: 401, 
        title: "Desafio de Hidratação", 
        description: "Aumente seu consumo de água por 3 dias",
        type: "challenge",
        content: "Calcule sua necessidade diária de água (cerca de 30ml por kg de peso). Prepare uma garrafa reutilizável. Estabeleça horários regulares para beber água. Monitore seu consumo ao longo do dia. Observe como se sente em relação à fome.",
        xp_reward: 35
      },
      { 
        id: 402, 
        title: "Reflexão sobre Hidratação", 
        description: "Registre os efeitos da hidratação adequada",
        type: "form",
        content: "Como a hidratação adequada afetou sua fome e desejos por comida?",
        xp_reward: 25
      }
    ]
  },
  {
    id: 5,
    title: "Gestão do Estresse",
    description: "Técnicas para reduzir o estresse e a fome emocional",
    content: "<p>Neste quinto passo, abordamos um dos maiores gatilhos da fome emocional: o <strong>Estresse</strong>. Quando estamos estressados, nosso corpo libera cortisol, um hormônio que pode aumentar o apetite, especialmente por alimentos calóricos e ricos em açúcar.</p><p>Aprender a gerenciar o estresse é, portanto, uma parte essencial do controle da fome emocional. Neste passo, você conhecerá técnicas eficazes para reduzir o estresse e interromper o ciclo de comer em resposta a situações estressantes.</p>",
    exercises: [
      { 
        id: 501, 
        title: "Respiração Diafragmática", 
        description: "Aprenda a técnica de respiração que acalma o sistema nervoso",
        type: "challenge",
        content: "Encontre um local tranquilo. Sente-se confortavelmente ou deite-se. Coloque uma mão no peito e outra no abdômen. Inspire lentamente pelo nariz, expandindo o abdômen. Expire lentamente pela boca, contraindo o abdômen. Repita por 5 minutos.",
        xp_reward: 30
      },
      { 
        id: 502, 
        title: "Diário de Estresse e Alimentação", 
        description: "Identifique padrões entre estresse e fome emocional",
        type: "diary",
        content: "Registre situações estressantes e como elas afetam seus hábitos alimentares.",
        xp_reward: 35
      }
    ]
  },
  {
    id: 6,
    title: "Movimento",
    description: "Atividade física como aliada no controle da fome",
    content: "<p>No sexto passo da nossa jornada, exploramos o poder do <strong>Movimento</strong> no controle da fome emocional. A atividade física regular não apenas nos ajuda a manter um peso saudável, mas também tem um impacto significativo na regulação do humor e na redução do estresse.</p><p>O exercício libera endorfinas, os 'hormônios da felicidade', que podem reduzir a necessidade de buscar conforto emocional na comida. Além disso, a atividade física pode aumentar a consciência corporal, ajudando você a reconhecer melhor os sinais de fome e saciedade.</p>",
    exercises: [
      { 
        id: 601, 
        title: "Desafio de Movimento Diário", 
        description: "Incorpore mais atividade física na sua rotina",
        type: "challenge",
        content: "Escolha uma atividade que você goste. Comprometa-se com pelo menos 15 minutos por dia. Observe como se sente antes e depois. Aumente gradualmente a duração ou intensidade. Reflita sobre como o movimento afeta seu humor e desejos por comida.",
        xp_reward: 40
      },
      { 
        id: 602, 
        title: "Plano de Atividade Física", 
        description: "Crie um plano sustentável de exercícios",
        type: "form",
        content: "Desenvolva um plano realista de atividade física para a próxima semana.",
        xp_reward: 30
      }
    ]
  },
  {
    id: 7,
    title: "Integração",
    description: "Consolidando todos os passos anteriores",
    content: "<p>Parabéns por chegar ao sétimo e último passo da sua jornada! A <strong>Integração</strong> é onde reunimos tudo o que você aprendeu nos seis passos anteriores em uma abordagem coesa e sustentável para o controle da fome emocional.</p><p>Neste passo final, revisitaremos os conceitos-chave de cada etapa anterior e veremos como eles se complementam para criar uma estratégia completa. Também exploraremos como integrar essas práticas na sua vida cotidiana a longo prazo, mesmo em situações desafiadoras.</p>",
    exercises: [
      { 
        id: 701, 
        title: "Revisão de Jornada", 
        description: "Reflita sobre seu progresso nos 7 passos",
        type: "form",
        content: "Quais foram seus maiores aprendizados? Que técnicas foram mais eficazes para você? Como sua relação com a comida mudou ao longo desta jornada?",
        xp_reward: 50
      },
      { 
        id: 702, 
        title: "Plano de Manutenção", 
        description: "Crie seu plano personalizado para manter os resultados",
        type: "form",
        content: "Desenvolva um plano concreto para continuar aplicando os 7 passos na sua vida.",
        xp_reward: 50
      }
    ]
  }
];

type AppAction = 
  | { type: 'SET_LOADING', payload: boolean }
  | { type: 'SET_USER', payload: User | null }
  | { type: 'ADD_XP', payload: number }
  | { type: 'COMPLETE_STEP', payload: number }
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
  updateUser: (userData: User) => Promise<void>;
  addDiaryEntry: (entry: Omit<DiaryEntry, 'id' | 'user_id'>) => void;
  addShoppingItem: (item: Omit<ShoppingItem, 'id'>) => void;
  toggleShoppingItem: (itemId: string) => void;
  removeShoppingItem: (itemId: string) => void;
}>({
  state: initialState,
  login: async () => {},
  logout: () => {},
  addXP: () => {},
  completeStep: async () => {},
  updateUser: async () => {},
  addDiaryEntry: () => {},
  addShoppingItem: () => {},
  toggleShoppingItem: () => {},
  removeShoppingItem: () => {},
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
        updateUser,
        addDiaryEntry,
        addShoppingItem,
        toggleShoppingItem,
        removeShoppingItem
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
