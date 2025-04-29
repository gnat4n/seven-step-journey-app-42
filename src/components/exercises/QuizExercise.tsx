
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, XCircle } from 'lucide-react';

type Option = {
  id: string;
  text: string;
  isCorrect: boolean;
};

type QuizExerciseProps = {
  question: string;
  options: Option[];
  explanation?: string;
  onComplete: () => void;
};

export const QuizExercise: React.FC<QuizExerciseProps> = ({ 
  question, 
  options, 
  explanation, 
  onComplete 
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  
  const handleSubmit = () => {
    if (!selectedOption) return;
    
    const selected = options.find(option => option.id === selectedOption);
    const correct = selected?.isCorrect || false;
    
    setIsCorrect(correct);
    setIsSubmitted(true);
    
    if (correct) {
      setTimeout(() => {
        onComplete();
      }, 1500);
    }
  };
  
  const handleRetry = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
  };
  
  return (
    <div className="space-y-4 p-4 bg-white dark:bg-brand-800/60 rounded-lg border border-brand-100 dark:border-brand-700 animate-fade-in">
      <h3 className="font-medium text-lg mb-2 dark:text-white">{question}</h3>
      
      <RadioGroup value={selectedOption || ""} onValueChange={setSelectedOption} className="space-y-3">
        {options.map((option) => (
          <div 
            key={option.id} 
            className={`flex items-center space-x-2 p-3 rounded-lg border transition-all ${
              isSubmitted 
                ? option.isCorrect 
                  ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-700' 
                  : selectedOption === option.id 
                    ? 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-700' 
                    : 'bg-white border-gray-200 dark:bg-brand-800 dark:border-brand-700' 
                : 'hover:bg-brand-50 dark:hover:bg-brand-700/50 cursor-pointer border-gray-200 dark:border-brand-700'
            }`}
          >
            <RadioGroupItem 
              value={option.id} 
              id={`option-${option.id}`} 
              disabled={isSubmitted}
              className={isSubmitted && option.isCorrect ? 'text-green-500' : ''}
            />
            <Label 
              htmlFor={`option-${option.id}`} 
              className={`flex-1 cursor-pointer ${isSubmitted && 'cursor-default'} dark:text-white`}
            >
              {option.text}
            </Label>
            {isSubmitted && option.isCorrect && (
              <CheckCircle className="h-5 w-5 text-green-500" />
            )}
            {isSubmitted && !option.isCorrect && selectedOption === option.id && (
              <XCircle className="h-5 w-5 text-red-500" />
            )}
          </div>
        ))}
      </RadioGroup>
      
      {isSubmitted && (
        <div className={`mt-4 p-3 rounded-lg ${
          isCorrect 
            ? 'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-200' 
            : 'bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-200'
        }`}>
          <p className="font-medium">
            {isCorrect ? 'Resposta correta!' : 'Resposta incorreta. Tente novamente.'}
          </p>
          {explanation && <p className="text-sm mt-1">{explanation}</p>}
        </div>
      )}
      
      <Separator className="my-4 dark:bg-brand-700" />
      
      <div className="flex justify-end space-x-3">
        {isSubmitted && !isCorrect ? (
          <Button 
            onClick={handleRetry}
            variant="outline"
            className="hover:bg-brand-50 dark:bg-brand-700 dark:text-white dark:hover:bg-brand-600"
          >
            Tentar novamente
          </Button>
        ) : (
          <Button 
            onClick={handleSubmit} 
            disabled={!selectedOption || isSubmitted}
            className={`${
              !selectedOption 
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-brand-500 hover:bg-brand-600 dark:bg-brand-400 dark:hover:bg-brand-300 dark:text-brand-900'
            }`}
          >
            {isSubmitted ? 'Enviado!' : 'Enviar resposta'}
          </Button>
        )}
      </div>
    </div>
  );
};
