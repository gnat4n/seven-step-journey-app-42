
import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CircleCheck, Timer, ArrowRight } from 'lucide-react';

export const StopTimer = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(1);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const { addXP } = useApp();

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (isTimerRunning && timer < 100) {
      interval = setInterval(() => {
        setTimer(prev => {
          if (prev >= 100) {
            setIsTimerRunning(false);
            return 100;
          }
          return prev + 1;
        });
      }, 60); // Timer speed - higher value = slower timer
    }
    
    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  const handleNextStep = () => {
    if (step < 4) {
      setStep(step + 1);
      setTimer(0);
      setIsTimerRunning(true);
    } else {
      setIsCompleted(true);
      setTimeout(() => {
        addXP(20);
        onComplete();
      }, 2000);
    }
  };

  const getStepContent = () => {
    switch (step) {
      case 1:
        return {
          title: "S - Pare (Stop)",
          description: "Pare o que estiver fazendo por um momento.",
          action: "Feche os olhos e pare qualquer atividade por alguns segundos.",
          color: "from-blue-500 to-blue-400",
          icon: "🛑"
        };
      case 2:
        return {
          title: "T - Respire (Take a breath)",
          description: "Respire profundamente 3 vezes.",
          action: "Inspire pelo nariz contando até 4, segure por 2, expire pela boca contando até 6.",
          color: "from-green-500 to-green-400",
          icon: "💨"
        };
      case 3:
        return {
          title: "O - Observe",
          description: "Observe o que está sentindo sem julgamento.",
          action: "Perceba suas emoções, sensações corporais e pensamentos, apenas observe.",
          color: "from-purple-500 to-purple-400",
          icon: "👁️"
        };
      case 4:
        return {
          title: "P - Prossiga",
          description: "Decida conscientemente seu próximo passo.",
          action: "Com base no que observou, escolha conscientemente como agir agora.",
          color: "from-brand-500 to-brand-400",
          icon: "🚶"
        };
      default:
        return { 
          title: "", 
          description: "", 
          action: "", 
          color: "", 
          icon: "" 
        };
    }
  };

  const content = getStepContent();
  const progress = (step / 4) * 100;

  if (isCompleted) {
    return (
      <Card className="border-brand-200 shadow-md overflow-hidden">
        <CardContent className="p-8 flex flex-col items-center justify-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 animate-scale-in">
            <CircleCheck className="h-12 w-12 text-green-500" />
          </div>
          <h3 className="text-xl font-medium text-center text-brand-700 mb-2">Técnica STOP Concluída!</h3>
          <p className="text-center text-muted-foreground mb-4">
            Você ganhou 20 XP por completar este exercício.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-brand-200 shadow-md overflow-hidden">
      <div className="h-1.5 bg-gray-100 w-full">
        <div 
          className="h-full bg-brand-500 transition-all duration-300" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <CardHeader className={`bg-gradient-to-r ${content.color} text-white`}>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <span className="text-3xl">{content.icon}</span>
          {content.title}
        </CardTitle>
        <CardDescription className="text-white/90">
          Pratique cada etapa da técnica STOP para interromper padrões automáticos
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="text-center space-y-4">
          <h3 className="text-xl font-medium text-brand-700">{content.description}</h3>
          <div className="p-4 bg-brand-50 rounded-lg border border-brand-100">
            <p className="text-brand-700">{content.action}</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progresso</span>
            <span>{timer}%</span>
          </div>
          <Progress value={timer} className="h-2 w-full" />
        </div>
      </CardContent>
      <CardFooter className="border-t bg-gray-50 px-6 py-4">
        <Button 
          onClick={handleNextStep} 
          className="w-full bg-brand-500 hover:bg-brand-600 gap-2 transition-all transform hover:scale-105 duration-200"
          disabled={timer < 100}
        >
          {timer < 100 ? (
            <>
              <Timer className="h-5 w-5 animate-pulse" />
              Praticando...
            </>
          ) : (
            <>
              {step < 4 ? "Próximo Passo" : "Concluir Exercício"}
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
