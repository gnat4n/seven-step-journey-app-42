
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
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const { state } = useApp();
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
    if (!completedExercises.includes(exerciseId)) {
      setCompletedExercises(prev => [...prev, exerciseId]);
      toast.success('Exercício concluído!');
    }
  };
  
  const allExercisesCompleted = step?.exercises && step.exercises.length > 0 && 
    step.exercises.every(ex => completedExercises.includes(ex.id));
  
  const handleFinishExercises = () => {
    // Here we would typically save progress to the backend
    // For now, just navigate back with a success message
    toast.success('Exercícios concluídos com sucesso!');
    navigate(`/passo/${stepId}`);
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
  
  // Only show exercises for steps 1 and 2
  if (Number(stepId) !== 1 && Number(stepId) !== 2) {
    navigate(`/passo/${stepId}`);
    return null;
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
            Exercícios Práticos: {Number(stepId) === 1 ? 'Desintoxicação Mental' : 'O Poder da Inulina'}
          </h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Complete todos os exercícios abaixo para fixar o conteúdo e avançar na sua jornada.
          </p>
        </div>
        
        <div className="w-full max-w-3xl mx-auto mb-20">
          <div className="space-y-8">
            {/* Step 1 Exercises */}
            {Number(stepId) === 1 && (
              <>
                {/* Exercise 1: Mapa Mental da Fome */}
                <Card className={`border-${completedExercises.includes(101) ? 'brand-200 dark:border-brand-500' : 'gray-200 dark:border-brand-700'} overflow-hidden transition-all duration-300 hover:shadow-md`}>
                  <CardHeader className={`pb-2 ${completedExercises.includes(101) ? 'bg-brand-50 dark:bg-brand-700/50' : ''}`}>
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        {completedExercises.includes(101) && (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        )}
                        <div>
                          <CardTitle className={`text-lg ${completedExercises.includes(101) ? 'text-brand-700 dark:text-brand-300' : 'dark:text-white'}`}>
                            Mapa Mental da Fome
                          </CardTitle>
                          <CardDescription className="dark:text-white/70">
                            Identifique seus principais gatilhos emocionais
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant={completedExercises.includes(101) ? "outline" : "secondary"} 
                        className={completedExercises.includes(101) ? "bg-brand-100 dark:bg-brand-700 dark:text-white" : "dark:bg-brand-600 dark:text-white"}>
                        +15 XP
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className={completedExercises.includes(101) ? "opacity-70" : ""}>
                    {completedExercises.includes(101) ? (
                      <div className="p-4 text-center">
                        <p className="text-brand-600 dark:text-brand-300 font-medium">Exercício concluído! ✅</p>
                        <p className="text-sm text-muted-foreground mt-1 dark:text-white/70">
                          Você ganhou 15 XP com este exercício.
                        </p>
                      </div>
                    ) : (
                      <DiagnosticForm onComplete={() => handleExerciseComplete(101)} />
                    )}
                  </CardContent>
                </Card>
                
                {/* Exercise 2: Técnica STOP */}
                <Card className={`border-${completedExercises.includes(102) ? 'brand-200 dark:border-brand-500' : 'gray-200 dark:border-brand-700'} overflow-hidden transition-all duration-300 hover:shadow-md`}>
                  <CardHeader className={`pb-2 ${completedExercises.includes(102) ? 'bg-brand-50 dark:bg-brand-700/50' : ''}`}>
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        {completedExercises.includes(102) && (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        )}
                        <div>
                          <CardTitle className={`text-lg ${completedExercises.includes(102) ? 'text-brand-700 dark:text-brand-300' : 'dark:text-white'}`}>
                            Técnica STOP
                          </CardTitle>
                          <CardDescription className="dark:text-white/70">
                            Aprenda a interromper comportamentos automáticos
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant={completedExercises.includes(102) ? "outline" : "secondary"} 
                        className={completedExercises.includes(102) ? "bg-brand-100 dark:bg-brand-700 dark:text-white" : "dark:bg-brand-600 dark:text-white"}>
                        +20 XP
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className={completedExercises.includes(102) ? "opacity-70" : ""}>
                    {completedExercises.includes(102) ? (
                      <div className="p-4 text-center">
                        <p className="text-brand-600 dark:text-brand-300 font-medium">Exercício concluído! ✅</p>
                        <p className="text-sm text-muted-foreground mt-1 dark:text-white/70">
                          Você ganhou 20 XP com este exercício.
                        </p>
                      </div>
                    ) : (
                      <StopTimer onComplete={() => handleExerciseComplete(102)} />
                    )}
                  </CardContent>
                </Card>
                
                {/* Exercise 3: Reprogramação de Pensamentos */}
                <Card className={`border-${completedExercises.includes(103) ? 'brand-200 dark:border-brand-500' : 'gray-200 dark:border-brand-700'} overflow-hidden transition-all duration-300 hover:shadow-md`}>
                  <CardHeader className={`pb-2 ${completedExercises.includes(103) ? 'bg-brand-50 dark:bg-brand-700/50' : ''}`}>
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        {completedExercises.includes(103) && (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        )}
                        <div>
                          <CardTitle className={`text-lg ${completedExercises.includes(103) ? 'text-brand-700 dark:text-brand-300' : 'dark:text-white'}`}>
                            Reprogramação de Pensamentos
                          </CardTitle>
                          <CardDescription className="dark:text-white/70">
                            Transforme pensamentos negativos sobre comida
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant={completedExercises.includes(103) ? "outline" : "secondary"} 
                        className={completedExercises.includes(103) ? "bg-brand-100 dark:bg-brand-700 dark:text-white" : "dark:bg-brand-600 dark:text-white"}>
                        +15 XP
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className={completedExercises.includes(103) ? "opacity-70" : ""}>
                    {completedExercises.includes(103) ? (
                      <div className="p-4 text-center">
                        <p className="text-brand-600 dark:text-brand-300 font-medium">Exercício concluído! ✅</p>
                        <p className="text-sm text-muted-foreground mt-1 dark:text-white/70">
                          Você ganhou 15 XP com este exercício.
                        </p>
                      </div>
                    ) : (
                      <ThoughtReprogramming onComplete={() => handleExerciseComplete(103)} />
                    )}
                  </CardContent>
                </Card>
              </>
            )}
            
            {/* Step 2 Exercises */}
            {Number(stepId) === 2 && (
              <>
                {/* Exercise 1: Fontes de Inulina */}
                <Card className={`border-${completedExercises.includes(201) ? 'brand-200 dark:border-brand-500' : 'gray-200 dark:border-brand-700'} overflow-hidden transition-all duration-300 hover:shadow-md`}>
                  <CardHeader className={`pb-2 ${completedExercises.includes(201) ? 'bg-brand-50 dark:bg-brand-700/50' : ''}`}>
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        {completedExercises.includes(201) && (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        )}
                        <div>
                          <CardTitle className={`text-lg ${completedExercises.includes(201) ? 'text-brand-700 dark:text-brand-300' : 'dark:text-white'}`}>
                            Fontes de Inulina
                          </CardTitle>
                          <CardDescription className="dark:text-white/70">
                            Conheça os alimentos ricos em inulina
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant={completedExercises.includes(201) ? "outline" : "secondary"} 
                        className={completedExercises.includes(201) ? "bg-brand-100 dark:bg-brand-700 dark:text-white" : "dark:bg-brand-600 dark:text-white"}>
                        +15 XP
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className={completedExercises.includes(201) ? "opacity-70" : ""}>
                    {completedExercises.includes(201) ? (
                      <div className="p-4 text-center">
                        <p className="text-brand-600 dark:text-brand-300 font-medium">Exercício concluído! ✅</p>
                        <p className="text-sm text-muted-foreground mt-1 dark:text-white/70">
                          Você ganhou 15 XP com este exercício.
                        </p>
                      </div>
                    ) : (
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
                        onComplete={() => handleExerciseComplete(201)}
                      />
                    )}
                  </CardContent>
                </Card>
                
                {/* Exercise 2: Água de Inulina */}
                <Card className={`border-${completedExercises.includes(202) ? 'brand-200 dark:border-brand-500' : 'gray-200 dark:border-brand-700'} overflow-hidden transition-all duration-300 hover:shadow-md`}>
                  <CardHeader className={`pb-2 ${completedExercises.includes(202) ? 'bg-brand-50 dark:bg-brand-700/50' : ''}`}>
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        {completedExercises.includes(202) && (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        )}
                        <div>
                          <CardTitle className={`text-lg ${completedExercises.includes(202) ? 'text-brand-700 dark:text-brand-300' : 'dark:text-white'}`}>
                            Água de Inulina
                          </CardTitle>
                          <CardDescription className="dark:text-white/70">
                            Prepare sua primeira água de inulina
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant={completedExercises.includes(202) ? "outline" : "secondary"} 
                        className={completedExercises.includes(202) ? "bg-brand-100 dark:bg-brand-700 dark:text-white" : "dark:bg-brand-600 dark:text-white"}>
                        +20 XP
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className={completedExercises.includes(202) ? "opacity-70" : ""}>
                    {completedExercises.includes(202) ? (
                      <div className="p-4 text-center">
                        <p className="text-brand-600 dark:text-brand-300 font-medium">Exercício concluído! ✅</p>
                        <p className="text-sm text-muted-foreground mt-1 dark:text-white/70">
                          Você ganhou 20 XP com este exercício.
                        </p>
                      </div>
                    ) : (
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
                        onComplete={() => handleExerciseComplete(202)}
                      />
                    )}
                  </CardContent>
                </Card>
                
                {/* Exercise 3: Diário da Inulina */}
                <Card className={`border-${completedExercises.includes(203) ? 'brand-200 dark:border-brand-500' : 'gray-200 dark:border-brand-700'} overflow-hidden transition-all duration-300 hover:shadow-md`}>
                  <CardHeader className={`pb-2 ${completedExercises.includes(203) ? 'bg-brand-50 dark:bg-brand-700/50' : ''}`}>
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        {completedExercises.includes(203) && (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        )}
                        <div>
                          <CardTitle className={`text-lg ${completedExercises.includes(203) ? 'text-brand-700 dark:text-brand-300' : 'dark:text-white'}`}>
                            Diário da Inulina
                          </CardTitle>
                          <CardDescription className="dark:text-white/70">
                            Registre como se sente após usar inulina
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant={completedExercises.includes(203) ? "outline" : "secondary"} 
                        className={completedExercises.includes(203) ? "bg-brand-100 dark:bg-brand-700 dark:text-white" : "dark:bg-brand-600 dark:text-white"}>
                        +15 XP
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className={completedExercises.includes(203) ? "opacity-70" : ""}>
                    {completedExercises.includes(203) ? (
                      <div className="p-4 text-center">
                        <p className="text-brand-600 dark:text-brand-300 font-medium">Exercício concluído! ✅</p>
                        <p className="text-sm text-muted-foreground mt-1 dark:text-white/70">
                          Você ganhou 15 XP com este exercício.
                        </p>
                      </div>
                    ) : (
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
                        onComplete={() => handleExerciseComplete(203)}
                      />
                    )}
                  </CardContent>
                </Card>
              </>
            )}
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
