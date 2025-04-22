
import React, { useState } from 'react';
import { JourneyStep, Exercise } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DiagnosticForm } from './exercises/DiagnosticForm';
import { StopTimer } from './exercises/StopTimer';
import { ThoughtReprogramming } from './exercises/ThoughtReprogramming';
import { CheckCircle, LockKeyhole } from 'lucide-react';

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
  
  const renderHtml = (html: string) => {
    return { __html: html };
  };

  const handleExerciseComplete = (exerciseId: number) => {
    if (!completedExercises.includes(exerciseId)) {
      setCompletedExercises([...completedExercises, exerciseId]);
    }
  };

  const allExercisesCompleted = step.exercises.length > 0 && 
    step.exercises.every(ex => completedExercises.includes(ex.id));

  const renderExercise = (exercise: Exercise) => {
    let ExerciseComponent;
    const isCompleted = completedExercises.includes(exercise.id);

    // Map exercise types to components
    if (step.id === 1) { // Only for Step 1
      switch (exercise.type) {
        case 'form':
          if (exercise.id === 101) { // Mapa Mental da Fome
            ExerciseComponent = DiagnosticForm;
          } else if (exercise.id === 103) { // Reprogramação de Pensamentos
            ExerciseComponent = ThoughtReprogramming;
          }
          break;
        case 'challenge':
          ExerciseComponent = StopTimer;
          break;
        default:
          return null;
      }
    }

    return (
      <div key={exercise.id} className="mb-6 animate-fade-in">
        <Card className={`border-${isCompleted ? 'brand-200' : 'gray-200'} overflow-hidden transition-all duration-300 hover:shadow-md`}>
          <CardHeader className={`pb-2 ${isCompleted ? 'bg-brand-50' : ''}`}>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                {isCompleted && (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
                <div>
                  <CardTitle className={`text-lg ${isCompleted ? 'text-brand-700' : ''}`}>
                    {exercise.title}
                  </CardTitle>
                  <CardDescription>{exercise.description}</CardDescription>
                </div>
              </div>
              <Badge variant={isCompleted ? "outline" : "secondary"} className={isCompleted ? "bg-brand-100" : ""}>
                +{exercise.xp_reward} XP
              </Badge>
            </div>
          </CardHeader>
          <CardContent className={isCompleted ? "opacity-70" : ""}>
            {isCompleted ? (
              <div className="p-4 text-center">
                <p className="text-brand-600 font-medium">Exercício concluído! ✅</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Você ganhou {exercise.xp_reward} XP com este exercício.
                </p>
              </div>
            ) : ExerciseComponent ? (
              <ExerciseComponent onComplete={() => handleExerciseComplete(exercise.id)} />
            ) : (
              <div className="border border-dashed border-gray-300 rounded-md p-6 text-center text-muted-foreground">
                <div className="flex flex-col items-center gap-2">
                  <LockKeyhole className="h-8 w-8 text-gray-400" />
                  <p>Interação do tipo <strong>{exercise.type}</strong></p>
                  <p className="text-sm mt-1">Em desenvolvimento...</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <ScrollArea className="prose prose-brand max-w-none mb-8 max-h-[500px] overflow-auto pr-4">
        <div 
          className="p-6 bg-white rounded-lg shadow-sm border border-brand-100"
          dangerouslySetInnerHTML={renderHtml(step.content)} 
        />
      </ScrollArea>
      
      <Separator className="my-8" />
      
      <div className="mb-8">
        <h3 className="text-xl font-medium text-brand-700 mb-6 flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-sm font-bold">
            {step.exercises.length}
          </span>
          Exercícios Práticos
        </h3>
        {step.exercises.map(exercise => renderExercise(exercise))}
      </div>
      
      <div className="flex justify-center mb-8">
        <Button 
          onClick={onComplete} 
          disabled={stepCompleted || !allExercisesCompleted}
          className={`
            ${stepCompleted 
              ? 'bg-gray-400 hover:bg-gray-400 cursor-not-allowed' 
              : allExercisesCompleted 
                ? 'bg-brand-500 hover:bg-brand-600 animate-pulse' 
                : 'bg-gray-300 hover:bg-gray-300 cursor-not-allowed'
            }
            px-8 py-6 text-lg font-medium transition-all duration-300 transform hover:scale-105
          `}
          size="lg"
        >
          {stepCompleted 
            ? 'Passo Concluído' 
            : allExercisesCompleted 
              ? 'Concluir Passo' 
              : 'Complete todos os exercícios'
          }
        </Button>
      </div>
      
      {!allExercisesCompleted && !stepCompleted && (
        <div className="text-center text-sm text-muted-foreground">
          Complete todos os exercícios para desbloquear o próximo passo da sua jornada.
        </div>
      )}
    </div>
  );
};
