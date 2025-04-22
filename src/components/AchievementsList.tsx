
import React from 'react';
import { Achievement } from '@/types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type AchievementsListProps = {
  achievements: Achievement[];
  compact?: boolean;
};

export const AchievementsList: React.FC<AchievementsListProps> = ({ 
  achievements,
  compact = false
}) => {
  // Filter unlocked achievements
  const unlockedAchievements = achievements.filter(achievement => achievement.unlocked);
  
  // For compact mode, just show count
  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">Conquistas</span>
        <span className="text-brand-600 font-bold">{unlockedAchievements.length}/{achievements.length}</span>
      </div>
    );
  }

  // For full view, show achievement grid
  return (
    <div className="w-full max-w-2xl">
      <h3 className="text-xl font-medium text-brand-700 mb-4">Suas Conquistas</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {achievements.map((achievement) => (
          <TooltipProvider key={achievement.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div 
                  className={`
                    flex flex-col items-center p-4 rounded-lg border transition-all
                    ${achievement.unlocked 
                      ? 'border-brand-300 bg-brand-100/50 cursor-pointer hover:bg-brand-100' 
                      : 'border-gray-200 bg-gray-50 opacity-40 cursor-not-allowed'
                    }
                  `}
                >
                  <span className="text-3xl mb-2" role="img" aria-label={achievement.title}>
                    {achievement.icon}
                  </span>
                  <h4 className={`text-sm font-medium ${achievement.unlocked ? 'text-brand-700' : 'text-gray-400'}`}>
                    {achievement.title}
                  </h4>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{achievement.description}</p>
                {achievement.unlocked && achievement.unlocked_at && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Desbloqueada em: {new Date(achievement.unlocked_at).toLocaleDateString('pt-BR')}
                  </p>
                )}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
};
