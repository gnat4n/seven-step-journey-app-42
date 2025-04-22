
import React from 'react';
import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const StopTimer = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = React.useState(1);
  const { addXP } = useApp();

  const handleNextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      addXP(20);
      onComplete();
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return {
          title: "S - Pare (Stop)",
          description: "Pare o que estiver fazendo por um momento."
        };
      case 2:
        return {
          title: "T - Respire (Take a breath)",
          description: "Respire profundamente 3 vezes."
        };
      case 3:
        return {
          title: "O - Observe",
          description: "Observe o que está sentindo sem julgamento."
        };
      case 4:
        return {
          title: "P - Prossiga",
          description: "Decida conscientemente seu próximo passo."
        };
      default:
        return { title: "", description: "" };
    }
  };

  const content = renderStepContent();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Técnica STOP</CardTitle>
        <CardDescription>Pratique cada etapa da técnica STOP</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center space-y-4">
          <h3 className="text-xl font-medium">{content.title}</h3>
          <p className="text-muted-foreground">{content.description}</p>
        </div>
        <Button 
          onClick={handleNextStep} 
          className="w-full"
        >
          {step < 4 ? "Próximo Passo" : "Concluir Exercício"}
        </Button>
      </CardContent>
    </Card>
  );
};
