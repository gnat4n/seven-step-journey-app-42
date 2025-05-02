
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { JourneyStep, Exercise } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DiagnosticForm } from './exercises/DiagnosticForm';
import { StopTimer } from './exercises/StopTimer';
import { ThoughtReprogramming } from './exercises/ThoughtReprogramming';
import { QuizExercise } from './exercises/QuizExercise';
import { ChallengeExercise } from './exercises/ChallengeExercise';
import { DiaryExercise } from './exercises/DiaryExercise';
import { FormExercise } from './exercises/FormExercise';
import { DragDropExercise } from './exercises/DragDropExercise';
import { toast } from '@/components/ui/sonner';
import { CheckCircle, LockKeyhole, ArrowRight, BookOpen } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

type StepContentProps = {
  step: JourneyStep;
  onComplete: () => void;
  stepCompleted: boolean;
};

export const StepContent: React.FC<StepContentProps> = ({ 
  step, 
  onComplete,
  stepCompleted
}) => {
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);
  const [completedCards, setCompletedCards] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { state } = useApp();
  const navigate = useNavigate();
  
  // Use useEffect to initialize completedExercises with exercises that are completed
  useEffect(() => {
    if (stepCompleted) {
      // If the step is completed, mark all exercises as completed
      setCompletedExercises(step.exercises.map(ex => ex.id));
      setCompletedCards(['content', 'exercises']);
    }
  }, [step, stepCompleted]);
  
  const renderHtml = (html: string) => {
    return { __html: html };
  };

  const handleExerciseComplete = (exerciseId: number) => {
    if (!completedExercises.includes(exerciseId)) {
      setCompletedExercises(prev => [...prev, exerciseId]);
    }
  };

  const handleCardComplete = (cardId: string) => {
    if (!completedCards.includes(cardId)) {
      setCompletedCards(prev => [...prev, cardId]);
      toast.success(`Conteúdo concluído!`);
    }
  };

  const allExercisesCompleted = step.exercises.length > 0 && 
    step.exercises.every(ex => completedExercises.includes(ex.id));

  const allCardsCompleted = completedCards.includes('content') && completedCards.includes('exercises');

  const handleStepComplete = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      onComplete();
      setIsSubmitting(false);
      toast.success(`Passo ${step.id} concluído! Continue sua jornada.`);
    }, 800);
  };
  
  const handleNextStep = () => {
    if (state.steps.length > step.id) {
      navigate(`/passo/${step.id + 1}`);
    }
  };

  const renderExercise = (exercise: Exercise) => {
    let ExerciseComponent;
    const isCompleted = completedExercises.includes(exercise.id);

    // Map exercise types to components based on step ID
    switch (exercise.type) {
      case 'form':
        if (step.id === 1 && exercise.id === 101) {
          ExerciseComponent = DiagnosticForm;
        } else if (step.id === 1 && exercise.id === 103) {
          ExerciseComponent = ThoughtReprogramming;
        } else {
          ExerciseComponent = FormExercise;
          return (
            <FormExercise
              title={exercise.title}
              description={exercise.description}
              fields={[
                { id: 'field1', label: 'Resposta 1', type: 'textarea', required: true, placeholder: 'Digite sua resposta...' },
                { id: 'field2', label: 'Resposta 2', type: 'textarea', required: false, placeholder: 'Complemento (opcional)...' }
              ]}
              onComplete={() => handleExerciseComplete(exercise.id)}
            />
          );
        }
        break;
      case 'challenge':
        if (step.id === 1 && exercise.id === 102) {
          ExerciseComponent = StopTimer;
        } else {
          return (
            <ChallengeExercise
              title={exercise.title}
              description={exercise.description}
              steps={exercise.content.split('.').filter(step => step.trim() !== '').map(step => step.trim())}
              onComplete={() => handleExerciseComplete(exercise.id)}
            />
          );
        }
        break;
      case 'quiz':
        return (
          <QuizExercise
            question={exercise.title}
            options={[
              { id: 'option1', text: 'Chicória', isCorrect: true },
              { id: 'option2', text: 'Banana Verde', isCorrect: true },
              { id: 'option3', text: 'Alho', isCorrect: true },
              { id: 'option4', text: 'Cebola', isCorrect: true },
              { id: 'option5', text: 'Yacon', isCorrect: true }
            ]}
            explanation="Todos estes alimentos são boas fontes de inulina, uma fibra solúvel que ajuda a prolongar a sensação de saciedade."
            onComplete={() => handleExerciseComplete(exercise.id)}
          />
        );
      case 'diary':
        return (
          <DiaryExercise
            title={exercise.title}
            description={exercise.description}
            promptQuestions={[
              'Como você se sentiu após aplicar a técnica?',
              'Notou diferença na sua fome?',
              'O que você aprendeu sobre seus padrões alimentares?'
            ]}
            daysRequired={3}
            onComplete={() => handleExerciseComplete(exercise.id)}
          />
        );
      case 'dragdrop':
        return (
          <DragDropExercise
            title={exercise.title}
            description={exercise.description}
            items={[
              { id: '1', content: 'Brócolis' },
              { id: '2', content: 'Frango' },
              { id: '3', content: 'Arroz Integral' },
              { id: '4', content: 'Azeite' },
              { id: '5', content: 'Espinafre' },
              { id: '6', content: 'Atum' },
              { id: '7', content: 'Quinoa' },
              { id: '8', content: 'Abacate' }
            ]}
            dropZones={[
              { id: 'vegetais', label: 'Vegetais (1/2 do prato)', items: [], maxItems: 2 },
              { id: 'proteinas', label: 'Proteínas (1/4 do prato)', items: [], maxItems: 2 },
              { id: 'carboidratos', label: 'Carboidratos (1/4 do prato)', items: [], maxItems: 2 },
              { id: 'gorduras', label: 'Gorduras Saudáveis', items: [], maxItems: 2 }
            ]}
            checkSolution={(zones) => {
              // Example validation logic
              const vegetais = zones.find(z => z.id === 'vegetais')?.items || [];
              const proteinas = zones.find(z => z.id === 'proteinas')?.items || [];
              const carboidratos = zones.find(z => z.id === 'carboidratos')?.items || [];
              const gorduras = zones.find(z => z.id === 'gorduras')?.items || [];
              
              return vegetais.length === 2 && proteinas.length === 2 && 
                     carboidratos.length === 2 && gorduras.length === 2;
            }}
            onComplete={() => handleExerciseComplete(exercise.id)}
          />
        );
      default:
        return null;
    }

    return (
      ExerciseComponent ? (
        <ExerciseComponent onComplete={() => handleExerciseComplete(exercise.id)} />
      ) : null
    );
  };

  // Content for Step 1 Mental Detox
  const mentalDetoxContent = `
<h2>PASSO 1: DESINTOXICAÇÃO MENTAL</h2>

<h3>QUEBRANDO O CICLO MENTAL DA FOME EMOCIONAL</h3>
<p>Grande parte da nossa fome não tem nada a ver com necessidades nutricionais, mas sim com gatilhos
emocionais. Antes de falarmos de alimentos e nutrientes, precisamos "limpar" nossa mente.</p>

<h3>IDENTIFICANDO SEUS GATILHOS</h3>
<p>Na maioria das vezes, comemos por emoção sem nem perceber. Vamos identificar seus principais
gatilhos:</p>
<ul>
  <li><strong>Estresse:</strong> "Dia difícil no trabalho? Mereço aquele chocolate!"</li>
  <li><strong>Tédio:</strong> "Não tenho nada para fazer... o que tem na geladeira?"</li>
  <li><strong>Tristeza:</strong> "Estou chateada... um sorvete vai me fazer sentir melhor."</li>
  <li><strong>Ansiedade:</strong> "Tenho uma reunião importante amanhã... preciso de algo para roer."</li>
  <li><strong>Cansaço:</strong> "Estou exausta... um docinho vai me dar energia."</li>
</ul>

<h3>TÉCNICA DO STOP</h3>
<p>Quando sentir vontade de comer sem estar realmente com fome, pratique a técnica STOP:</p>
<ul>
  <li><strong>S</strong> - Pare (Stop) o que estiver fazendo</li>
  <li><strong>T</strong> - Respire (Take a breath) profundamente 3 vezes</li>
  <li><strong>O</strong> - Observe o que está sentindo (sem julgamento)</li>
  <li><strong>P</strong> - Prossiga de forma consciente (decida se realmente quer comer)</li>
</ul>
<p>Este intervalo de apenas 30 segundos pode ser suficiente para quebrar o piloto automático que nos
leva à geladeira sem pensar.</p>

<h3>REPROGRAMANDO PENSAMENTOS AUTOMÁTICOS</h3>
<p>Nosso cérebro está cheio de pensamentos automáticos sobre comida que aceitamos como verdade,
mas são apenas hábitos mentais:</p>
<ul>
  <li><strong>Pensamento antigo:</strong> "Preciso limpar o prato."<br>
  <strong>Reprogramação:</strong> "Posso parar quando me sentir satisfeita."</li>
  
  <li><strong>Pensamento antigo:</strong> "Mereço esse doce após um dia difícil."<br>
  <strong>Reprogramação:</strong> "Mereço me sentir bem e energizada, não pesada e culpada."</li>
  
  <li><strong>Pensamento antigo:</strong> "Uma vez que comecei, não consigo parar."<br>
  <strong>Reprogramação:</strong> "Cada mordida é uma nova escolha. Posso parar quando quiser."</li>
</ul>

<h3>MINDFULNESS NA ALIMENTAÇÃO</h3>
<p>Estudos científicos comprovam que a alimentação consciente reduz significativamente episódios de compulsão. Isso significa:</p>
<ul>
  <li>Comer sem distrações (TV, celular, computador)</li>
  <li>Mastigar lentamente, saboreando cada garfada</li>
  <li>Perceber quando está satisfeita (não necessariamente cheia)</li>
</ul>

<p><strong>DESAFIO DE 7 DIAS:</strong> Escolha pelo menos uma refeição por dia para praticar a alimentação consciente.
Sente-se à mesa, sem distrações, e dedique pelo menos 15 minutos àquela refeição.</p>
<p><strong>LEMBRE-SE:</strong> Pensamentos não são fatos. Quando vier aquele pensamento "Não vou aguentar ficar sem
comer", observe-o como apenas um pensamento, não uma verdade absoluta.</p>
  `;

  if (step.id === 1) {
    return (
      <div className="w-full max-w-3xl mx-auto mb-20">
        <div className="mb-8">
          <h3 className="text-xl font-medium text-brand-700 dark:text-brand-300 mb-6">
            Conteúdo do Passo
          </h3>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Card 1: Desintoxicação Mental */}
            <Card className={`overflow-hidden transition-all duration-300 hover:shadow-md border-${completedCards.includes('content') ? 'brand-200 dark:border-brand-500' : 'gray-200 dark:border-brand-700'}`}>
              <CardHeader className={`pb-2 ${completedCards.includes('content') ? 'bg-brand-50 dark:bg-brand-700/50' : ''}`}>
                <div className="flex justify-between">
                  <div className="flex items-start gap-2">
                    <div className="mt-1">
                      <BookOpen className="h-5 w-5 text-brand-500 dark:text-brand-300" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Desintoxicação Mental</CardTitle>
                      <CardDescription>Aprenda como quebrar o ciclo mental da fome emocional</CardDescription>
                    </div>
                  </div>
                  <Badge variant={completedCards.includes('content') ? "outline" : "secondary"} 
                    className={completedCards.includes('content') ? "bg-brand-100 dark:bg-brand-700 dark:text-white" : "dark:bg-brand-600 dark:text-white"}>
                    {completedCards.includes('content') ? 'Concluído' : 'Pendente'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <div className="text-sm text-muted-foreground mb-2">
                      Conteúdo sobre identificação de gatilhos emocionais e técnicas para controlar a fome emocional...
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="text-sm">
                      Aprenda a reconhecer quando sua fome é física ou emocional, e descubra técnicas para quebrar o ciclo da compulsão alimentar.
                    </div>
                  </HoverCardContent>
                </HoverCard>
                <Button 
                  onClick={() => {
                    const modal = document.createElement('div');
                    modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4';
                    modal.innerHTML = `
                      <div class="bg-white dark:bg-brand-800 rounded-lg shadow-lg w-full max-w-4xl max-h-[80vh] overflow-auto">
                        <div class="p-6">
                          <div class="flex justify-between items-center mb-4">
                            <h2 class="text-2xl font-bold text-brand-700 dark:text-brand-300">Desintoxicação Mental</h2>
                            <button class="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white">
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                          <div class="prose prose-brand dark:prose-invert max-w-none">
                            ${mentalDetoxContent}
                          </div>
                          <div class="mt-6 flex justify-end">
                            <button class="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-md">
                              Marcar como Concluído
                            </button>
                          </div>
                        </div>
                      </div>
                    `;
                    
                    document.body.appendChild(modal);
                    
                    // Close button handler
                    const closeButton = modal.querySelector('button');
                    closeButton?.addEventListener('click', () => {
                      document.body.removeChild(modal);
                    });
                    
                    // Complete button handler
                    const completeButton = modal.querySelectorAll('button')[1];
                    completeButton?.addEventListener('click', () => {
                      handleCardComplete('content');
                      document.body.removeChild(modal);
                    });
                  }}
                  className="w-full"
                  variant={completedCards.includes('content') ? "outline" : "default"}
                >
                  {completedCards.includes('content') ? 'Revisar Conteúdo' : 'Ler Conteúdo'}
                </Button>
              </CardContent>
            </Card>
            
            {/* Card 2: Exercícios Práticos */}
            <Card className={`overflow-hidden transition-all duration-300 hover:shadow-md border-${completedCards.includes('exercises') ? 'brand-200 dark:border-brand-500' : 'gray-200 dark:border-brand-700'}`}>
              <CardHeader className={`pb-2 ${completedCards.includes('exercises') ? 'bg-brand-50 dark:bg-brand-700/50' : ''}`}>
                <div className="flex justify-between">
                  <div className="flex items-start gap-2">
                    <div className="mt-1">
                      <BookOpen className="h-5 w-5 text-brand-500 dark:text-brand-300" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Exercícios Práticos</CardTitle>
                      <CardDescription>Fixe o conteúdo através de atividades práticas</CardDescription>
                    </div>
                  </div>
                  <Badge variant={completedCards.includes('exercises') ? "outline" : "secondary"} 
                    className={completedCards.includes('exercises') ? "bg-brand-100 dark:bg-brand-700 dark:text-white" : "dark:bg-brand-600 dark:text-white"}>
                    {completedCards.includes('exercises') ? 'Concluído' : 'Pendente'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <div className="text-sm text-muted-foreground mb-2">
                      Exercícios sobre Mapa Mental da Fome, Técnica STOP e Reprogramação de Pensamentos...
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="text-sm">
                      Atividades práticas que ajudarão você a aplicar as técnicas aprendidas no seu dia a dia, identificando gatilhos e criando novas respostas.
                    </div>
                  </HoverCardContent>
                </HoverCard>
                <Button 
                  onClick={() => navigate('/passo/1/exercicios')}
                  className="w-full"
                  variant={completedCards.includes('exercises') ? "outline" : "default"}
                >
                  {completedCards.includes('exercises') ? 'Revisar Exercícios' : 'Fazer Exercícios'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <Separator className="my-8 dark:bg-brand-700" />
        
        <div className="flex justify-center gap-4 mb-8">
          {!stepCompleted ? (
            <Button 
              onClick={handleStepComplete} 
              disabled={!allCardsCompleted || isSubmitting}
              className={`
                ${!allCardsCompleted 
                  ? 'bg-gray-300 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-700 cursor-not-allowed' 
                  : 'bg-brand-500 hover:bg-brand-600 dark:bg-brand-400 dark:hover:bg-brand-300 dark:text-brand-900 animate-pulse'
                }
                px-8 py-6 text-lg font-medium transition-all duration-300 transform hover:scale-105
              `}
              size="lg"
            >
              {isSubmitting ? 'Concluindo...' : 'Concluir Passo'}
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                size="lg"
                className="border-brand-200 hover:bg-brand-50 dark:border-brand-500 dark:hover:bg-brand-700 px-8 py-6"
              >
                Rever este passo
              </Button>
              
              <Button 
                onClick={handleNextStep}
                className="bg-brand-500 hover:bg-brand-600 dark:bg-brand-400 dark:hover:bg-brand-300 dark:text-brand-900 px-8 py-6 text-lg font-medium transition-all duration-300 transform hover:scale-105 gap-2"
                size="lg"
              >
                Próximo Passo <ArrowRight className="h-5 w-5" />
              </Button>
            </>
          )}
        </div>
        
        {!allCardsCompleted && !stepCompleted && (
          <div className="text-center text-sm text-muted-foreground dark:text-white/70">
            Complete o conteúdo e os exercícios para desbloquear o próximo passo da sua jornada.
          </div>
        )}
      </div>
    );
  }

  // For other steps, use the original code
  return (
    <div className="w-full max-w-3xl mx-auto mb-20">
      <ScrollArea className="prose prose-brand max-w-none mb-8 max-h-[500px] overflow-auto pr-4 dark:prose-invert">
        <div 
          className="p-6 bg-white dark:bg-brand-800/60 rounded-lg shadow-sm border border-brand-100 dark:border-brand-700 transition-all duration-300"
          dangerouslySetInnerHTML={renderHtml(step.content)} 
        />
      </ScrollArea>
      
      <Separator className="my-8 dark:bg-brand-700" />
      
      <div className="mb-8">
        <h3 className="text-xl font-medium text-brand-700 dark:text-brand-300 mb-6 flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-700 text-brand-700 dark:text-brand-300 flex items-center justify-center text-sm font-bold">
            {step.exercises.length}
          </span>
          Exercícios Práticos
        </h3>
        <div className="space-y-6">
          {step.exercises.map(exercise => (
            <div key={exercise.id} className="mb-6 animate-fade-in">
              <Card className={`border-${completedExercises.includes(exercise.id) ? 'brand-200 dark:border-brand-500' : 'gray-200 dark:border-brand-700'} overflow-hidden transition-all duration-300 hover:shadow-md`}>
                <CardHeader className={`pb-2 ${completedExercises.includes(exercise.id) ? 'bg-brand-50 dark:bg-brand-700/50' : ''}`}>
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      {completedExercises.includes(exercise.id) && (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                      <div>
                        <CardTitle className={`text-lg ${completedExercises.includes(exercise.id) ? 'text-brand-700 dark:text-brand-300' : 'dark:text-white'}`}>
                          {exercise.title}
                        </CardTitle>
                        <CardDescription className="dark:text-white/70">{exercise.description}</CardDescription>
                      </div>
                    </div>
                    <Badge variant={completedExercises.includes(exercise.id) ? "outline" : "secondary"} className={completedExercises.includes(exercise.id) ? "bg-brand-100 dark:bg-brand-700 dark:text-white" : "dark:bg-brand-600 dark:text-white"}>
                      +{exercise.xp_reward} XP
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className={completedExercises.includes(exercise.id) ? "opacity-70" : ""}>
                  {completedExercises.includes(exercise.id) ? (
                    <div className="p-4 text-center">
                      <p className="text-brand-600 dark:text-brand-300 font-medium">Exercício concluído! ✅</p>
                      <p className="text-sm text-muted-foreground mt-1 dark:text-white/70">
                        Você ganhou {exercise.xp_reward} XP com este exercício.
                      </p>
                    </div>
                  ) : renderExercise(exercise)}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-center gap-4 mb-8">
        {!stepCompleted ? (
          <Button 
            onClick={handleStepComplete} 
            disabled={!allExercisesCompleted || isSubmitting}
            className={`
              ${!allExercisesCompleted 
                ? 'bg-gray-300 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-700 cursor-not-allowed' 
                : 'bg-brand-500 hover:bg-brand-600 dark:bg-brand-400 dark:hover:bg-brand-300 dark:text-brand-900 animate-pulse'
              }
              px-8 py-6 text-lg font-medium transition-all duration-300 transform hover:scale-105
            `}
            size="lg"
          >
            {isSubmitting ? 'Concluindo...' : 'Concluir Passo'}
          </Button>
        ) : (
          <>
            <Button
              variant="outline"
              size="lg"
              className="border-brand-200 hover:bg-brand-50 dark:border-brand-500 dark:hover:bg-brand-700 px-8 py-6"
            >
              Rever este passo
            </Button>
            
            <Button 
              onClick={handleNextStep}
              className="bg-brand-500 hover:bg-brand-600 dark:bg-brand-400 dark:hover:bg-brand-300 dark:text-brand-900 px-8 py-6 text-lg font-medium transition-all duration-300 transform hover:scale-105 gap-2"
              size="lg"
            >
              Próximo Passo <ArrowRight className="h-5 w-5" />
            </Button>
          </>
        )}
      </div>
      
      {!allExercisesCompleted && !stepCompleted && (
        <div className="text-center text-sm text-muted-foreground dark:text-white/70">
          Complete todos os exercícios para desbloquear o próximo passo da sua jornada.
        </div>
      )}
    </div>
  );
};
