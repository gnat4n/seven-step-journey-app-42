
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  linkProps?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', className, linkProps }) => {
  const { theme } = useTheme();
  
  const logoSrc = theme === 'dark' 
    ? '/lovable-uploads/42a44c4e-77e3-422f-8433-baeb811966a8.png' 
    : '/lovable-uploads/26597e5f-abeb-43e8-85af-7b6428055e3b.png';
  
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16'
  };
  
  return (
    <Link to="/" {...linkProps} className={cn("flex items-center hover:opacity-80 transition-opacity", className)}>
      <img 
        src={logoSrc} 
        alt="7Steps Logo" 
        className={cn(sizeClasses[size])}
      />
    </Link>
  );
};
