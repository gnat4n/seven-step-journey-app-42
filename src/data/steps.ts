
import { JourneyStep } from '@/types';

export const mockSteps: JourneyStep[] = [
  {
    id: 1,
    title: "Desintoxicação Mental",
    description: "Quebrando o ciclo mental da fome emocional",
    xp_reward: 50,
    content: `
      <h2>Desintoxicação Mental: Quebrando o Ciclo</h2>
      <p>Grande parte da nossa fome não tem nada a ver com necessidades nutricionais, mas sim com gatilhos emocionais. Antes de falarmos de alimentos e nutrientes, precisamos "limpar" nossa mente.</p>
      
      <h3>Identificando seus Gatilhos</h3>
      <p>Na maioria das vezes, comemos por emoção sem nem perceber. Vamos identificar seus principais gatilhos:</p>
      <ul>
        <li><strong>Estresse:</strong> "Dia difícil no trabalho? Mereço aquele chocolate!"</li>
        <li><strong>Tédio:</strong> "Não tenho nada para fazer... o que tem na geladeira?"</li>
        <li><strong>Tristeza:</strong> "Estou chateada... um sorvete vai me fazer sentir melhor."</li>
        <li><strong>Ansiedade:</strong> "Tenho uma reunião importante amanhã... preciso de algo para roer."</li>
        <li><strong>Cansaço:</strong> "Estou exausta... um docinho vai me dar energia."</li>
      </ul>
      
      <h3>Técnica do STOP</h3>
      <p>Quando sentir vontade de comer sem estar realmente com fome, pratique a técnica STOP:</p>
      <ul>
        <li><strong>S</strong> - Pare (Stop) o que estiver fazendo</li>
        <li><strong>T</strong> - Respire (Take a breath) profundamente 3 vezes</li>
        <li><strong>O</strong> - Observe o que está sentindo (sem julgamento)</li>
        <li><strong>P</strong> - Prossiga de forma consciente (decida se realmente quer comer)</li>
      </ul>
      <p>Este intervalo de apenas 30 segundos pode ser suficiente para quebrar o piloto automático que nos leva à geladeira sem pensar.</p>
      
      <h3>Reprogramando Pensamentos Automáticos</h3>
      <p>Nosso cérebro está cheio de pensamentos automáticos sobre comida que aceitamos como verdade, mas são apenas hábitos mentais:</p>
      <ul>
        <li><strong>Pensamento antigo:</strong> "Preciso limpar o prato."<br>
            <strong>Reprogramação:</strong> "Posso parar quando me sentir satisfeita."</li>
        <li><strong>Pensamento antigo:</strong> "Mereço esse doce após um dia difícil."<br>
            <strong>Reprogramação:</strong> "Mereço me sentir bem e energizada, não pesada e culpada."</li>
        <li><strong>Pensamento antigo:</strong> "Uma vez que comecei, não consigo parar."<br>
            <strong>Reprogramação:</strong> "Cada mordida é uma nova escolha. Posso parar quando quiser."</li>
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
    description: "O segredo natural para prolongar a saciedade",
    xp_reward: 50,
    content: `
      <h2>O Poder da Inulina: O Segredo Natural para Prolongar a Saciedade</h2>
      <p>Agora que começamos a trabalhar sua mente, vamos falar sobre algo que vai revolucionar sua fisiologia: a inulina.</p>
      
      <h3>O que é Inulina?</h3>
      <p>A inulina é uma fibra solúvel natural encontrada em diversos vegetais. Mas não é uma fibra qualquer - ela é considerada um prebiótico funcional com superpoderes contra a fome.</p>
      <p>Diferente de outras fibras, a inulina tem uma capacidade extraordinária: quando entra em contato com água no seu estômago, forma um gel que aumenta de volume, criando uma sensação de saciedade que dura horas!</p>
      
      <h3>Como a Inulina Bloqueia sua Fome</h3>
      <p>Imagine ter um assistente dentro do seu estômago trabalhando para você se sentir satisfeita por mais tempo. É exatamente isso que a inulina faz:</p>
      <ol>
        <li>Forma um gel no estômago que ocupa espaço e reduz a capacidade física</li>
        <li>Retarda o esvaziamento gástrico, fazendo a digestão durar mais tempo</li>
        <li>Alimenta as bactérias benéficas do intestino, melhorando sua flora intestinal</li>
        <li>Reduz a absorção de gorduras dos alimentos que você consome</li>
      </ol>
      
      <h3>Onde Encontrar Inulina</h3>
      <p>Você pode encontrar inulina naturalmente nestes alimentos:</p>
      <ul>
        <li>Raiz de chicória (fonte mais rica)</li>
        <li>Yacon (batata andina)</li>
        <li>Alho</li>
        <li>Cebola</li>
        <li>Banana ligeiramente verde</li>
        <li>Trigo integral</li>
        <li>Almeirão</li>
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
    description: "O superalimento que desliga o botão da fome",
    xp_reward: 50,
    content: `
      <h2>O Segredo da Espirulina: O Superalimento que Desliga o Botão da Fome</h2>
      <p>Enquanto a inulina trabalha fisicamente no seu estômago, precisamos de algo que atue diretamente nos hormônios da fome. É aí que entra a espirulina - um dos superalimentos mais poderosos do planeta.</p>
      
      <h3>O que é Espirulina?</h3>
      <p>A espirulina é uma microalga azul-esverdeada cultivada em água doce. Não se assuste com o nome "alga" - ela é consumida há séculos por diversas culturas e hoje é reconhecida mundialmente como um dos alimentos mais nutritivos que existem.</p>
      <p>Para ter ideia, a espirulina contém:</p>
      <ul>
        <li>Até 70% de proteína completa (mais que qualquer alimento vegetal)</li>
        <li>Todos os aminoácidos essenciais</li>
        <li>Vitaminas do complexo B, vitamina E, e betacaroteno</li>
        <li>Minerais como ferro, magnésio e potássio</li>
        <li>Poderosos antioxidantes, incluindo ficocianina</li>
      </ul>
      
      <h3>Como a Espirulina Controla sua Fome</h3>
      <p>A espirulina trabalha de várias formas para reduzir sua fome:</p>
      <ol>
        <li>Estimula a produção de hormônios de saciedade (como leptina)</li>
        <li>Fornece proteína de alta qualidade que mantém você satisfeita por mais tempo</li>
        <li>Estabiliza os níveis de açúcar no sangue, prevenindo aquela queda que causa fome repentina</li>
        <li>Aumenta sua energia sem estimulantes, reduzindo a busca por "combustíveis rápidos" como açúcar</li>
        <li>Contém ácido γ-linolênico, que auxilia no metabolismo de gorduras</li>
      </ol>
      
      <p>Complete os exercícios abaixo para aproveitar os benefícios da espirulina!</p>
    `,
    exercises: [
      {
        id: 301,
        title: "Escolhendo a Espirulina",
        description: "Aprenda a selecionar um produto de qualidade",
        type: "challenge",
        xp_reward: 15,
        content: "Pesquise sobre marcas de espirulina, verificando certificações e avaliando suas opções entre pó, comprimidos ou cápsulas."
      },
      {
        id: 302,
        title: "Experimento de 3 Dias",
        description: "Observe os efeitos na sua fome",
        type: "diary",
        xp_reward: 20,
        content: "Consuma 1g de espirulina diariamente por 3 dias consecutivos, 30 minutos antes das refeições. Anote como se sentiu em relação à fome e energia."
      },
      {
        id: 303,
        title: "Receita com Espirulina",
        description: "Incorpore a espirulina na sua alimentação",
        type: "form",
        xp_reward: 15,
        content: "Crie uma receita simples usando espirulina (smoothie, iogurte, etc) e descreva como ficou o sabor, textura e sua experiência."
      }
    ]
  },
  {
    id: 4,
    title: "Combinações Poderosas",
    description: "Refeições que mantêm a fome longe por horas",
    xp_reward: 50,
    content: `
      <h2>Combinações Poderosas: Refeições que Mantêm a Fome Longe por Horas</h2>
      <p>Agora que você conhece os dois superpoderes contra a fome - inulina e espirulina - vamos aprender a combiná-los com outros alimentos para criar refeições que mantenham a fome longe por horas.</p>
      
      <h3>O Princípio do Prato Equilibrado</h3>
      <p>O segredo para uma saciedade duradoura está na combinação certa de:</p>
      <ul>
        <li><strong>Proteínas:</strong> São o nutriente mais saciante e mantêm a fome longe por mais tempo</li>
        <li><strong>Fibras:</strong> Ocupam espaço no estômago e retardam a digestão</li>
        <li><strong>Gorduras saudáveis:</strong> Desaceleram a digestão e enviam sinais de saciedade ao cérebro</li>
        <li><strong>Água:</strong> Muitas vezes confundimos sede com fome</li>
      </ul>
      <p>A proporção ideal para máxima saciedade é:</p>
      <ul>
        <li>1/2 do prato: vegetais ricos em fibras</li>
        <li>1/4 do prato: proteínas de qualidade</li>
        <li>1/4 do prato: carboidratos complexos ricos em fibras</li>
        <li>1 colher de sobremesa de gorduras saudáveis</li>
      </ul>
      
      <h3>Cafés da Manhã que Bloqueiam a Fome</h3>
      <p>Aqui estão algumas ideias de cafés da manhã que podem manter a fome longe por horas:</p>
      <ul>
        <li><strong>Super Bowl de Aveia:</strong> Aveia + inulina + chia + iogurte natural + banana + canela</li>
        <li><strong>Omelete Nutritiva:</strong> Ovos + folhas verdes refogadas com alho + tomate + espirulina</li>
        <li><strong>Smoothie Bloqueador:</strong> Banana verde + pasta de amendoim + espirulina + leite vegetal</li>
      </ul>
      
      <p>Complete os exercícios abaixo para dominar as combinações que bloqueiam a fome!</p>
    `,
    exercises: [
      {
        id: 401,
        title: "Monte seu Prato Equilibrado",
        description: "Aplique o princípio do prato equilibrado",
        type: "dragdrop",
        xp_reward: 15,
        content: "Organize os alimentos nas proporções corretas para criar um prato equilibrado que promova máxima saciedade."
      },
      {
        id: 402,
        title: "Café da Manhã Bloqueador",
        description: "Prepare um café da manhã que bloqueia a fome",
        type: "challenge",
        xp_reward: 20,
        content: "Prepare um dos cafés da manhã sugeridos ou crie sua própria versão, incluindo inulina e/ou espirulina. Observe por quanto tempo você se sente satisfeita."
      },
      {
        id: 403,
        title: "Plano de Refeições de 1 Dia",
        description: "Crie um dia de refeições bloqueadoras",
        type: "form",
        xp_reward: 15,
        content: "Planeje um dia inteiro de alimentação (café da manhã, almoço, jantar e lanches) incorporando os princípios de combinações poderosas."
      }
    ]
  },
  {
    id: 5,
    title: "Rotina Realista",
    description: "Como implementar o método na sua vida corrida",
    xp_reward: 50,
    content: `
      <h2>Rotina Realista: Como Implementar o Método na Sua Vida Corrida</h2>
      <p>Ter as informações certas é apenas o primeiro passo. O verdadeiro desafio é encaixar essas mudanças na sua rotina agitada de mulher que trabalha fora e/ou cuida dos filhos. Vamos tornar isso possível!</p>
      
      <h3>Planejamento Semanal Express</h3>
      <p>Regra de ouro: Dedique 1 hora por semana para planejar, economize 5 horas durante a semana.</p>
      <p>Passos simples:</p>
      <ol>
        <li>Escolha o dia: Domingo à noite ou sábado pela manhã geralmente funcionam melhor</li>
        <li>Faça uma lista de compras baseada nas receitas que escolheu para a semana</li>
        <li>Prepare alguns itens básicos:
          <ul>
            <li>Cozinhe 2-3 proteínas diferentes (frango, ovo cozido, lentilhas)</li>
            <li>Prepare 1 grão/carboidrato (arroz integral, quinoa)</li>
            <li>Lave e corte vegetais para a semana</li>
            <li>Prepare porções de inulina e espirulina para facilitar o uso diário</li>
          </ul>
        </li>
        <li>Monte sua caixa de emergência:
          <ul>
            <li>Cápsulas de espirulina</li>
            <li>Barras de proteína sem açúcar</li>
            <li>Castanhas porcionadas</li>
            <li>Sachês de inulina para levar na bolsa</li>
          </ul>
        </li>
      </ol>
      
      <h3>Preparação para Dias Caóticos</h3>
      <p>Sabemos que nem todos os dias correm como planejado. Para dias extremamente corridos, tenha estas estratégias:</p>
      <ul>
        <li><strong>Café da manhã de 2 minutos:</strong> Smoothie no liquidificador (banana + espirulina + inulina + leite vegetal)</li>
        <li><strong>Almoço de emergência:</strong> Potinho com atum + grão-de-bico + folhas + azeite + 1 cápsula de espirulina</li>
        <li><strong>Jantar expresso:</strong> Omelete (3 minutos para preparar) ou sopa instantânea caseira (prepare e congele em porções)</li>
      </ul>
      
      <p>Complete os exercícios abaixo para criar sua rotina realista!</p>
    `,
    exercises: [
      {
        id: 501,
        title: "Planejamento Semanal Express",
        description: "Crie seu primeiro plano semanal",
        type: "form",
        xp_reward: 15,
        content: "Dedique 30 minutos para planejar suas refeições da próxima semana, incluindo uma lista de compras e preparações antecipadas."
      },
      {
        id: 502,
        title: "Monte sua Caixa de Emergência",
        description: "Prepare-se para momentos desafiadores",
        type: "challenge",
        xp_reward: 20,
        content: "Monte uma caixa/kit de emergência com opções para momentos de fome fora de hora ou dias muito corridos."
      },
      {
        id: 503,
        title: "Estratégias para Eventos Sociais",
        description: "Planeje como manter o controle em situações sociais",
        type: "form",
        xp_reward: 15,
        content: "Descreva suas estratégias para 3 tipos de eventos sociais (jantar fora, festa de aniversário, happy hour com colegas)."
      }
    ]
  },
  {
    id: 6,
    title: "Reprogramação Emocional",
    description: "Libertando-se do ciclo fome-emoção",
    xp_reward: 50,
    content: `
      <h2>Reprogramação Emocional: Libertando-se do Ciclo Fome-Emoção</h2>
      <p>Agora que você já tem ferramentas práticas para controlar sua fome física, vamos trabalhar no aspecto mais desafiador: a fome emocional.</p>
      
      <h3>Diferenciando Fome Física de Emocional</h3>
      <p>Seu corpo comunica fome física de forma muito diferente da fome emocional. Aprender a identificar cada uma é o primeiro passo para a libertação:</p>
      <p><strong>Fome Física:</strong></p>
      <ul>
        <li>Surge gradualmente</li>
        <li>Pode esperar</li>
        <li>Satisfeita com qualquer alimento</li>
        <li>Para quando você está cheia</li>
        <li>Não causa culpa</li>
      </ul>
      <p><strong>Fome Emocional:</strong></p>
      <ul>
        <li>Surge repentinamente</li>
        <li>Parece urgente</li>
        <li>Deseja alimentos específicos (geralmente doces/gordurosos)</li>
        <li>Continua mesmo após estar cheia</li>
        <li>Frequentemente causa culpa</li>
      </ul>
      
      <h3>Técnicas de Respiração para Momentos de Ansiedade</h3>
      <p>Quando a vontade de comer por ansiedade bater forte, experimente estas técnicas:</p>
      <p><strong>Respiração 4-7-8:</strong></p>
      <ol>
        <li>Inspire pelo nariz contando até 4</li>
        <li>Segure o ar contando até 7</li>
        <li>Expire pela boca contando até 8</li>
        <li>Repita 3 vezes</li>
      </ol>
      
      <p>Complete os exercícios abaixo para transformar sua relação emocional com a comida!</p>
    `,
    exercises: [
      {
        id: 601,
        title: "Diário de Fome Física vs. Emocional",
        description: "Aprenda a identificar os diferentes tipos de fome",
        type: "diary",
        xp_reward: 15,
        content: "Por 3 dias, antes de comer, avalie seu nível de fome física (0-10) e anote o que está sentindo emocionalmente naquele momento."
      },
      {
        id: 602,
        title: "Técnica dos 5 Porquês",
        description: "Descubra a raiz da sua fome emocional",
        type: "form",
        xp_reward: 20,
        content: "Aplique a técnica dos 5 porquês a um episódio recente de fome emocional. Por exemplo: Por que quero comer este doce? Porque estou ansiosa. Por que estou ansiosa? Etc."
      },
      {
        id: 603,
        title: "Comportamentos Alternativos",
        description: "Crie substitutos para a alimentação emocional",
        type: "form",
        xp_reward: 15,
        content: "Identifique seus 3 principais gatilhos emocionais para comer e liste 3 comportamentos alternativos para cada um."
      }
    ]
  },
  {
    id: 7,
    title: "Manutenção dos Resultados",
    description: "Estratégias para o sucesso duradouro",
    xp_reward: 50,
    content: `
      <h2>Manutenção dos Resultados: Estratégias para o Sucesso Duradouro</h2>
      <p>Agora que você tem todas as ferramentas para controlar sua fome e transformar sua relação com a comida, vamos garantir que esses resultados durem para sempre.</p>
      
      <h3>Criando Novos Hábitos Permanentes</h3>
      <p>Segundo estudos, são necessários em média 66 dias para formar um novo hábito automático. Para facilitar esse processo:</p>
      <ol>
        <li><strong>Comece com micro-hábitos:</strong> Metas tão pequenas que parecem fáceis demais
          <ul><li>Exemplo: "Vou adicionar inulina em apenas UMA refeição por dia"</li></ul>
        </li>
        <li><strong>Use gatilhos já existentes:</strong> Associe o novo hábito a algo que você já faz automaticamente
          <ul><li>Exemplo: "Depois de escovar os dentes (hábito existente), tomarei minha cápsula de espirulina (novo hábito)"</li></ul>
        </li>
        <li><strong>Comemore pequenas vitórias:</strong> O cérebro precisa de recompensas para solidificar hábitos
          <ul><li>Exemplo: Após uma semana seguindo o plano, permita-se um momento especial (não alimentar!)</li></ul>
        </li>
      </ol>
      
      <h3>Lidando com Recaídas</h3>
      <p>Recaídas fazem parte do processo de mudança - o segredo é como você reage a elas:</p>
      <p><strong>O que NÃO fazer após uma recaída:</strong></p>
      <ul>
        <li>Pensar "já estraguei tudo, vou continuar comendo"</li>
        <li>Auto-crítica severa ("sou um fracasso")</li>
        <li>Jejum compensatório no dia seguinte</li>
      </ul>
      <p><strong>O que fazer:</strong></p>
      <ul>
        <li>Praticar autocompaixão ("todos cometem erros")</li>
        <li>Pensar em aprendizado ("o que posso aprender com essa situação?")</li>
        <li>Voltar ao plano na próxima refeição (não no dia seguinte)</li>
      </ul>
      
      <p>Complete os exercícios finais para consolidar sua jornada!</p>
    `,
    exercises: [
      {
        id: 701,
        title: "Meu Plano 7Steps",
        description: "Crie seu plano personalizado",
        type: "form",
        xp_reward: 15,
        content: "Desenvolva seu plano pessoal combinando as estratégias mais eficazes de cada passo para sua realidade."
      },
      {
        id: 702,
        title: "Plano para Momentos Desafiadores",
        description: "Prepare-se para situações difíceis",
        type: "form",
        xp_reward: 20,
        content: "Identifique 3 situações desafiadoras recorrentes e crie estratégias específicas para cada uma delas."
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
