
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { MainNav } from '@/components/MainNav';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';
import { QuizExercise } from '@/components/exercises/QuizExercise';
import { toast } from '@/components/ui/sonner';

const ModuleExercisesPage = () => {
  const { stepId, moduleId } = useParams<{ stepId: string; moduleId: string }>();
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);
  const { state, completeModule, isModuleCompleted } = useApp();
  const navigate = useNavigate();
  
  const step = state.steps.find(s => s.id === Number(stepId));
  const module = step?.modules?.find(m => m.id === moduleId);
  
  if (!step || !module) {
    return (
      <div className="flex flex-col min-h-screen">
        <MainNav />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-brand-700 mb-4">Módulo não encontrado</h1>
            <Button onClick={() => navigate(`/passo/${stepId}`)}>Voltar para o Passo</Button>
          </div>
        </div>
      </div>
    );
  }
  
  const handleExerciseComplete = (exerciseId: number) => {
    if (!completedExercises.includes(exerciseId)) {
      setCompletedExercises(prev => [...prev, exerciseId]);
      toast.success('Exercício concluído!');
    }
  };
  
  const allExercisesCompleted = completedExercises.length >= 3;
  
  const handleFinishExercises = () => {
    if (!isModuleCompleted(module.id)) {
      completeModule(module.id);
    }
    navigate(`/passo/${stepId}`);
  };
  
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
            Exercícios Práticos: O Segredo da Espirulina
          </h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Complete todos os exercícios abaixo para fixar o conteúdo e avançar na sua jornada.
          </p>
        </div>
        
        <div className="w-full max-w-3xl mx-auto mb-20">
          <div className="space-y-8">
            {/* Exercício 1: Quiz sobre Espirulina */}
            <Card className={`border-${completedExercises.includes(301) ? 'brand-200 dark:border-brand-500' : 'gray-200 dark:border-brand-700'} overflow-hidden transition-all duration-300 hover:shadow-md`}>
              <CardHeader className={`pb-2 ${completedExercises.includes(301) ? 'bg-brand-50 dark:bg-brand-700/50' : ''}`}>
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    {completedExercises.includes(301) && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                    <div>
                      <CardTitle className={`text-lg ${completedExercises.includes(301) ? 'text-brand-700 dark:text-brand-300' : 'dark:text-white'}`}>
                        Conhecendo a Espirulina
                      </CardTitle>
                      <CardDescription className="dark:text-white/70">
                        Teste seu conhecimento sobre a espirulina
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant={completedExercises.includes(301) ? "outline" : "secondary"} 
                    className={completedExercises.includes(301) ? "bg-brand-100 dark:bg-brand-700 dark:text-white" : "dark:bg-brand-600 dark:text-white"}>
                    +15 XP
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className={completedExercises.includes(301) ? "opacity-70" : ""}>
                {completedExercises.includes(301) ? (
                  <div className="p-4 text-center">
                    <p className="text-brand-600 dark:text-brand-300 font-medium">Exercício concluído! ✅</p>
                    <p className="text-sm text-muted-foreground mt-1 dark:text-white/70">
                      Você ganhou 15 XP com este exercício.
                    </p>
                  </div>
                ) : (
                  <QuizExercise
                    question="Quais afirmações sobre a espirulina estão corretas?"
                    options={[
                      { id: 'option1', text: 'Contém aproximadamente 70% de proteína completa', isCorrect: true },
                      { id: 'option2', text: 'Não pode ser consumida por humanos', isCorrect: false },
                      { id: 'option3', text: 'Ajuda a estabilizar os níveis de açúcar no sangue', isCorrect: true },
                      { id: 'option4', text: 'É uma microalga azul-esverdeada', isCorrect: true },
                      { id: 'option5', text: 'Não contém vitaminas ou minerais', isCorrect: false },
                      { id: 'option6', text: 'Estimula a produção de hormônios de saciedade', isCorrect: true }
                    ]}
                    explanation="A espirulina é uma microalga rica em proteínas, vitaminas e minerais. Ela ajuda a controlar a fome por estabilizar os níveis de açúcar no sangue e estimular hormônios de saciedade."
                    onComplete={() => handleExerciseComplete(301)}
                  />
                )}
              </CardContent>
            </Card>
            
            {/* Exercício 2: Dosagem de Espirulina */}
            <Card className={`border-${completedExercises.includes(302) ? 'brand-200 dark:border-brand-500' : 'gray-200 dark:border-brand-700'} overflow-hidden transition-all duration-300 hover:shadow-md`}>
              <CardHeader className={`pb-2 ${completedExercises.includes(302) ? 'bg-brand-50 dark:bg-brand-700/50' : ''}`}>
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    {completedExercises.includes(302) && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                    <div>
                      <CardTitle className={`text-lg ${completedExercises.includes(302) ? 'text-brand-700 dark:text-brand-300' : 'dark:text-white'}`}>
                        Dosagem Correta
                      </CardTitle>
                      <CardDescription className="dark:text-white/70">
                        Aprenda sobre a dosagem adequada de espirulina
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant={completedExercises.includes(302) ? "outline" : "secondary"} 
                    className={completedExercises.includes(302) ? "bg-brand-100 dark:bg-brand-700 dark:text-white" : "dark:bg-brand-600 dark:text-white"}>
                    +10 XP
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className={completedExercises.includes(302) ? "opacity-70" : ""}>
                {completedExercises.includes(302) ? (
                  <div className="p-4 text-center">
                    <p className="text-brand-600 dark:text-brand-300 font-medium">Exercício concluído! ✅</p>
                    <p className="text-sm text-muted-foreground mt-1 dark:text-white/70">
                      Você ganhou 10 XP com este exercício.
                    </p>
                  </div>
                ) : (
                  <QuizExercise
                    question="Qual a dosagem diária recomendada de espirulina?"
                    options={[
                      { id: 'option1', text: '1 a 3 gramas por dia', isCorrect: true },
                      { id: 'option2', text: '10 a 20 gramas por dia', isCorrect: false },
                      { id: 'option3', text: '50 a 100 gramas por dia', isCorrect: false },
                      { id: 'option4', text: '0,1 a 0,5 gramas por dia', isCorrect: false }
                    ]}
                    explanation="A dosagem diária recomendada de espirulina é de 1 a 3 gramas por dia, começando com doses menores e aumentando gradualmente para evitar desconforto intestinal."
                    onComplete={() => handleExerciseComplete(302)}
                  />
                )}
              </CardContent>
            </Card>
            
            {/* Exercício 3: Combinação com Inulina */}
            <Card className={`border-${completedExercises.includes(303) ? 'brand-200 dark:border-brand-500' : 'gray-200 dark:border-brand-700'} overflow-hidden transition-all duration-300 hover:shadow-md`}>
              <CardHeader className={`pb-2 ${completedExercises.includes(303) ? 'bg-brand-50 dark:bg-brand-700/50' : ''}`}>
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    {completedExercises.includes(303) && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                    <div>
                      <CardTitle className={`text-lg ${completedExercises.includes(303) ? 'text-brand-700 dark:text-brand-300' : 'dark:text-white'}`}>
                        Combinação Poderosa
                      </CardTitle>
                      <CardDescription className="dark:text-white/70">
                        Entenda como combinar espirulina e inulina
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant={completedExercises.includes(303) ? "outline" : "secondary"} 
                    className={completedExercises.includes(303) ? "bg-brand-100 dark:bg-brand-700 dark:text-white" : "dark:bg-brand-600 dark:text-white"}>
                    +15 XP
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className={completedExercises.includes(303) ? "opacity-70" : ""}>
                {completedExercises.includes(303) ? (
                  <div className="p-4 text-center">
                    <p className="text-brand-600 dark:text-brand-300 font-medium">Exercício concluído! ✅</p>
                    <p className="text-sm text-muted-foreground mt-1 dark:text-white/70">
                      Você ganhou 15 XP com este exercício.
                    </p>
                  </div>
                ) : (
                  <QuizExercise
                    question="Como a espirulina e a inulina trabalham juntas para controlar a fome?"
                    options={[
                      { id: 'option1', text: 'A inulina forma um gel no estômago enquanto a espirulina atua nos hormônios da fome', isCorrect: true },
                      { id: 'option2', text: 'Ambas aumentam a temperatura corporal', isCorrect: false },
                      { id: 'option3', text: 'A combinação contém zero calorias', isCorrect: false },
                      { id: 'option4', text: 'A espirulina ajuda a estabilizar o açúcar no sangue', isCorrect: true },
                      { id: 'option5', text: 'A inulina retarda o esvaziamento gástrico', isCorrect: true }
                    ]}
                    explanation="A inulina atua fisicamente formando um gel no estômago e retardando o esvaziamento gástrico, enquanto a espirulina trabalha nos hormônios da fome e ajuda a estabilizar o açúcar no sangue. Esta combinação proporciona uma abordagem completa para controlar a fome."
                    onComplete={() => handleExerciseComplete(303)}
                  />
                )}
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-12 flex justify-center">
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
              Complete todos os exercícios para marcar este módulo como concluído.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModuleExercisesPage;
