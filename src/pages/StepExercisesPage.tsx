
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { MainNav } from '@/components/MainNav';
import { Button } from '@/components/ui/button';
import { ChevronLeft, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { DiagnosticForm } from '@/components/exercises/DiagnosticForm';
import { StopTimer } from '@/components/exercises/StopTimer';
import { ThoughtReprogramming } from '@/components/exercises/ThoughtReprogramming';
import { QuizExercise } from '@/components/exercises/QuizExercise';
import { ChallengeExercise } from '@/components/exercises/ChallengeExercise';
import { DiaryExercise } from '@/components/exercises/DiaryExercise';
import { toast } from '@/components/ui/sonner';

const StepExercisesPage = () => {
  const { stepId } = useParams<{ stepId: string }>();
  const [loading, setLoading] = useState(true);
  const { state, isExerciseCompleted, areAllExercisesCompleted, completeExercise } = useApp();
  const { steps, currentUser } = state;
  const navigate = useNavigate();
  
  const stepIndex = Number(stepId) - 1;
  const step = steps[stepIndex];
  
  // Ensure step is valid and accessible
  useEffect(() => {
    if (!step) {
      navigate('/');
      return;
    }
    
    if (currentUser && Number(stepId) > currentUser.current_step) {
      navigate(`/passo/${currentUser.current_step}`);
      return;
    }
    
    setLoading(false);
  }, [step, stepId, currentUser, navigate]);
  
  const handleExerciseComplete = (exerciseId: number) => {
    completeExercise(Number(stepId), exerciseId);
  };
  
  const allExercisesCompleted = step?.exercises && step.exercises.length > 0 && 
    areAllExercisesCompleted(Number(stepId));
  
  const handleFinishExercises = () => {
    // Here we would typically save progress to the backend
    // For now, just navigate back with a success message
    toast.success('Exercícios concluídos com sucesso!');
    navigate(`/passo/${stepId}`);
  };
  
  const renderExerciseContent = (exercise: any) => {
    const exerciseCompleted = isExerciseCompleted(Number(stepId), exercise.id);
    
    if (exerciseCompleted) {
      return (
        <div className="p-4 text-center">
          <p className="text-brand-600 dark:text-brand-300 font-medium">Exercício concluído! ✅</p>
          <p className="text-sm text-muted-foreground mt-1 dark:text-white/70">
            Você ganhou {exercise.xp_reward} XP com este exercício.
          </p>
        </div>
      );
    }
    
    switch (exercise.id) {
      // Step 1 Exercises
      case 101:
        return <DiagnosticForm onComplete={() => handleExerciseComplete(exercise.id)} />;
      case 102:
        return <StopTimer onComplete={() => handleExerciseComplete(exercise.id)} />;
      case 103:
        return <ThoughtReprogramming onComplete={() => handleExerciseComplete(exercise.id)} />;
      
      // Step 2 Exercises
      case 201:
        return (
          <QuizExercise
            question="Quais destes alimentos são ricos em inulina?"
            options={[
              { id: 'option1', text: 'Raiz de chicória', isCorrect: true },
              { id: 'option2', text: 'Banana verde', isCorrect: true },
              { id: 'option3', text: 'Alho', isCorrect: true },
              { id: 'option4', text: 'Cebola', isCorrect: true },
              { id: 'option5', text: 'Arroz branco', isCorrect: false },
              { id: 'option6', text: 'Yacon', isCorrect: true }
            ]}
            explanation="A inulina é encontrada em maior quantidade na raiz de chicória, yacon, alho, cebola e banana verde. O arroz branco não é uma fonte significativa de inulina."
            onComplete={() => handleExerciseComplete(exercise.id)}
          />
        );
      case 202:
        return (
          <ChallengeExercise
            title="Prepare sua primeira água de inulina"
            description="Siga os passos abaixo para preparar e consumir sua água de inulina:"
            steps={[
              "Separe 1 colher de chá de inulina em pó (aproximadamente 3g)",
              "Adicione em 1 copo de água (200ml)",
              "Adicione suco de meio limão (opcional)",
              "Misture bem até dissolver completamente",
              "Consuma em jejum, preferencialmente pela manhã",
              "Observe como você se sente ao longo do dia"
            ]}
            onComplete={() => handleExerciseComplete(exercise.id)}
          />
        );
      case 203:
        return (
          <DiaryExercise
            title="Diário da Inulina"
            description="Registre sua experiência com o consumo de inulina por 3 dias consecutivos"
            promptQuestions={[
              "Você sentiu menos fome durante o dia?",
              "Percebeu alguma mudança na digestão?",
              "Quanto tempo a sensação de saciedade permaneceu?",
              "Houve outros efeitos que você notou?"
            ]}
            daysRequired={3}
            onComplete={() => handleExerciseComplete(exercise.id)}
          />
        );
      
      // Step 3 Exercises
      case 301:
        return (
          <ChallengeExercise
            title="O Segredo da Espirulina"
            description="Aprenda sobre este superalimento que controla sua fome"
            steps={[
              "Leia sobre os benefícios da espirulina para controlar a fome",
              "Entenda como a espirulina atua nos hormônios da fome",
              "Conheça as formas disponíveis de espirulina",
              "Saiba como incorporar a espirulina na sua rotina",
              "Aprenda sobre os benefícios adicionais da espirulina"
            ]}
            onComplete={() => handleExerciseComplete(exercise.id)}
          />
        );
      case 302:
        return (
          <DiaryExercise
            title="Experiência com Espirulina"
            description="Registre sua experiência com o consumo de espirulina"
            promptQuestions={[
              "Como você se sentiu após consumir espirulina?",
              "Notou redução na fome ao longo do dia?",
              "Sentiu diferença nos níveis de energia?",
              "Teve algum efeito colateral?"
            ]}
            daysRequired={2}
            onComplete={() => handleExerciseComplete(exercise.id)}
          />
        );
      
      // Step 4 Exercises
      case 401:
        return (
          <ChallengeExercise
            title="Combinações Poderosas"
            description="Aprenda a combinar Inulina e Espirulina nas suas refeições"
            steps={[
              "Entenda o princípio do prato equilibrado",
              "Conheça combinações ideais para café da manhã",
              "Aprenda receitas rápidas para lanches emergenciais",
              "Descubra combinações para o jantar",
              "Experimente pelo menos uma receita com inulina e espirulina"
            ]}
            onComplete={() => handleExerciseComplete(exercise.id)}
          />
        );
      case 402:
        return (
          <DiaryExercise
            title="Diário de Combinações"
            description="Registre suas experiências com as combinações de inulina e espirulina"
            promptQuestions={[
              "Qual combinação você experimentou?",
              "Como foi a preparação?",
              "Como se sentiu em relação à fome após consumir?",
              "Sentiu diferença em relação ao consumo isolado de inulina ou espirulina?"
            ]}
            daysRequired={2}
            onComplete={() => handleExerciseComplete(exercise.id)}
          />
        );
      
      default:
        return (
          <ChallengeExercise
            title={exercise.title}
            description={exercise.description}
            steps={["Leia o conteúdo do exercício", "Pratique as dicas apresentadas", "Registre sua experiência"]}
            onComplete={() => handleExerciseComplete(exercise.id)}
          />
        );
    }
  };
  
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <MainNav />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-brand-500">Carregando...</div>
        </div>
      </div>
    );
  }
  
  if (!step) {
    return (
      <div className="flex flex-col min-h-screen">
        <MainNav />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-brand-700 mb-4">Passo não encontrado</h1>
            <Button onClick={() => navigate('/')}>Voltar para o Dashboard</Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <MainNav />
      <div className="container py-8 flex-1">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            className="gap-2 text-brand-600 hover:text-brand-700 hover:bg-brand-50 -ml-2"
            onClick={() => navigate(`/passo/${stepId}`)}
          >
            <ChevronLeft size={16} />
            <span>Voltar para o Passo {stepId}</span>
          </Button>
        </div>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-600 to-brand-800 bg-clip-text text-transparent">
            Exercícios Práticos: {step.exercises[0]?.title}
          </h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Complete todos os exercícios abaixo para fixar o conteúdo e avançar na sua jornada.
          </p>
        </div>
        
        <div className="w-full max-w-3xl mx-auto mb-20">
          <div className="space-y-8">
            {step.exercises.map((exercise) => (
              <Card 
                key={exercise.id}
                className={`border-${isExerciseCompleted(Number(stepId), exercise.id) ? 'brand-200 dark:border-brand-500' : 'gray-200 dark:border-brand-700'} overflow-hidden transition-all duration-300 hover:shadow-md`}
              >
                <CardHeader className={`pb-2 ${isExerciseCompleted(Number(stepId), exercise.id) ? 'bg-brand-50 dark:bg-brand-700/50' : ''}`}>
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      {isExerciseCompleted(Number(stepId), exercise.id) && (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                      <div>
                        <CardTitle className={`text-lg ${isExerciseCompleted(Number(stepId), exercise.id) ? 'text-brand-700 dark:text-brand-300' : 'dark:text-white'}`}>
                          {exercise.title}
                        </CardTitle>
                        <CardDescription className="dark:text-white/70">
                          {exercise.description}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge 
                      variant={isExerciseCompleted(Number(stepId), exercise.id) ? "outline" : "secondary"} 
                      className={isExerciseCompleted(Number(stepId), exercise.id) ? "bg-brand-100 dark:bg-brand-700 dark:text-white" : "dark:bg-brand-600 dark:text-white"}
                    >
                      +{exercise.xp_reward} XP
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className={isExerciseCompleted(Number(stepId), exercise.id) ? "opacity-70" : ""}>
                  {renderExerciseContent(exercise)}
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Separator className="my-12 dark:bg-brand-700" />
          
          <div className="flex justify-center">
            <Button 
              onClick={handleFinishExercises}
              disabled={!allExercisesCompleted}
              className={`
                ${!allExercisesCompleted 
                  ? 'bg-gray-300 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-700 cursor-not-allowed' 
                  : 'bg-brand-500 hover:bg-brand-600 dark:bg-brand-400 dark:hover:bg-brand-300 dark:text-brand-900 animate-pulse'
                }
                px-8 py-6 text-lg font-medium transition-all duration-300 transform hover:scale-105
              `}
              size="lg"
            >
              {allExercisesCompleted ? 'Concluir Exercícios' : 'Complete todos os exercícios'}
            </Button>
          </div>
          
          {!allExercisesCompleted && (
            <div className="text-center text-sm text-muted-foreground dark:text-white/70 mt-4">
              Complete todos os exercícios para marcar esta etapa como concluída.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepExercisesPage;
