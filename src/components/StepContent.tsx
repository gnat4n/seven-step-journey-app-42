
import React from 'react';
import { JourneyStep, Exercise } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { DiagnosticForm } from './exercises/DiagnosticForm';
import { StopTimer } from './exercises/StopTimer';

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
  const renderHtml = (html: string) => {
    return { __html: html };
  };

  const renderExercise = (exercise: Exercise) => {
    let ExerciseComponent;

    // Map exercise types to components
    if (step.id === 1) { // Only for Step 1
      switch (exercise.type) {
        case 'form':
          ExerciseComponent = DiagnosticForm;
          break;
        case 'challenge':
          ExerciseComponent = StopTimer;
          break;
        default:
          return null;
      }
    }

    return (
      <Card key={exercise.id} className="mb-4">
        <CardHeader className="pb-2">
          <div className="flex justify-between">
            <div>
              <CardTitle className="text-lg">{exercise.title}</CardTitle>
              <CardDescription>{exercise.description}</CardDescription>
            </div>
            <Badge variant="outline" className="bg-brand-100">+{exercise.xp_reward} XP</Badge>
          </div>
        </CardHeader>
        <CardContent>
          {ExerciseComponent ? (
            <ExerciseComponent onComplete={() => {}} />
          ) : (
            <div className="border border-dashed border-gray-300 rounded-md p-4 text-center text-muted-foreground">
              <p>Interação do tipo <strong>{exercise.type}</strong></p>
              <p className="text-sm mt-1">Em desenvolvimento...</p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div 
        className="prose prose-brand max-w-none mb-8"
        dangerouslySetInnerHTML={renderHtml(step.content)} 
      />
      
      <Separator className="my-8" />
      
      <div className="mb-8">
        <h3 className="text-xl font-medium text-brand-700 mb-4">Exercícios</h3>
        {step.exercises.map(exercise => renderExercise(exercise))}
      </div>
      
      <div className="flex justify-center">
        <Button 
          onClick={onComplete} 
          disabled={stepCompleted}
          className="bg-brand-500 hover:bg-brand-600"
          size="lg"
        >
          {stepCompleted ? 'Passo Concluído' : 'Concluir Passo'}
        </Button>
      </div>
    </div>
  );
};
