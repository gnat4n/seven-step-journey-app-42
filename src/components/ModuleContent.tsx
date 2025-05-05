
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { MainNav } from '@/components/MainNav';
import { StepModule } from '@/types';

interface ModuleContentProps {
  module: StepModule;
  stepId: number;
}

export const ModuleContent: React.FC<ModuleContentProps> = ({ module, stepId }) => {
  const navigate = useNavigate();
  const { completeModule, isModuleCompleted } = useApp();
  const isCompleted = isModuleCompleted(module.id);

  const handleComplete = () => {
    if (!isCompleted) {
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

        <div className="max-w-3xl mx-auto">
          <div className="prose dark:prose-invert mx-auto max-w-none">
            <div dangerouslySetInnerHTML={{ __html: module.content }} />
          </div>
          
          <div className="mt-12 flex justify-center">
            <Button 
              onClick={handleComplete}
              className="bg-brand-500 hover:bg-brand-600 dark:bg-brand-400 dark:hover:bg-brand-300 dark:text-brand-900 animate-pulse px-8 py-6 text-lg font-medium transition-all duration-300 transform hover:scale-105"
              size="lg"
            >
              {isCompleted ? 'Voltar para o Passo' : 'Marcar como Concluído'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
