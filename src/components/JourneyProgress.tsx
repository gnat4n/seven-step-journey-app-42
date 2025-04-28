
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
    if (compact) {
      return (
        <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm p-3 rounded-lg shadow-sm">
          <span className="text-brand-600 font-bold text-lg">{currentStep - 1}</span>
          <span className="text-muted-foreground">/</span>
          <span className="text-muted-foreground">7</span>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-between w-full max-w-3xl relative">
        {Array.from({ length: 7 }, (_, index) => {
          const stepNumber = index + 1;
          const isCompleted = currentStep > stepNumber;
          const isCurrent = currentStep === stepNumber;
          const isLocked = currentStep < stepNumber;
          
          const statusClass = isCompleted 
            ? 'completed bg-gradient-to-br from-brand-500 to-brand-600' 
            : isCurrent 
              ? 'current bg-white' 
              : 'locked bg-gray-100';
              
          return (
            <React.Fragment key={stepNumber}>
              {/* Step circle */}
              <div 
                className={`journey-step ${statusClass} transform hover:scale-110 transition-all duration-300 shadow-md`}
                onClick={() => {
                  if (!isLocked && onClick) {
                    onClick(stepNumber);
                  }
                }}
                style={{ cursor: isLocked ? 'not-allowed' : 'pointer' }}
              >
                {stepNumber}
              </div>
              
              {/* Path between steps */}
              {stepNumber < 7 && (
                <div 
                  className={`journey-path transition-all duration-500 ${isCompleted ? 'completed bg-gradient-to-r from-brand-500 to-brand-600' : 'incomplete'}`}
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
        <h3 className="text-xl font-medium bg-gradient-to-r from-brand-600 to-brand-800 bg-clip-text text-transparent">
          Sua Jornada
        </h3>
      )}
      {renderSteps()}
    </div>
  );
};
