
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';

type AuthGuardProps = {
  children: React.ReactNode;
  requireAdmin?: boolean;
};

export const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  requireAdmin = false 
}) => {
  const { state } = useApp();
  const { currentUser, isLoading } = state;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !currentUser) {
      navigate('/login');
    } else if (!isLoading && requireAdmin && currentUser && !currentUser.is_admin) {
      navigate('/');
    }
  }, [currentUser, isLoading, navigate, requireAdmin]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-brand-500">Carregando...</div>
      </div>
    );
  }

  if (!currentUser) {
    return null; // Will redirect to login
  }

  if (requireAdmin && !currentUser.is_admin) {
    return null; // Will redirect to dashboard
  }

  return <>{children}</>;
};
