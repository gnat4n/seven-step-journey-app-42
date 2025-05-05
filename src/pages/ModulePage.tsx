
import React from 'react';
import { useParams } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { ModuleContent } from '@/components/ModuleContent';
import { Navigate } from 'react-router-dom';

const ModulePage = () => {
  const { stepId, moduleId } = useParams<{ stepId: string; moduleId: string }>();
  const { state } = useApp();
  const { steps } = state;
  
  if (!stepId || !moduleId) {
    return <Navigate to="/" />;
  }

  const step = steps.find(s => s.id === Number(stepId));
  if (!step || !step.modules) {
    return <Navigate to={`/passo/${stepId}`} />;
  }

  const module = step.modules.find(m => m.id === moduleId);
  if (!module) {
    return <Navigate to={`/passo/${stepId}`} />;
  }

  return <ModuleContent module={module} stepId={Number(stepId)} />;
};

export default ModulePage;
