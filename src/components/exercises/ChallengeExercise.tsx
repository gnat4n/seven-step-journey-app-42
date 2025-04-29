
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Clock, XCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

type ChallengeExerciseProps = {
  title: string;
  description: string;
  steps: string[];
  timeInMinutes?: number;
  onComplete: () => void;
};

export const ChallengeExercise: React.FC<ChallengeExerciseProps> = ({
  title,
  description,
  steps,
  timeInMinutes = 5,
  onComplete
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(timeInMinutes * 60);
  
  const handleStart = () => {
    setIsStarted(true);
    
    // Start countdown if timeInMinutes is set
    if (timeInMinutes > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  };
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
      setTimeout(() => {
        onComplete();
      }, 1000);
    }
  };
  
  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const progress = (currentStep / steps.length) * 100;
  
  return (
    <div className="space-y-4 animate-fade-in">
      <Card className="border-brand-200 dark:border-brand-700 bg-white dark:bg-brand-800/60 overflow-hidden">
        <CardContent className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2 dark:text-white">{title}</h3>
            <p className="text-muted-foreground dark:text-white/70">{description}</p>
          </div>
          
          {!isStarted ? (
            <div className="flex flex-col items-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-brand-50 dark:bg-brand-700 flex items-center justify-center">
                <Clock className="h-8 w-8 text-brand-600 dark:text-brand-300" />
              </div>
              <p className="text-center text-sm text-muted-foreground dark:text-white/70">
                Este desafio levará cerca de {timeInMinutes} {timeInMinutes === 1 ? 'minuto' : 'minutos'} para ser completado.
              </p>
              <Button 
                onClick={handleStart}
                className="bg-brand-500 hover:bg-brand-600 mt-2 dark:bg-brand-400 dark:hover:bg-brand-300 dark:text-brand-900"
              >
                Iniciar Desafio
              </Button>
            </div>
          ) : isCompleted ? (
            <div className="flex flex-col items-center py-6 space-y-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <p className="text-center font-medium text-green-600 dark:text-green-400">
                Desafio concluído com sucesso!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {timeInMinutes > 0 && (
                <div className="flex items-center justify-center mb-4">
                  <div className={`text-xl font-mono font-bold ${
                    timeRemaining < 60 ? 'text-red-500 animate-pulse' : 'text-brand-600 dark:text-brand-300'
                  }`}>
                    {formatTime(timeRemaining)}
                  </div>
                </div>
              )}
              
              <Progress value={progress} className="h-2 bg-gray-100 dark:bg-brand-700" />
              
              <div className="mt-6 space-y-4">
                {steps.map((step, index) => (
                  <div 
                    key={index} 
                    className={`p-4 rounded-lg border ${
                      index === currentStep 
                        ? 'border-brand-400 bg-brand-50 dark:border-brand-400 dark:bg-brand-700/50' 
                        : index < currentStep 
                          ? 'border-gray-200 bg-gray-50 dark:border-brand-700 dark:bg-brand-800/80 opacity-60' 
                          : 'border-gray-200 dark:border-brand-700 opacity-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        index < currentStep 
                          ? 'bg-green-100 dark:bg-green-900/20' 
                          : index === currentStep 
                            ? 'bg-brand-100 dark:bg-brand-700' 
                            : 'bg-gray-100 dark:bg-brand-800'
                      }`}>
                        {index < currentStep ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <span className={`text-sm font-medium ${
                            index === currentStep 
                              ? 'text-brand-600 dark:text-brand-300' 
                              : 'text-gray-500 dark:text-gray-400'
                          }`}>
                            {index + 1}
                          </span>
                        )}
                      </div>
                      <p className={`text-sm ${
                        index === currentStep 
                          ? 'text-brand-800 dark:text-white' 
                          : index < currentStep 
                            ? 'text-gray-500 dark:text-gray-300' 
                            : 'text-gray-400 dark:text-gray-400'
                      }`}>
                        {step}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-end mt-4">
                <Button 
                  onClick={handleNext}
                  className="bg-brand-500 hover:bg-brand-600 dark:bg-brand-400 dark:hover:bg-brand-300 dark:text-brand-900"
                >
                  {currentStep < steps.length - 1 ? 'Próximo passo' : 'Finalizar'}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
