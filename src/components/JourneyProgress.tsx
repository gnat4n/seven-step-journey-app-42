
import React from 'react';
import { useApp } from '@/context/AppContext';

type JourneyProgressProps = {
  compact?: boolean;
  onClick?: (stepId: number) => void;
};

export const JourneyProgress: React.FC<JourneyProgressProps> = ({ 
  compact = false,
  onClick 
}) => {
  const { state } = useApp();
  const { currentUser, steps } = state;
  const currentStep = currentUser?.current_step || 1;

  // Generate journey steps
  const renderSteps = () => {
    // For compact view, just show current step out of total
    if (compact) {
      return (
        <div className="flex items-center gap-2">
          <span className="text-brand-600 font-bold text-lg">{currentStep - 1}</span>
          <span className="text-muted-foreground">/</span>
          <span className="text-muted-foreground">7</span>
        </div>
      );
    }

    // For full view, show all steps
    return (
      <div className="flex items-center justify-between w-full max-w-3xl">
        {Array.from({ length: 7 }, (_, index) => {
          const stepNumber = index + 1;
          const isCompleted = currentStep > stepNumber;
          const isCurrent = currentStep === stepNumber;
          const isLocked = currentStep < stepNumber;
          
          const statusClass = isCompleted 
            ? 'completed' 
            : isCurrent 
              ? 'current' 
              : 'locked';
              
          return (
            <React.Fragment key={stepNumber}>
              {/* Step circle */}
              <div 
                className={`journey-step ${statusClass}`}
                onClick={() => {
                  if (!isLocked && onClick) {
                    onClick(stepNumber);
                  }
                }}
                style={{ cursor: isLocked ? 'not-allowed' : 'pointer' }}
              >
                {stepNumber}
              </div>
              
              {/* Path between steps (except after last step) */}
              {stepNumber < 7 && (
                <div 
                  className={`journey-path ${isCompleted ? 'completed' : 'incomplete'}`}
                ></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {!compact && (
        <h3 className="text-xl font-medium text-brand-700">Sua Jornada</h3>
      )}
      {renderSteps()}
    </div>
  );
};
