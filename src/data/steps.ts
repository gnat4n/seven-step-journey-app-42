import { JourneyStep } from '@/types';

export const mockSteps: JourneyStep[] = [
  {
    id: 1,
    title: "Consciência",
    description: "Desenvolva consciência sobre seus hábitos alimentares",
    xp_reward: 50,
    content: `
      <h2>Consciência: O Primeiro Passo</h2>
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
    ],
    modules: []
  },
  {
    id: 2,
    title: "Nutrição",
    description: "Aprenda sobre nutrientes que promovem saciedade",
    xp_reward: 50,
    content: `
      <h2>O Poder da Inulina</h2>
      <p>Agora que começamos a trabalhar sua mente, vamos falar sobre algo que vai revolucionar sua fisiologia: a inulina.</p>
      
      <h3>O Que é Inulina?</h3>
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
      
      <h3>Como Usar Inulina para Máximo Benefício</h3>
      <p><strong>Dosagem diária recomendada:</strong> 5 a 20g por dia</p>
      <p><strong>Uso ideal:</strong> Comece com doses menores (5g/dia) e aumente gradualmente para evitar desconforto intestinal inicial (gases, inchaço).</p>
      <p><strong>Momento perfeito:</strong> Tome 500mg de inulina pura (em pó ou suplemento) em jejum, com um copo grande de água, 30 minutos antes do café da manhã. Isso criará uma "barreira de gel" no seu estômago antes mesmo de começar o dia.</p>
      <p><strong>Para resultados visíveis:</strong> Use por pelo menos 15 dias consecutivos.</p>
      
      <h4>Receita Rápida: Água de Inulina</h4>
      <ul>
        <li>1 colher de chá de inulina em pó (3g)</li>
        <li>1 copo de água (200ml)</li>
        <li>Suco de meio limão (opcional)</li>
        <li>Misture bem e tome em jejum</li>
      </ul>
      
      <h3>Outros Benefícios da Inulina</h3>
      <p>Além de controlar sua fome, a inulina oferece:</p>
      <ul>
        <li>Melhora da digestão e combate à prisão de ventre</li>
        <li>Fortalecimento do sistema imunológico</li>
        <li>Redução do colesterol e triglicerídeos</li>
        <li>Prevenção de doenças intestinais</li>
        <li>Auxílio na absorção de minerais como cálcio</li>
      </ul>
      
      <p><strong>ATENÇÃO:</strong> Se você tem síndrome do intestino irritável severa ou outras condições digestivas, consulte seu médico antes de aumentar significativamente seu consumo de inulina.</p>
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
    ],
    modules: []
  },
  {
    id: 3,
    title: "Mindful Eating",
    description: "Pratique a alimentação consciente",
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
        title: "Exercício da Uva Passa",
        description: "Prática clássica de mindfulness com alimentos",
        type: "challenge",
        xp_reward: 15,
        content: "Coma uma única uva passa (ou outro pequeno alimento) com total atenção, durante 5 minutos, observando todos os aspectos sensoriais da experiência."
      },
      {
        id: 302,
        title: "Refeição Sem Distrações",
        description: "Faça uma refeição com atenção plena",
        type: "diary",
        xp_reward: 20,
        content: "Faça pelo menos uma refeição por dia sem nenhuma distração (TV, celular, computador, leitura) por 3 dias. Registre suas observações."
      },
      {
        id: 303,
        title: "Escala de Fome",
        description: "Aprenda a identificar seus níveis de fome",
        type: "form",
        xp_reward: 15,
        content: "Antes de cada refeição principal, avalie sua fome em uma escala de 1 a 10. Coma até chegar ao nível 7 (confortavelmente satisfeita, não cheia). Registre sua experiência."
      }
    ],
    modules: [
      {
        id: "espirulina",
        title: "O Segredo da Espirulina",
        description: "Aprenda como este superalimento controla sua fome",
        type: "content",
        xp_reward: 25,
        content: `
          <h1 class="text-3xl font-bold mb-6 text-brand-700 dark:text-brand-300">PASSO 3: O SEGREDO DA ESPIRULINA</h1>

          <h2 class="text-2xl font-bold mb-4 text-brand-600 dark:text-brand-200">O SUPERALIMENTO QUE DESLIGA O BOTÃO DA FOME</h2>
          <p class="mb-6">Enquanto a inulina trabalha fisicamente no seu estômago, precisamos de algo que atue diretamente nos hormônios da fome. É aí que entra a espirulina - um dos superalimentos mais poderosos do planeta.</p>
          
          <h3 class="text-xl font-bold mb-3 text-brand-600 dark:text-brand-200">O QUE É ESPIRULINA?</h3>
          <p class="mb-4">A espirulina é uma microalga azul-esverdeada cultivada em água doce. Não se assuste com o nome "alga" - ela é consumida há séculos por diversas culturas e hoje é reconhecida mundialmente como um dos alimentos mais nutritivos que existem.</p>
          <p class="mb-4">Para ter ideia, a espirulina contém:</p>
          <ul class="list-disc pl-6 mb-6 space-y-1">
            <li>Até 70% de proteína completa (mais que qualquer alimento vegetal)</li>
            <li>Todos os aminoácidos essenciais</li>
            <li>Vitaminas do complexo B, vitamina E, e betacaroteno</li>
            <li>Minerais como ferro, magnésio e potássio</li>
            <li>Poderosos antioxidantes, incluindo ficocianina</li>
          </ul>
          
          <h3 class="text-xl font-bold mb-3 text-brand-600 dark:text-brand-200">COMO A ESPIRULINA CONTROLA SUA FOME</h3>
          <p class="mb-4">A espirulina trabalha de várias formas para reduzir sua fome:</p>
          <ol class="list-decimal pl-6 mb-6 space-y-1">
            <li>Estimula a produção de hormônios de saciedade (como leptina)</li>
            <li>Fornece proteína de alta qualidade que mantém você satisfeita por mais tempo</li>
            <li>Estabiliza os níveis de açúcar no sangue, prevenindo aquela queda que causa fome repentina</li>
            <li>Aumenta sua energia sem estimulantes, reduzindo a busca por "combustíveis rápidos" como açúcar</li>
            <li>Contém ácido γ-linolênico, que auxilia no metabolismo de gorduras</li>
          </ol>
          
          <h3 class="text-xl font-bold mb-3 text-brand-600 dark:text-brand-200">COMO ESCOLHER E USAR ESPIRULINA</h3>
          <p class="mb-2"><strong>Como escolher:</strong> Opte por marcas certificadas, orgânicas e testadas para metais pesados. A cor deve ser verde profundo, quase azulado.</p>
          <p class="mb-2"><strong>Formas disponíveis:</strong></p>
          <ul class="list-disc pl-6 mb-4 space-y-1">
            <li>Pó (mais versátil, pode ser adicionado a receitas)</li>
            <li>Cápsulas de ModelaCaps (mais convenientes para consumo diário)</li>
            <li>Flocos (menos comuns)</li>
          </ul>
          <p class="mb-2"><strong>Dosagem recomendada:</strong> 1 a 3 gramas por dia (comece com doses menores e aumente gradualmente)</p>
          <p class="mb-2"><strong>Sabor:</strong> A espirulina tem um sabor forte, semelhante a algas marinhas. Se você não está acostumada, comece com pequenas quantidades misturadas em sucos, smoothies ou iogurte.</p>
          <p class="mb-6"><strong>DICA PRÁTICA:</strong> Se o sabor for um obstáculo, as cápsulas são uma excelente alternativa.</p>
          
          <h3 class="text-xl font-bold mb-3 text-brand-600 dark:text-brand-200">COMO INCORPORAR NA SUA ROTINA</h3>
          <p class="mb-2"><strong>Versão básica:</strong> 1/2 colher de chá de espirulina em pó misturada em um copo de suco de laranja ou água de coco.</p>
          <p class="mb-2"><strong>Para quem não gosta do sabor:</strong> 2 cápsulas de ModelaCaps com água antes das refeições.</p>
          <p class="mb-2"><strong>Para máxima saciedade:</strong> Combine espirulina com inulina em um smoothie matinal:</p>
          <ul class="list-disc pl-6 mb-6 space-y-1">
            <li>1 banana</li>
            <li>1 colher de chá de espirulina</li>
            <li>1 colher de chá de inulina</li>
            <li>1 copo de leite vegetal</li>
            <li>Gelo a gosto</li>
          </ul>
          
          <h3 class="text-xl font-bold mb-3 text-brand-600 dark:text-brand-200">BENEFÍCIOS ADICIONAIS DA ESPIRULINA</h3>
          <p class="mb-4">Além de controlar sua fome, a espirulina:</p>
          <ul class="list-disc pl-6 mb-6 space-y-1">
            <li>Combate anemia devido ao alto teor de ferro</li>
            <li>Fortalece o sistema imunológico</li>
            <li>Reduz colesterol e triglicerídeos</li>
            <li>Possui potente ação anti-inflamatória</li>
            <li>Combate o envelhecimento precoce graças aos antioxidantes</li>
          </ul>
          
          <div class="p-4 border border-yellow-400 bg-yellow-50 rounded-md dark:bg-yellow-900/30 dark:border-yellow-700 mb-6">
            <p class="font-bold text-yellow-800 dark:text-yellow-300">ATENÇÃO:</p>
            <p class="text-yellow-700 dark:text-yellow-200">A espirulina não é recomendada para grávidas, lactantes, pessoas com fenilcetonúria ou doenças autoimunes. Se você tem alguma condição médica, consulte seu médico antes de usar.</p>
          </div>
        `
      },
      {
        id: "espirulina_exercicios",
        title: "Exercícios Práticos",
        description: "Exercícios para fixar o conteúdo sobre espirulina",
        type: "exercises",
        xp_reward: 25,
        content: `Exercícios sobre o uso da espirulina para controlar a fome.`
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
        title: "Diário de Hidratação",
        description: "Monitore sua ingestão de água diariamente",
        type: "diary",
        xp_reward: 15,
        content: "Por 3 dias, registre toda água/líquidos que consumir. Meta: 30ml por kg de peso corporal diariamente."
      },
      {
        id: 402,
        title: "Teste da Sede",
        description: "Diferencie sede de fome",
        type: "challenge",
        xp_reward: 20,
        content: "Quando sentir fome entre refeições, beba um copo de água e espere 15 minutos. Anote se a sensação de fome persistiu ou não."
      },
      {
        id: 403,
        title: "Águas Aromatizadas",
        description: "Crie suas próprias águas saborosas",
        type: "challenge",
        xp_reward: 15,
        content: "Prepare 3 diferentes combinações de águas aromatizadas naturalmente (com frutas, ervas, especiarias) para tornar a hidratação mais prazerosa."
      }
    ]
  },
  {
    id: 5,
    title: "Gestão do Estresse",
    description: "Técnicas para reduzir o estresse e a fome emocional",
    xp_reward: 50,
    content: `
      <h2>Gestão do Estresse: Quebrando o Ciclo Estresse-Fome</h2>
      <p>O estresse crônico é um dos maiores inimigos do controle da fome. Quando estamos estressados, o corpo libera cortisol, hormônio que aumenta o apetite, especialmente por alimentos calóricos.</p>
      
      <h3>A Conexão Fisiológica Entre Estresse e Fome</h3>
      <p>Entender como o estresse afeta seu comportamento alimentar é fundamental:</p>
      <ul>
        <li>Cortisol elevado aumenta o desejo por alimentos ricos em açúcar e gordura</li>
        <li>Estresse crônico pode causar resistência à leptina (hormônio da saciedade)</li>
        <li>Ansiedade frequentemente leva a "comer sem pensar"</li>
        <li>Privação de sono (comum em períodos estressantes) aumenta a grelina (hormônio da fome)</li>
        <li>O ciclo vicioso: estresse → comer → culpa → mais estresse → mais comer</li>
      </ul>
      
      <h3>Técnicas de Respiração para Momentos Críticos</h3>
      <p>Quando sentir o estresse aumentando e a vontade de comer surgindo:</p>
      <ol>
        <li><strong>Respiração 4-7-8:</strong> Inspire pelo nariz (4s), segure o ar (7s), expire pela boca (8s)</li>
        <li><strong>Respiração Quadrada:</strong> Inspire (4s), segure (4s), expire (4s), segure (4s)</li>
        <li><strong>3 Respirações Profundas:</strong> Simples, mas eficaz. Concentre-se apenas na sua respiração</li>
      </ol>
      
      <h3>Práticas Diárias Anti-Estresse</h3>
      <ul>
        <li>Meditação: 5-10 minutos diários já trazem benefícios significativos</li>
        <li>Caminhadas na natureza: reduzem cortisol e clareiam a mente</li>
        <li>Banhos de imersão com sais de Epsom: relaxam o sistema nervoso</li>
        <li>Escrita expressiva: coloque suas preocupações no papel para processá-las</li>
        <li>Limite o tempo em redes sociais e notícias: fontes frequentes de estresse</li>
      </ul>
      
      <p>Complete os exercícios abaixo para melhorar sua gestão de estresse!</p>
    `,
    exercises: [
      {
        id: 501,
        title: "Diário de Estresse e Alimentação",
        description: "Identifique padrões entre estresse e comportamento alimentar",
        type: "diary",
        xp_reward: 15,
        content: "Por 3 dias, registre seu nível de estresse (1-10) e se esse estresse influenciou suas escolhas alimentares. Identifique padrões."
      },
      {
        id: 502,
        title: "Meditação da Ancoragem",
        description: "Aprenda uma técnica rápida para acalmar-se",
        type: "challenge",
        xp_reward: 20,
        content: "Pratique a meditação da ancoragem: sente-se confortavelmente, feche os olhos, foque na sensação da respiração nas narinas por 5 minutos."
      },
      {
        id: 503,
        title: "Rotina Anti-Estresse",
        description: "Crie seu próprio protocolo para momentos estressantes",
        type: "form",
        xp_reward: 15,
        content: "Desenvolva uma rotina pessoal de 5-10 minutos para momentos de alto estresse, incluindo respiração, movimento e atenção plena."
      }
    ]
  },
  {
    id: 6,
    title: "Movimento",
    description: "Atividade física para regular o apetite",
    xp_reward: 50,
    content: `
      <h2>Movimento: O Regulador Natural do Apetite</h2>
      <p>O exercício físico adequado não apenas queima calorias, mas também regula hormônios relacionados à fome, melhora a sensibilidade à insulina e reduz o estresse.</p>
      
      <h3>Como o Movimento Regula a Fome</h3>
      <p>O movimento físico apropriado tem efeitos poderosos na regulação do apetite:</p>
      <ul>
        <li>Reduz temporariamente a grelina (hormônio da fome)</li>
        <li>Aumenta peptídeos de saciedade após exercícios moderados</li>
        <li>Melhora a sensibilidade à insulina, estabilizando os níveis de açúcar no sangue</li>
        <li>Diminui o cortisol quando praticado na intensidade adequada</li>
        <li>Aumenta a sensibilidade aos sinais naturais de fome e saciedade do corpo</li>
      </ul>
      
      <h3>Encontre Seu Movimento Ideal</h3>
      <p>Nem todo movimento tem o mesmo efeito na fome. Encontre o que funciona melhor para você:</p>
      <ol>
        <li><strong>Para reduzir o apetite:</strong> Exercícios moderados como caminhada rápida, natação leve, yoga</li>
        <li><strong>Para gestão de estresse:</strong> Yoga, tai chi, pilates, alongamentos profundos</li>
        <li><strong>Para melhorar sensibilidade à insulina:</strong> Combinação de exercícios aeróbicos e de força</li>
      </ol>
      <p>Atenção: Exercícios muito intensos podem aumentar a fome em algumas pessoas. Observe como seu corpo responde.</p>
      
      <h3>Movimento no Dia a Dia</h3>
      <p>Não é preciso academia para aproveitar os benefícios do movimento:</p>
      <ul>
        <li>Caminhadas curtas após as refeições (apenas 10 minutos já ajudam na digestão)</li>
        <li>Pausas a cada hora para esticar-se por 2 minutos</li>
        <li>Subir escadas em vez de usar o elevador</li>
        <li>Dançar enquanto faz tarefas domésticas</li>
        <li>"Reuniões caminhadas" em vez de sentadas</li>
      </ul>
      
      <p>Complete os exercícios abaixo para incorporar movimento regulador à sua rotina!</p>
    `,
    exercises: [
      {
        id: 601,
        title: "Caminhada Digestiva",
        description: "Use caminhadas curtas para melhorar a digestão",
        type: "challenge",
        xp_reward: 15,
        content: "Por 3 dias, faça uma caminhada leve de 10 minutos após o almoço ou jantar. Observe como se sente em relação à digestão e saciedade."
      },
      {
        id: 602,
        title: "Experimento de Intensidade",
        description: "Descubra como diferentes intensidades afetam sua fome",
        type: "diary",
        xp_reward: 20,
        content: "Experimente 3 tipos de atividade (leve, moderada, intensa) em dias diferentes. Registre como cada uma afetou seu apetite nas horas seguintes."
      },
      {
        id: 603,
        title: "Micro-Movimentos",
        description: "Incorpore pequenos momentos de movimento ao dia",
        type: "form",
        xp_reward: 15,
        content: "Crie uma lista de 5 'micro-movimentos' de 2-3 minutos que você pode fazer durante o dia e implemente-os."
      }
    ]
  },
  {
    id: 7,
    title: "Integração",
    description: "Unindo todas as estratégias para resultados duradouros",
    xp_reward: 50,
    content: `
      <h2>Integração: Construindo sua Estratégia Personalizada</h2>
      <p>Chegamos ao passo final! Agora é hora de integrar todas as ferramentas que você aprendeu em uma estratégia personalizada e sustentável.</p>
      
      <h3>Criando Sua Rotina Pessoal</h3>
      <p>Uma abordagem eficaz para controlar a fome combina todos os elementos que exploramos:</p>
      <ul>
        <li><strong>Consciência:</strong> Identificação de gatilhos e padrões emocionais</li>
        <li><strong>Nutrição:</strong> Alimentos que promovem saciedade natural</li>
        <li><strong>Mindful Eating:</strong> Alimentação com atenção plena</li>
        <li><strong>Hidratação:</strong> Água suficiente ao longo do dia</li>
        <li><strong>Gestão de Estresse:</strong> Técnicas para momentos difíceis</li>
        <li><strong>Movimento:</strong> Atividade física adequada ao seu perfil</li>
      </ul>
      
      <h3>Plano para Recaídas</h3>
      <p>Recaídas fazem parte do processo. O importante é como você responde a elas:</p>
      <ol>
        <li>Reconheça a recaída sem julgamento</li>
        <li>Identifique o que a desencadeou</li>
        <li>Retorne ao plano na próxima refeição (não amanhã ou na próxima semana)</li>
        <li>Reveja quais ferramentas podem ajudar especificamente nessa situação</li>
        <li>Ajuste seu plano se necessário</li>
      </ol>
      
      <h3>Celebre Suas Vitórias</h3>
      <p>Reconheça seu progresso e celebre conquistas além da balança:</p>
      <ul>
        <li>Mais energia ao longo do dia</li>
        <li>Melhor qualidade de sono</li>
        <li>Menos episódios de fome descontrolada</li>
        <li>Relação mais pacífica com a comida</li>
        <li>Escolhas alimentares intuitivas e não restritivas</li>
      </ul>
      
      <p>Complete os exercícios abaixo para integrar tudo o que aprendeu!</p>
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
