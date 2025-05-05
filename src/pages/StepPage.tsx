
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { MainNav } from '@/components/MainNav';
import { StepContent } from '@/components/StepContent';
import { JourneyProgress } from '@/components/JourneyProgress';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { ModuleCard } from '@/components/ModuleCard';

const StepPage = () => {
  const { stepId } = useParams<{ stepId: string }>();
  const [loading, setLoading] = useState(true);
  const { state, completeStep, isModuleCompleted } = useApp();
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
  
  const handleStepComplete = async () => {
    if (currentUser && Number(stepId) === currentUser.current_step) {
      // Verificar se todos os módulos foram concluídos
      if (step.modules) {
        const allModulesCompleted = step.modules.every(module => 
          isModuleCompleted(module.id)
        );
        
        if (!allModulesCompleted) {
          return;
        }
      }
      
      await completeStep(Number(stepId));
    }
  };
  
  const handleNavigateToStep = (stepNumber: number) => {
    navigate(`/passo/${stepNumber}`);
  };

  // Check if all modules are completed to enable step completion
  const canCompleteStep = !step?.modules || step.modules.every(module => 
    isModuleCompleted(module.id)
  );
  
  const stepCompleted = currentUser && currentUser.current_step > Number(stepId);
  
  if (loading) {
    return <div className="flex flex-col min-h-screen">
        <MainNav />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-brand-500">Carregando...</div>
        </div>
      </div>;
  }
  
  if (!step) {
    return <div className="flex flex-col min-h-screen">
        <MainNav />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-brand-700 mb-4">Passo não encontrado</h1>
            <Button onClick={() => navigate('/')}>Voltar para o Dashboard</Button>
          </div>
        </div>
      </div>;
  }

  return <div className="flex flex-col min-h-screen">
      <MainNav />
      <div className="container py-8 flex-1">
        <div className="mb-8">
          <Button variant="ghost" className="gap-2 text-brand-600 hover:text-brand-700 hover:bg-brand-50 -ml-2" onClick={() => navigate('/')}>
            <ChevronLeft size={16} />
            <span>Voltar para o Dashboard</span>
          </Button>
        </div>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-600 to-brand-800 bg-clip-text text-transparent text-center">
            Passo {stepId}: {step.title}
          </h1>
          <p className="text-muted-foreground mt-2 max-w-2xl text-center mx-auto">
            {step.description}
          </p>
        </div>
        
        <div className="mb-10">
          <JourneyProgress onClick={handleNavigateToStep} />
        </div>
        
        <StepContent step={step} onComplete={handleStepComplete} stepCompleted={stepCompleted} />
        
        {/* Módulos do passo */}
        {step.modules && step.modules.length > 0 && (
          <div className="mt-10 max-w-3xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-brand-700 dark:text-brand-300 text-center mb-6">
              Conteúdos do Passo {stepId}
            </h2>
            
            <div className="grid gap-6">
              {step.modules.map((module) => (
                <ModuleCard 
                  key={module.id} 
                  module={module} 
                  stepId={Number(stepId)} 
                />
              ))}
            </div>
            
            {!stepCompleted && (
              <div className="mt-10 flex flex-col items-center">
                <Button 
                  onClick={handleStepComplete}
                  disabled={!canCompleteStep}
                  className={`
                    ${!canCompleteStep 
                      ? 'bg-gray-300 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-700 cursor-not-allowed' 
                      : 'bg-brand-500 hover:bg-brand-600 dark:bg-brand-400 dark:hover:bg-brand-300 dark:text-brand-900 animate-pulse'
                    }
                    px-8 py-6 text-lg font-medium transition-all duration-300 transform hover:scale-105
                  `}
                  size="lg"
                >
                  {canCompleteStep ? 'Concluir este passo' : 'Complete todos os módulos'}
                </Button>
                
                {!canCompleteStep && (
                  <p className="text-sm text-muted-foreground mt-2 text-center dark:text-white/70">
                    Complete todos os módulos deste passo para avançar.
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>;
};

export default StepPage;
