import React from 'react';
import { Progress } from '@/components/ui/progress';
type XPBarProps = {
  currentXP: number;
  compact?: boolean;
};
export const XPBar: React.FC<XPBarProps> = ({
  currentXP,
  compact = false
}) => {
  // Calculate level and progress
  const calculateLevel = (xp: number) => {
    // Each level requires more XP: level 1 = 100 XP, level 2 = 250 XP, etc.
    const levels = [0, 100, 250, 450, 700, 1000, 1350, 1750, 2200, 2700, 3250];
    let level = 0;
    while (level < levels.length - 1 && xp >= levels[level + 1]) {
      level++;
    }

    // Calculate progress percentage to next level
    const currentLevelXP = levels[level];
    const nextLevelXP = levels[level + 1] || currentLevelXP + 500;
    const xpForNextLevel = nextLevelXP - currentLevelXP;
    const progress = Math.min((xp - currentLevelXP) / xpForNextLevel * 100, 100);
    return {
      level: level + 1,
      progress,
      xpForNextLevel: nextLevelXP - xp
    };
  };
  const {
    level,
    progress,
    xpForNextLevel
  } = calculateLevel(currentXP);
  if (compact) {
    return <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">Nível</span>
        <span className="text-brand-600 font-bold">{level}</span>
      </div>;
  }
  return <div className="w-full max-w-md mx">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium">Nível {level}</span>
        <span className="text-xs text-muted-foreground">{currentXP} XP</span>
      </div>
      <Progress value={progress} className="h-2" />
      <div className="flex justify-end mt-1">
        <span className="text-xs text-muted-foreground">
          {xpForNextLevel} XP para o próximo nível
        </span>
      </div>
    </div>;
};