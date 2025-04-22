
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { AuthGuard } from '@/components/AuthGuard';
import { MainNav } from '@/components/MainNav';
import { JourneyProgress } from '@/components/JourneyProgress';
import { StepContent } from '@/components/StepContent';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const StepPage = () => {
  const { stepId } = useParams<{ stepId: string }>();
  const { state, completeStep } = useApp();
  const { currentUser, steps } = state;
  const navigate = useNavigate();
  
  // Convert stepId to number
  const stepNumber = parseInt(stepId || '1', 10);
  
  // Get the current step data
  const stepData = steps.find(step => step.id === stepNumber);
  
  // Check if user has access to this step
  const hasAccess = currentUser && currentUser.current_step >= stepNumber;
  
  // Check if step is already completed
  const isCompleted = currentUser && currentUser.current_step > stepNumber;
  
  useEffect(() => {
    // If step doesn't exist, redirect to dashboard
    if (!stepData) {
      navigate('/');
      return;
    }
    
    // If user doesn't have access to this step, redirect to their current step
    if (currentUser && !hasAccess) {
      navigate(`/passo/${currentUser.current_step}`);
    }
  }, [stepData, hasAccess, currentUser, navigate, stepNumber]);
  
  const handleCompleteStep = () => {
    completeStep(stepNumber);
    
    // When a user completes the last step, redirect to dashboard with celebration
    if (stepNumber === 7) {
      navigate('/');
    }
  };
  
  return (
    <AuthGuard>
      <MainNav />
      <main className="container py-6">
        <div className="flex flex-col items-center space-y-8">
          {/* Step Progress */}
          <div className="w-full max-w-3xl">
            <JourneyProgress />
          </div>
          
          {/* Step Title */}
          <div className="text-center">
            <h1 className="text-3xl font-serif font-bold text-brand-700 mb-2">
              Passo {stepNumber}: {stepData?.title}
            </h1>
            <p className="text-muted-foreground">{stepData?.description}</p>
          </div>
          
          {/* Already Completed Alert */}
          {isCompleted && (
            <Alert className="bg-brand-100 border-brand-300 max-w-3xl">
              <AlertTitle className="text-brand-700">Passo já concluído!</AlertTitle>
              <AlertDescription>
                Você já completou esse passo, mas pode revisitá-lo a qualquer momento.
              </AlertDescription>
            </Alert>
          )}
          
          {/* Step Content */}
          {stepData && (
            <StepContent 
              step={stepData} 
              onComplete={handleCompleteStep}
              stepCompleted={isCompleted}
            />
          )}
        </div>
      </main>
    </AuthGuard>
  );
};

export default StepPage;
