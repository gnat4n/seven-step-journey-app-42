
import React from 'react';

type AvatarProps = {
  status: number; // 1-7 based on progress
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withAnimation?: boolean;
};

export const Avatar: React.FC<AvatarProps> = ({ 
  status = 1, 
  size = 'md',
  withAnimation = false
}) => {
  // Mapping avatar status to visual characteristics
  const getAvatarState = (status: number) => {
    switch (status) {
      case 1:
        return {
          expression: 'cansada',
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-600',
          emoji: '😔'
        };
      case 2:
        return {
          expression: 'mais leve',
          bgColor: 'bg-brand-100',
          textColor: 'text-gray-600',
          emoji: '🙂'
        };
      case 3:
      case 4:
        return {
          expression: 'confiante',
          bgColor: 'bg-brand-200',
          textColor: 'text-brand-600',
          emoji: '😊'
        };
      case 5:
      case 6:
        return {
          expression: 'forte',
          bgColor: 'bg-brand-300',
          textColor: 'text-brand-700',
          emoji: '💪'
        };
      case 7:
        return {
          expression: 'radiante',
          bgColor: 'bg-brand-500',
          textColor: 'text-white',
          emoji: '✨'
        };
      default:
        return {
          expression: 'iniciante',
          bgColor: 'bg-gray-100',
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
          ${withAnimation ? 'transition-all duration-500 hover:scale-110' : ''}
          ${status === 7 ? 'animate-pulse' : ''}
        `}
      >
        <span className={emojiClass} role="img" aria-label={expression}>
          {emoji}
        </span>
      </div>
      {size === 'lg' || size === 'xl' ? (
        <p className={`mt-2 font-medium ${textColor}`}>Ana {expression}</p>
      ) : null}
    </div>
  );
};
