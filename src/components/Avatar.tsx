
import React from 'react';
import { useApp } from '@/context/AppContext';

type AvatarProps = {
  status: number; // 1-7 based on progress
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withAnimation?: boolean;
  showName?: boolean;
};

export const Avatar: React.FC<AvatarProps> = ({ 
  status = 1, 
  size = 'md',
  withAnimation = false,
  showName = true
}) => {
  const { state } = useApp();
  const { currentUser } = state;
  const userName = currentUser?.name || 'Usuária';

  // Mapping avatar status to visual characteristics
  const getAvatarState = (status: number) => {
    switch (status) {
      case 1:
        return {
          expression: 'cansada',
          bgColor: 'bg-gradient-to-br from-gray-200 to-gray-100',
          textColor: 'text-gray-600',
          emoji: '😔'
        };
      case 2:
        return {
          expression: 'mais leve',
          bgColor: 'bg-gradient-to-br from-brand-200 to-brand-100',
          textColor: 'text-gray-600',
          emoji: '🙂'
        };
      case 3:
      case 4:
        return {
          expression: 'confiante',
          bgColor: 'bg-gradient-to-br from-brand-300 to-brand-200',
          textColor: 'text-brand-600',
          emoji: '😊'
        };
      case 5:
      case 6:
        return {
          expression: 'forte',
          bgColor: 'bg-gradient-to-br from-brand-500 to-brand-300',
          textColor: 'text-brand-700',
          emoji: '💪'
        };
      case 7:
        return {
          expression: 'radiante',
          bgColor: 'bg-gradient-to-br from-brand-600 to-brand-400',
          textColor: 'text-white',
          emoji: '✨'
        };
      default:
        return {
          expression: 'iniciante',
          bgColor: 'bg-gradient-to-br from-gray-200 to-gray-100',
          textColor: 'text-gray-600',
          emoji: '😊'
        };
    }
  };

  // Get size classes
  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'sm':
        return {
          wrapperClass: 'w-12 h-12',
          emojiClass: 'text-lg'
        };
      case 'md':
        return {
          wrapperClass: 'w-16 h-16',
          emojiClass: 'text-2xl'
        };
      case 'lg':
        return {
          wrapperClass: 'w-24 h-24',
          emojiClass: 'text-4xl'
        };
      case 'xl':
        return {
          wrapperClass: 'w-32 h-32',
          emojiClass: 'text-5xl'
        };
      default:
        return {
          wrapperClass: 'w-16 h-16',
          emojiClass: 'text-2xl'
        };
    }
  };

  const { expression, bgColor, textColor, emoji } = getAvatarState(status);
  const { wrapperClass, emojiClass } = getSizeClasses(size);

  return (
    <div className="flex flex-col items-center">
      <div 
        className={`
          ${wrapperClass} rounded-full flex items-center justify-center ${bgColor} ${textColor}
          shadow-lg border border-white/20
          ${withAnimation ? 'transition-all duration-500 hover:scale-110' : ''}
          ${status === 7 ? 'animate-pulse' : ''}
        `}
      >
        <span className={emojiClass} role="img" aria-label={expression}>
          {emoji}
        </span>
      </div>
      {showName && (size === 'lg' || size === 'xl') ? (
        <p className={`mt-2 font-medium ${textColor}`}>{userName} {expression}</p>
      ) : null}
    </div>
  );
};
