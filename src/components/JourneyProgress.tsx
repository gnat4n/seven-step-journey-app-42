
import React from 'react';
import { useApp } from '@/context/AppContext';
import { motion } from 'framer-motion';

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
        <div className="flex items-center gap-2 bg-white/50 dark:bg-brand-800/50 backdrop-blur-sm p-3 rounded-lg shadow-sm">
          <span className="text-brand-600 dark:text-brand-300 font-bold text-lg">{currentStep - 1}</span>
          <span className="text-muted-foreground dark:text-white/70">/</span>
          <span className="text-muted-foreground dark:text-white/70">7</span>
        </div>
      );
    }

    // The container for all steps with path connections
    return (
      <div className="flex items-center justify-between w-full max-w-3xl relative">
        {/* Path Background (ZIndex behind the steps) */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 dark:bg-brand-800 -translate-y-1/2 rounded-full"></div>
        
        {/* Completed Path (grows based on progress) */}
        <div 
          className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-brand-500 to-brand-600 dark:from-brand-400 dark:to-brand-300 -translate-y-1/2 rounded-full transition-all duration-500"
          style={{ width: `${((currentStep - 1) / 6) * 100}%` }}
        ></div>
        
        {/* Step Circles */}
        {Array.from({ length: 7 }, (_, index) => {
          const stepNumber = index + 1;
          const isCompleted = currentStep > stepNumber;
          const isCurrent = currentStep === stepNumber;
          const isLocked = currentStep < stepNumber;
          
          return (
            <motion.div
              key={stepNumber}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="relative z-10"
            >
              <motion.div 
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center border-2 shadow-md
                  transition-all duration-300 transform hover:scale-110
                  ${isCompleted 
                    ? 'bg-gradient-to-br from-brand-500 to-brand-600 dark:from-brand-400 dark:to-brand-300 border-brand-400 dark:border-brand-300 text-white' 
                    : isCurrent 
                      ? 'bg-white dark:bg-brand-700 border-brand-500 dark:border-brand-400 text-brand-500 dark:text-brand-300 animate-pulse' 
                      : 'bg-gray-100 dark:bg-brand-800 border-gray-300 dark:border-brand-700 text-gray-400 dark:text-gray-500'
                  }
                `}
                onClick={() => {
                  if (!isLocked && onClick) {
                    onClick(stepNumber);
                  }
                }}
                style={{ cursor: isLocked ? 'not-allowed' : 'pointer' }}
                whileHover={!isLocked ? { scale: 1.1 } : {}}
                whileTap={!isLocked ? { scale: 0.95 } : {}}
              >
                {isCompleted ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="font-bold">{stepNumber}</span>
                )}
              </motion.div>
              
              {/* Step Label below the circle (optional) */}
              {!compact && (
                <div className={`
                  absolute -bottom-7 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap
                  ${isCompleted || isCurrent ? 'text-brand-600 dark:text-brand-300 font-medium' : 'text-gray-400 dark:text-gray-500'}
                `}>
                  {steps[index]?.title || `Passo ${stepNumber}`}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col items-center gap-6">
      {!compact && (
        <h3 className="text-xl font-medium bg-gradient-to-r from-brand-600 to-brand-800 dark:from-brand-300 dark:to-brand-100 bg-clip-text text-transparent mb-4">
          Sua Jornada
        </h3>
      )}
      {renderSteps()}
      {!compact && <div className="h-6" />} {/* Space for labels */}
    </div>
  );
};
