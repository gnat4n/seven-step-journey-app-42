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
    xp_reward: 50,
    content: `
      <h2>Mindful Eating: Comer com Atenção Plena</h2>
      <p>Você já parou para perceber quantas vezes comemos no "piloto automático"? Mindful eating, ou alimentação consciente, é uma prática que nos traz de volta ao momento presente durante as refeições.</p>
      
      <h3>O Que é Mindful Eating?</h3>
      <p>Mindful eating significa trazer consciência plena para o ato de comer. Isso envolve:</p>
      <ul>
        <li>Prestar total atenção à experiência de comer, momento a momento</li>
        <li>Observar cores, texturas, sabores, aromas dos alimentos</li>
        <li>Notar sensações físicas enquanto come: mastigação, deglutição</li>
        <li>Perceber sinais de fome e saciedade do corpo</li>
        <li>Identificar respostas emocionais aos alimentos</li>
      </ul>
      
      <h3>Benefícios do Mindful Eating</h3>
      <p>Estudos científicos mostram que a prática regular de mindful eating pode:</p>
      <ol>
        <li>Reduzir episódios de compulsão alimentar</li>
        <li>Melhorar a digestão</li>
        <li>Aumentar o prazer ao comer</li>
        <li>Ajudar a reconhecer a real saciedade</li>
        <li>Diminuir a alimentação emocional</li>
      </ol>
      
      <h3>Exercício: A Refeição de 20 Minutos</h3>
      <p>Reserve pelo menos 20 minutos para uma refeição. Desligue todas as distrações (TV, celular, computador). Concentre-se totalmente na experiência de comer:</p>
      <ul>
        <li>Observe o alimento antes de começar: cores, aromas, apresentação</li>
        <li>Sinta gratidão pelo alimento e todos envolvidos em trazê-lo até você</li>
        <li>Mastigue cada garfada pelo menos 20 vezes</li>
        <li>Pouse os talheres entre as garfadas</li>
        <li>Perceba os sabores mudando enquanto mastiga</li>
      </ul>
      
      <p>Complete os exercícios abaixo para desenvolver sua prática de Mindful Eating!</p>
    `,
    exercises: [
      {
        id: 301,
        title: "O Segredo da Espirulina",
        description: "Aprenda como este superalimento controla sua fome",
        type: "challenge",
        xp_reward: 25,
        content: "PASSO 3: O SEGREDO DA ESPIRULINA\n\nO SUPERALIMENTO QUE DESLIGA O BOTÃO DA FOME\nEnquanto a inulina trabalha fisicamente no seu estômago, precisamos de algo que atue diretamente nos hormônios da fome. É aí que entra a espirulina - um dos superalimentos mais poderosos do planeta.\n\nO QUE É ESPIRULINA?\nA espirulina é uma microalga azul-esverdeada cultivada em água doce. Não se assuste com o nome \"alga\" - ela é consumida há séculos por diversas culturas e hoje é reconhecida mundialmente como um dos alimentos mais nutritivos que existem.\nPara ter ideia, a espirulina contém:\n• Até 70% de proteína completa (mais que qualquer alimento vegetal)\n• Todos os aminoácidos essenciais\n• Vitaminas do complexo B, vitamina E, e betacaroteno\n• Minerais como ferro, magnésio e potássio\n• Poderosos antioxidantes, incluindo ficocianina\n\nCOMO A ESPIRULINA CONTROLA SUA FOME\nA espirulina trabalha de várias formas para reduzir sua fome:\n1. Estimula a produção de hormônios de saciedade (como leptina)\n2. Fornece proteína de alta qualidadeque mantém você satisfeita por mais tempo\n3. Estabiliza os níveis de açúcar no sangue, prevenindo aquela queda que causa fome repentina\n4. Aumenta sua energiasem estimulantes, reduzindo a busca por \"combustíveis rápidos\" como açúcar\n5. Contém ácido γ-linolênico, que auxilia no metabolismo de gorduras\n\nCOMO ESCOLHER E USAR ESPIRULINA\nComo escolher: Opte por marcas certificadas, orgânicas e testadas para metais pesados. A cor deve ser verde profundo, quase azulado.\nFormas disponíveis:\n• Pó (mais versátil, pode ser adicionado a receitas)\n• Cápsulas de ModelaCaps (mais convenientes para consumo diário)\n• Flocos (menos comuns)\nDosagem recomendada: 1 a 3 gramas por dia (comece com doses menores e aumente gradualmente)\nSabor: A espirulina tem um sabor forte, semelhante a algas marinhas. Se você não está acostumada, comece com pequenas quantidades misturadas em sucos, smoothies ou iogurte.\nDICA PRÁTICA: Se o sabor for um obstáculo, as cásulas são uma excelente alternativa.\n\nCOMO INCORPORAR NA SUA ROTINA\nVersão básica: \n1/2 colher de chá de espirulina em pó misturada em um copo de suco de laranja ou água de coco.\nPara quem não gosta do sabor: \n2 cápsulas de ModelaCaps com água antes das refeições.\nPara máxima saciedade: \nCombine espirulina com inulina em um smoothie matinal:\n• 1 banana\n• 1 colher de chá de espirulina\n• 1 colher de chá de inulina\n• 1 copo de leite vegetal\n• Gelo a gosto\n\nBENEFÍCIOS ADICIONAIS DA ESPIRULINA\nAlém de controlar sua fome, a espirulina:\n• Combate anemia devido ao alto teor de ferro\n• Fortalece o sistema imunológico\n• Reduz colesterol e triglicerídeos\n• Possui potente ação anti-inflamatória\n• Combate o envelhecimento precoce graças aos antioxidantes\n\nATENÇÃO: A espirulina não é recomendada para grávidas, lactantes, pessoas com fenilcetonúria ou\ndoenças autoimunes. Se você tem alguma condição médica, consulte seu médico antes de usar.",
      },
      {
        id: 302,
        title: "Exercícios Práticos",
        description: "Fixe o conteúdo sobre espirulina com exercícios práticos",
        type: "diary",
        xp_reward: 25,
        content: "Exercícios práticos sobre o uso de espirulina para controlar a fome.",
      }
    ]
  },
  {
    id: 4,
    title: "Hidratação",
    description: "Entenda o papel da água no controle da fome",
    xp_reward: 50,
    content: `
      <h2>Hidratação: O Segredo Esquecido</h2>
      <p>Muitas vezes confundimos sede com fome. A hidratação adequada é um componente crítico para controlar a fome e manter um metabolismo saudável.</p>
      
      <h3>Água e Controle da Fome</h3>
      <p>A água desempenha vários papéis fundamentais no controle da fome:</p>
      <ul>
        <li>Ocupa espaço no estômago, criando sensação de saciedade</li>
        <li>Ajuda a metabolizar gordura (lipólise)</li>
        <li>Facilita a eliminação de toxinas</li>
        <li>Melhora a função cognitiva, ajudando em escolhas alimentares conscientes</li>
        <li>Previne desidratação, que frequentemente é confundida com fome</li>
      </ul>
      
      <h3>O Teste da Sede</h3>
      <p>Quando sentir fome fora de hora, faça o teste da sede:</p>
      <ol>
        <li>Beba um copo de água (250ml)</li>
        <li>Aguarde 15 minutos</li>
        <li>Reavalie se ainda sente fome</li>
      </ol>
      <p>Em muitos casos, a sensação de fome desaparece porque o que seu corpo realmente precisava era hidratação.</p>
      
      <h3>Estratégias para Hidratar-se Melhor</h3>
      <ul>
        <li>Comece o dia com um copo de água morna com limão</li>
        <li>Tenha sempre uma garrafa de água reutilizável com você</li>
        <li>Configure lembretes no celular para beber água</li>
        <li>Beba um copo de água 30 minutos antes de cada refeição</li>
        <li>Adicione frutas, pepino ou ervas à água para dar sabor natural</li>
      </ul>
      
      <p>Complete os exercícios abaixo para melhorar sua hidratação!</p>
    `,
    exercises: [
      {
        id: 401,
        title: "COMBINAÇÕES PODEROSAS",
        description: "Aprenda como combinar a Inulina e Espirulina nas suas refeições",
        type: "challenge",
        xp_reward: 25,
        content: "PASSO 4: COMBINAÇÕES PODEROSAS\n\nREFEIÇÕES QUE MANTÊM A FOME LONGE POR HORAS\nAgora que você conhece os dois superpoderes contra a fome - inulina e espirulina - vamos aprender a combiná-los com outros alimentos para criar refeições que mantenham a fome longe por horas.\n\nO PRINCÍPIO DO PRATO EQUILIBRADO\nO segredo para uma saciedade duradoura está na combinação certa de:\n• Proteínas: São o nutriente mais saciante e mantêm a fome longe por mais tempo\n• Fibras: Ocupam espaço no estômago e retardam a digestão\n• Gorduras saudáveis: Desaceleram a digestão e enviam sinais de saciedade ao cérebro\n• Água: Muitas vezes confundimos sede com fome\nA proporção ideal para máxima saciedade é:\n• 1/2 do prato: vegetais ricos em fibras\n• 1/4 do prato: proteínas de qualidade\n• 1/4 do prato: carboidratos complexos ricos em fibras\n• 1 colher de sobremesa de gorduras saudáveis\n\nDICA IMPORTANTE: Antes de cada refeição, beba um copo de água. Isso já ocupa parte do seu\nestômago e evita que você confunda sede com fome.\n\n5 CAFÉS DA MANHÃ QUE BLOQUEIAM A FOME\n1. Super Bowl de Aveia\n• 1/3 xícara de aveia em flocos\n• 1 colher de chá de inulina em pó\n• 1 colher de chá de chia\n• 1 colher de sopa de iogurte natural\n• 1/2 banana em rodelas\n• Canela a gosto\n2. Omelete Nutritiva\n• 2 ovos\n• Folhas verdes refogadas com alho (fonte de inulina)\n• 1/2 tomate picado\n• 1 colher de chá de espirulina misturada no ovo (ou em cápsula junto com a refeição)\n3. Smoothie Bloqueador\n• 1 banana verde (rica em inulina)\n• 1 colher de sopa de pasta de amendoim (sem açúcar)\n• 1 colher de chá de espirulina\n• 1 copo de leite vegetal\n• 1 colher de chá de chia (opcional)\n4. Torrada Power\n• 2 fatias de pão integral\n• 1/2 abacate amassado\n• 1 ovo cozido fatiado\n• 1 colher de chá de sementes de linhaça\n• Tomar 2 cápsulas de ModelaCaps junto\n5. Iogurte Especial\n• 1 pote de iogurte grego natural (sem açúcar)\n• 1 colher de sopa de granola sem açúcar\n• 1 colher de chá de inulina em pó\n• Frutas vermelhas a gosto\n• 1 colher de chá de mel (opcional)\n\n5 LANCHES RÁPIDOS PARA MOMENTOS CRÍTICOS\n1. Mix Emergencial\n• 1 punhado de castanhas (20g)\n• 1 quadrado pequeno de chocolate 70% cacau\n• 2 cápsulas de ModelaCaps para tomar junto\n2. Wrap Express\n• 1 wrap pequeno integral\n• 1 colher de sopa de homus\n• Cenoura ralada e pepino\n• Polvilhar leve camada de espirulina em pó\n3. Smoothie Instantâneo\n• 1 copo de água de coco\n• 1 colher de chá de espirulina\n• 1 colher de chá de inulina\n• Gelo\n• Bater por 30 segundos\n4. Ovos Express\n• 2 ovos cozidos\n• Pitada de sal e pimenta\n• 1 xícara de vegetais crus\n• 2 cápsulas de ModelaCaps para tomar junto\n5. Xícara da Saciedade\n• 1 maçã média picada\n• 1 colher de chá de canela\n• 1 colher de sopa de pasta de amendoim\n• 2 cápsulas de ModelaCaps para tomar junto\n\n5 JANTARES PRÁTICOS PARA DIAS CORRIDOS\n1. Bowl de Proteína\n• 100g de frango ou tofu grelhado\n• Mix de vegetais salteados com alho e cebola (fontes de inulina)\n• 1/3 xícara de quinoa cozida\n• 1/2 abacate\n• 1 colher de chá de espirulina misturada em 1 colher de sopa de azeite como molho\n2. Sopa Rápida\n• 1 tablete de caldo de legumes\n• 1 cenoura picada\n• 1 cebola picada (rica em inulina)\n• 100g de frango desfiado ou lentilhas\n• Verduras a gosto\n• 1 colher de chá de espirulina adicionada no final\n3. Prato Único\n• 1 batata doce média assada\n• 100g de carne magra ou peixe\n• Salada de folhas verdes\n• 1 colher de chá de inulina misturada em 1 colher de sopa de azeite como molho\n4. Omelete Completa\n• 3 ovos\n• Espinafre, cebola (rica em inulina) e tomate\n• 30g de queijo magro ralado\n• 1 fatia de pão integral\n• 1 colher de chá de espirulina misturada nos ovos\n5. Salada Proteica\n• Folhas verdes variadas\n• 100g de atum ou grão-de-bico\n• 1/4 de abacate\n• Cebola roxa fatiada (rica em inulina)\n• 1 ovo cozido\n• 1 colher de chá de espirulina misturada no molho de limão e azeite",
      },
      {
        id: 402,
        title: "Exercícios Práticos",
        description: "Exercícios para fixar o conteúdo sobre combinações poderosas",
        type: "diary",
        xp_reward: 25,
        content: "Exercícios práticos sobre como combinar inulina e espirulina nas refeições.",
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
  | { type: 'REMOVE_SHOPPING_ITEM', payload: string }
  | { type: 'COMPLETE_EXERCISE', payload: { stepId: number, exerciseId: number } };

const initialState: AppState = {
  isLoading: true,
  currentUser: null,
  steps: mockSteps,
  diaryEntries: [],
  shoppingList: [],
  recipes: [],
  achievements: [],
  completedExercises: [],
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
  completeExercise: (stepId: number, exerciseId: number) => void;
  isExerciseCompleted: (stepId: number, exerciseId: number) => boolean;
  areAllExercisesCompleted: (stepId: number) => boolean;
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
  completeExercise: () => {},
  isExerciseCompleted: () => false,
  areAllExercisesCompleted: () => false,
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
    case 'COMPLETE_EXERCISE':
      // Check if exercise is already marked as completed
      const alreadyCompleted = state.completedExercises.some(
        ex => ex.stepId === action.payload.stepId && ex.exerciseId === action.payload.exerciseId
      );
      
      if (alreadyCompleted) {
        return state;
      }
      
      return {
        ...state,
        completedExercises: [
          ...state.completedExercises,
          { stepId: action.payload.stepId, exerciseId: action.payload.exerciseId }
        ]
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
          
          // Load completed exercises
          const storedCompletedExercises = localStorage.getItem('completedExercises');
          if (storedCompletedExercises) {
            try {
              const completedExercises = JSON.parse(storedCompletedExercises);
              state.completedExercises = completedExercises;
            } catch (e) {
              console.error('Error loading completed exercises:', e);
            }
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
  
  // Save completed exercises to localStorage when they change
  useEffect(() => {
    localStorage.setItem('completedExercises', JSON.stringify(state.completedExercises));
  }, [state.completedExercises]);
  
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
  
  // Functions for tracking exercise completion
  const completeExercise = (stepId: number, exerciseId: number) => {
    dispatch({ 
      type: 'COMPLETE_EXERCISE', 
      payload: { stepId, exerciseId } 
    });
    
    // Award XP for completing the exercise
    const step = state.steps.find(s => s.id === stepId);
    const exercise = step?.exercises.find(e => e.id === exerciseId);
    
    if (exercise?.xp_reward) {
      addXP(exercise.xp_reward);
      toast.success(`Exercício concluído! +${exercise.xp_reward} XP`);
    } else {
      toast.success('Exercício concluído!');
    }
    
    // Check if all exercises for the step are completed
    const allCompleted = areAllExercisesCompleted(stepId);
    
    if (allCompleted && state.currentUser && stepId === state.currentUser.current_step) {
      // If all exercises are completed and this is the current step, auto-complete the step
      setTimeout(() => {
        completeStep(stepId);
      }, 1000);
    }
  };
  
  const isExerciseCompleted = (stepId: number, exerciseId: number): boolean => {
    return state.completedExercises.some(
      ex => ex.stepId === stepId && ex.exerciseId === exerciseId
    );
  };
  
  const areAllExercisesCompleted = (stepId: number): boolean => {
    const step = state.steps.find(s => s.id === stepId);
    if (!step || !step.exercises.length) return false;
    
    return step.exercises.every(exercise => 
      isExerciseCompleted(stepId, exercise.id)
    );
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
        removeShoppingItem,
        completeExercise,
        isExerciseCompleted,
        areAllExercisesCompleted
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
