
import { JourneyStep } from '@/types';

export const mockSteps: JourneyStep[] = [
  {
    id: 1,
    title: "Desintoxicação Mental",
    description: "Quebrar o ciclo mental da fome emocional",
    xp_reward: 50,
    content: `
      <h2>Começando sua Jornada</h2>
      <p>Bem-vinda ao primeiro passo da sua jornada! Antes de falarmos sobre alimentos e nutrientes, precisamos começar "limpando" sua mente.</p>
      <p>Grande parte da nossa fome não tem nada a ver com necessidades nutricionais, mas sim com gatilhos emocionais. Neste passo, vamos identificar seus gatilhos e começar a quebrar o ciclo da fome emocional.</p>
      <h3>O que você aprenderá:</h3>
      <ul>
        <li>Como identificar seus gatilhos emocionais</li>
        <li>A técnica STOP para interromper comportamentos automáticos</li>
        <li>Como reprogramar pensamentos automáticos sobre comida</li>
        <li>Práticas de alimentação consciente</li>
      </ul>
      <p>Complete os exercícios abaixo para avançar para o próximo passo!</p>
    `,
    exercises: [
      {
        id: 101,
        title: "Mapa Mental da Fome",
        description: "Identifique seus principais gatilhos emocionais",
        type: "form",
        xp_reward: 15,
        content: "Antes de comer qualquer coisa fora do horário das refeições, pare e pergunte-se: 'Estou com fome física ou emocional?' Anote seus gatilhos emocionais."
      },
      {
        id: 102,
        title: "Técnica STOP",
        description: "Aprenda a interromper comportamentos automáticos",
        type: "challenge",
        xp_reward: 20,
        content: "S - Pare (Stop) o que estiver fazendo. T - Respire (Take a breath) profundamente 3 vezes. O - Observe o que está sentindo (sem julgamento). P - Prossiga de forma consciente (decida se realmente quer comer)."
      },
      {
        id: 103,
        title: "Reprogramação de Pensamentos",
        description: "Transforme pensamentos negativos sobre comida",
        type: "form",
        xp_reward: 15,
        content: "Identifique um pensamento automático que você tem sobre comida e crie uma reprogramação positiva."
      }
    ]
  },
  {
    id: 2,
    title: "O Poder da Inulina",
    description: "Prolongue sua saciedade naturalmente",
    xp_reward: 50,
    content: `
      <h2>O Segredo Natural para Prolongar a Saciedade</h2>
      <p>Agora que começamos a trabalhar sua mente, vamos falar sobre algo que vai revolucionar sua fisiologia: a inulina!</p>
      <p>A inulina é uma fibra solúvel natural encontrada em diversos vegetais. Quando entra em contato com água no seu estômago, forma um gel que aumenta de volume, criando uma sensação de saciedade que dura horas!</p>
      <h3>Como a Inulina Funciona:</h3>
      <ul>
        <li>Forma um gel no estômago que ocupa espaço</li>
        <li>Retarda o esvaziamento gástrico, fazendo a digestão durar mais tempo</li>
        <li>Alimenta as bactérias benéficas do intestino</li>
        <li>Reduz a absorção de gorduras dos alimentos</li>
      </ul>
      <p>Complete os exercícios abaixo para dominar o uso da inulina!</p>
    `,
    exercises: [
      {
        id: 201,
        title: "Fontes de Inulina",
        description: "Conheça os alimentos ricos em inulina",
        type: "quiz",
        xp_reward: 15,
        content: "Quais destes alimentos são ricos em inulina? Raiz de chicória, banana verde, alho, cebola, yacon."
      },
      {
        id: 202,
        title: "Água de Inulina",
        description: "Prepare sua primeira água de inulina",
        type: "challenge",
        xp_reward: 20,
        content: "1 colher de chá de inulina em pó (3g), 1 copo de água (200ml), suco de meio limão (opcional). Misture bem e tome em jejum."
      },
      {
        id: 203,
        title: "Diário da Inulina",
        description: "Registre como se sente após usar inulina",
        type: "diary",
        xp_reward: 15,
        content: "Registre como você se sentiu após consumir inulina por 3 dias consecutivos."
      }
    ]
  },
  {
    id: 3,
    title: "O Segredo da Espirulina",
    description: "Controle os hormônios da fome",
    xp_reward: 50,
    content: `
      <h2>O Superalimento que Desliga o Botão da Fome</h2>
      <p>Enquanto a inulina trabalha fisicamente no seu estômago, precisamos de algo que atue diretamente nos hormônios da fome. É aí que entra a espirulina - um dos superalimentos mais poderosos do planeta.</p>
      <p>A espirulina é uma microalga azul-esverdeada que contém até 70% de proteína completa e diversos nutrientes essenciais.</p>
      <h3>Como a Espirulina Controla sua Fome:</h3>
      <ul>
        <li>Estimula a produção de hormônios de saciedade</li>
        <li>Fornece proteína de alta qualidade que mantém você satisfeita</li>
        <li>Estabiliza os níveis de açúcar no sangue</li>
        <li>Aumenta sua energia sem estimulantes</li>
      </ul>
      <p>Complete os exercícios para dominar o uso da espirulina!</p>
    `,
    exercises: [
      {
        id: 301,
        title: "Escolhendo Espirulina",
        description: "Aprenda a escolher espirulina de qualidade",
        type: "quiz",
        xp_reward: 15,
        content: "Como escolher espirulina de qualidade? Opte por marcas certificadas, orgânicas e testadas para metais pesados."
      },
      {
        id: 302,
        title: "Smoothie de Espirulina",
        description: "Prepare seu primeiro smoothie com espirulina",
        type: "challenge",
        xp_reward: 20,
        content: "1 banana, 1 colher de chá de espirulina, 1 colher de chá de inulina, 1 copo de leite vegetal, gelo a gosto."
      },
      {
        id: 303,
        title: "Diário da Espirulina",
        description: "Registre os efeitos da espirulina",
        type: "diary",
        xp_reward: 15,
        content: "Registre como você se sentiu após consumir espirulina por 3 dias consecutivos."
      }
    ]
  },
  {
    id: 4,
    title: "Combinações Poderosas",
    description: "Refeições que mantêm a fome longe",
    xp_reward: 50,
    content: `
      <h2>Refeições que Mantêm a Fome Longe por Horas</h2>
      <p>Agora que você conhece os dois superpoderes contra a fome - inulina e espirulina - vamos aprender a combiná-los com outros alimentos para criar refeições que mantenham a fome longe por horas.</p>
      <h3>O Princípio do Prato Equilibrado:</h3>
      <p>O segredo para uma saciedade duradoura está na combinação certa de:</p>
      <ul>
        <li>Proteínas: O nutriente mais saciante</li>
        <li>Fibras: Ocupam espaço no estômago</li>
        <li>Gorduras saudáveis: Desaceleram a digestão</li>
        <li>Água: Evita que você confunda sede com fome</li>
      </ul>
      <p>A proporção ideal para máxima saciedade é:</p>
      <ul>
        <li>1/2 do prato: vegetais ricos em fibras</li>
        <li>1/4 do prato: proteínas de qualidade</li>
        <li>1/4 do prato: carboidratos complexos ricos em fibras</li>
        <li>1 colher de sobremesa de gorduras saudáveis</li>
      </ul>
      <p>Complete os exercícios para dominar as combinações poderosas!</p>
      
      <div className="bg-brand-100 p-4 rounded-lg mt-8 mb-4">
        <h3 className="text-brand-700 font-bold">Sem tempo para preparar tudo isso?</h3>
        <p className="mb-4">Conheça nosso suplemento que combina inulina, espirulina e fibras especiais!</p>
        <a href="https://pay.7steps.com/suplemento" target="_blank" className="bg-brand-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-brand-600 transition-colors">Quero conhecer o suplemento</a>
      </div>
    `,
    exercises: [
      {
        id: 401,
        title: "Monte seu Prato Ideal",
        description: "Crie um prato equilibrado para máxima saciedade",
        type: "dragdrop",
        xp_reward: 15,
        content: "Monte seu prato com a proporção ideal: 1/2 vegetais, 1/4 proteínas, 1/4 carboidratos complexos, 1 colher de gorduras saudáveis."
      },
      {
        id: 402,
        title: "Café da Manhã Bloqueador",
        description: "Prepare um café da manhã que bloqueia a fome",
        type: "challenge",
        xp_reward: 20,
        content: "Escolha e prepare uma das opções de café da manhã bloqueador."
      },
      {
        id: 403,
        title: "Planejamento de Refeições",
        description: "Planeje suas refeições para a semana",
        type: "form",
        xp_reward: 15,
        content: "Planeje 3 refeições principais e 2 lanches usando as combinações poderosas para os próximos 3 dias."
      }
    ]
  },
  {
    id: 5,
    title: "Rotina Realista",
    description: "Adaptando o método à sua vida",
    xp_reward: 50,
    content: `
      <h2>Como Implementar o Método na Sua Vida Corrida</h2>
      <p>Ter as informações certas é apenas o primeiro passo. O verdadeiro desafio é encaixar essas mudanças na sua rotina agitada. Vamos tornar isso possível!</p>
      <h3>Planejamento Semanal Express:</h3>
      <p>Regra de ouro: Dedique 1 hora por semana para planejar, economize 5 horas durante a semana.</p>
      <ol>
        <li>Escolha o dia: Domingo à noite ou sábado pela manhã</li>
        <li>Faça uma lista de compras baseada nas receitas escolhidas</li>
        <li>Prepare alguns itens básicos antecipadamente</li>
        <li>Monte sua caixa de emergência com espirulina, barras de proteína, etc.</li>
      </ol>
      <p>Complete os exercícios para criar uma rotina realista!</p>
    `,
    exercises: [
      {
        id: 501,
        title: "Planejamento Semanal",
        description: "Crie seu primeiro planejamento semanal",
        type: "form",
        xp_reward: 15,
        content: "Crie um planejamento semanal com dia de compras, preparo de alimentos básicos e ideias de refeições."
      },
      {
        id: 502,
        title: "Caixa de Emergência",
        description: "Monte sua caixa de emergência para dias corridos",
        type: "challenge",
        xp_reward: 20,
        content: "Monte uma caixa com: cápsulas de espirulina, barras de proteína sem açúcar, castanhas porcionadas, sachês de inulina."
      },
      {
        id: 503,
        title: "Estratégias para Eventos",
        description: "Planeje como manter o controle em eventos sociais",
        type: "form",
        xp_reward: 15,
        content: "Crie seu plano para um evento social: o que fazer antes, durante e depois para manter o controle."
      }
    ]
  },
  {
    id: 6,
    title: "Reprogramação Emocional",
    description: "Libertando-se da fome emocional",
    xp_reward: 50,
    content: `
      <h2>Libertando-se do Ciclo Fome-Emoção</h2>
      <p>Agora que você já tem ferramentas práticas para controlar sua fome física, vamos trabalhar no aspecto mais desafiador: a fome emocional.</p>
      <h3>Diferenciando Fome Física de Emocional:</h3>
      <p>Seu corpo comunica fome física de forma muito diferente da fome emocional:</p>
      <h4>Fome Física:</h4>
      <ul>
        <li>Surge gradualmente</li>
        <li>Pode esperar</li>
        <li>Satisfeita com qualquer alimento</li>
        <li>Para quando você está cheia</li>
        <li>Não causa culpa</li>
      </ul>
      <h4>Fome Emocional:</h4>
      <ul>
        <li>Surge repentinamente</li>
        <li>Parece urgente</li>
        <li>Deseja alimentos específicos</li>
        <li>Continua mesmo após estar cheia</li>
        <li>Frequentemente causa culpa</li>
      </ul>
      <p>Complete os exercícios para dominar suas emoções!</p>
    `,
    exercises: [
      {
        id: 601,
        title: "Diário de Emoções",
        description: "Identifique padrões emocionais na sua alimentação",
        type: "diary",
        xp_reward: 15,
        content: "Por 3 dias, antes de comer, anote: De 0 a 10, qual meu nível de fome física? O que estou sentindo neste momento?"
      },
      {
        id: 602,
        title: "Técnicas de Respiração",
        description: "Aprenda a acalmar a ansiedade sem comida",
        type: "challenge",
        xp_reward: 20,
        content: "Pratique a respiração 4-7-8: Inspire pelo nariz contando até 4, segure o ar contando até 7, expire pela boca contando até 8. Repita 3 vezes."
      },
      {
        id: 603,
        title: "Técnica dos 5 Porquês",
        description: "Descubra a raiz da sua fome emocional",
        type: "form",
        xp_reward: 15,
        content: "Escolha um momento de fome emocional e aplique a técnica dos 5 porquês para encontrar a causa raiz."
      }
    ]
  },
  {
    id: 7,
    title: "Mantendo os Resultados",
    description: "Estratégias para sucesso duradouro",
    xp_reward: 50,
    content: `
      <h2>Estratégias para o Sucesso Duradouro</h2>
      <p>Parabéns por chegar ao último passo! Agora que você tem todas as ferramentas para controlar sua fome e transformar sua relação com a comida, vamos garantir que esses resultados durem para sempre.</p>
      <h3>Criando Novos Hábitos Permanentes:</h3>
      <p>Segundo estudos, são necessários em média 66 dias para formar um novo hábito automático. Para facilitar esse processo:</p>
      <ol>
        <li>Comece com micro-hábitos: Metas tão pequenas que parecem fáceis demais</li>
        <li>Use gatilhos já existentes: Associe o novo hábito a algo que você já faz automaticamente</li>
        <li>Comemore pequenas vitórias: O cérebro precisa de recompensas para solidificar hábitos</li>
      </ol>
      <p>Complete os exercícios finais para consolidar sua transformação!</p>
      
      <div className="bg-brand-100 p-4 rounded-lg mt-8 mb-4">
        <h3 className="text-brand-700 font-bold">Você chegou longe. Agora vamos mais além?</h3>
        <p className="mb-4">Conheça nosso programa de acompanhamento personalizado com personal trainer!</p>
        <a href="https://pay.7steps.com/treino" target="_blank" className="bg-brand-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-brand-600 transition-colors">Quero conhecer o programa</a>
      </div>
    `,
    exercises: [
      {
        id: 701,
        title: "Registro de Progresso",
        description: "Crie seu sistema de monitoramento semanal",
        type: "form",
        xp_reward: 15,
        content: "Crie um sistema para registrar semanalmente: nível de energia, qualidade do sono, disposição e bem-estar emocional."
      },
      {
        id: 702,
        title: "Plano para Recaídas",
        description: "Prepare-se para lidar com possíveis recaídas",
        type: "form",
        xp_reward: 20,
        content: "Crie um plano de ação para lidar com recaídas: o que fazer e o que não fazer após uma recaída."
      },
      {
        id: 703,
        title: "Carta para o Futuro",
        description: "Escreva uma carta para seu futuro eu",
        type: "diary",
        xp_reward: 15,
        content: "Escreva uma carta para seu futuro eu, lembrando dos motivos pelos quais você iniciou essa jornada e como se sente agora."
      }
    ]
  }
];
