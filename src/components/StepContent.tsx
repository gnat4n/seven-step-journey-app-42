
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { JourneyStep } from '@/types';
import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

interface StepContentProps {
  step: JourneyStep;
  onComplete: () => void;
  stepCompleted: boolean;
}

export const StepContent: React.FC<StepContentProps> = ({ step, onComplete, stepCompleted }) => {
  const navigate = useNavigate();
  const { isExerciseCompleted, areAllExercisesCompleted } = useApp();

  return (
    <div className="mb-10">
      <div 
        className="prose prose-lg dark:prose-invert mx-auto mb-10 max-w-4xl"
        dangerouslySetInnerHTML={{ __html: step.content }}
      />
      
      {step.exercises && step.exercises.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-center mb-6">Material Complementar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {step.exercises.map((exercise) => {
              const isCompleted = isExerciseCompleted(step.id, exercise.id);
              
              return (
                <motion.div
                  key={exercise.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card 
                    className={`h-full cursor-pointer transition-all duration-300 hover:shadow-md ${
                      isCompleted ? 'border-brand-300 dark:border-brand-600' : ''
                    }`}
                    onClick={() => navigate(`/passo/${step.id}/exercicios`)}
                  >
                    <CardHeader className={`pb-2 ${isCompleted ? 'bg-brand-50 dark:bg-brand-700/30' : ''}`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className={isCompleted ? 'text-brand-600 dark:text-brand-300' : ''}>
                            {exercise.title}
                          </CardTitle>
                          <CardDescription>
                            {exercise.description}
                          </CardDescription>
                        </div>
                        {isCompleted && (
                          <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 flex-shrink-0" />
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="text-sm text-muted-foreground dark:text-white/70">
                        {isCompleted ? (
                          <span className="text-green-600 dark:text-green-400 font-medium">
                            Concluído ✓
                          </span>
                        ) : (
                          <span>Clique para acessar</span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
      
      <div className="mt-10 text-center">
        {stepCompleted ? (
          <div className="bg-brand-50 dark:bg-brand-800/30 border border-brand-200 dark:border-brand-700 rounded-lg p-6 max-w-md mx-auto">
            <h3 className="text-xl font-semibold text-brand-600 dark:text-brand-300">Passo Concluído!</h3>
            <p className="text-muted-foreground dark:text-white/70 mt-2">Você já completou este passo da sua jornada.</p>
          </div>
        ) : areAllExercisesCompleted(step.id) ? (
          <Button 
            onClick={onComplete}
            className="px-8 py-6 text-lg bg-brand-500 hover:bg-brand-600 dark:bg-brand-400 dark:hover:bg-brand-300 dark:text-brand-900"
            size="lg"
          >
            Concluir Passo {step.id}
          </Button>
        ) : (
          <div className="space-y-4">
            <p className="text-muted-foreground dark:text-white/70">
              Complete todos os materiais complementares para avançar para o próximo passo.
            </p>
            <Button 
              onClick={() => navigate(`/passo/${step.id}/exercicios`)}
              variant="outline"
              className="px-8"
            >
              Ver Materiais Complementares
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
