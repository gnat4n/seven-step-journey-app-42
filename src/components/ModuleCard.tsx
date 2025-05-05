
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';
import { StepModule } from '@/types';
import { useApp } from '@/context/AppContext';

interface ModuleCardProps {
  stepId: number;
  module: StepModule;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ module, stepId }) => {
  const navigate = useNavigate();
  const { isModuleCompleted } = useApp();
  const completed = isModuleCompleted(module.id);

  const handleClick = () => {
    if (module.type === 'exercises') {
      navigate(`/passo/${stepId}/exercicios/${module.id}`);
    } else {
      navigate(`/passo/${stepId}/modulo/${module.id}`);
    }
  };

  return (
    <Card 
      className={`border-${completed ? 'brand-200 dark:border-brand-500' : 'gray-200 dark:border-brand-700'} overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer`}
      onClick={handleClick}
    >
      <CardHeader className={`pb-2 ${completed ? 'bg-brand-50 dark:bg-brand-700/50' : ''}`}>
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            {completed && (
              <CheckCircle className="h-5 w-5 text-green-500" />
            )}
            <div>
              <CardTitle className={`text-lg ${completed ? 'text-brand-700 dark:text-brand-300' : 'dark:text-white'}`}>
                {module.title}
              </CardTitle>
              <CardDescription className="dark:text-white/70">
                {module.description}
              </CardDescription>
            </div>
          </div>
          <Badge 
            variant={completed ? "outline" : "secondary"}
            className={completed ? "bg-brand-100 dark:bg-brand-700 dark:text-white" : "dark:bg-brand-600 dark:text-white"}
          >
            +{module.xp_reward} XP
          </Badge>
        </div>
      </CardHeader>
      <CardContent className={completed ? "opacity-70" : ""}>
        {completed ? (
          <div className="p-4 text-center">
            <p className="text-brand-600 dark:text-brand-300 font-medium">Módulo concluído! ✅</p>
            <p className="text-sm text-muted-foreground mt-1 dark:text-white/70">
              Você ganhou {module.xp_reward} XP com este módulo.
            </p>
          </div>
        ) : (
          <div className="p-4">
            <p className="text-muted-foreground dark:text-white/70">
              {module.type === 'exercises' 
                ? 'Exercícios práticos para fixar o conteúdo.' 
                : 'Clique para acessar este conteúdo.'}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
