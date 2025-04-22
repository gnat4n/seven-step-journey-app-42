
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Check, Info, Lightbulb } from 'lucide-react';

const TRIGGERS = [
  { 
    id: 'stress', 
    label: 'Estresse', 
    description: 'Momentos de pressão e sobrecarga emocional que te levam a buscar conforto na comida.'
  },
  { 
    id: 'boredom', 
    label: 'Tédio', 
    description: 'Quando não há nada interessante para fazer e a comida se torna uma forma de entretenimento.'
  },
  { 
    id: 'sadness', 
    label: 'Tristeza', 
    description: 'Estados emocionais de baixa energia onde a comida parece oferecer consolo momentâneo.'
  },
  { 
    id: 'anxiety', 
    label: 'Ansiedade', 
    description: 'Sensação de inquietação e preocupação que te leva a comer como forma de acalmar.'
  },
  { 
    id: 'tiredness', 
    label: 'Cansaço', 
    description: 'Quando a exaustão física ou mental te leva a buscar energia em alimentos (geralmente açucarados).'
  },
];

export const DiagnosticForm = ({ onComplete }: { onComplete: () => void }) => {
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);
  const { addXP } = useApp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      setSubmitted(true);
      setTimeout(() => {
        addXP(20); // Award XP for completing the diagnostic
        onComplete();
      }, 3000);
    }
  };

  const renderFeedback = () => {
    if (selectedTriggers.length === 0) {
      return (
        <div className="bg-brand-100 p-4 rounded-lg animate-fade-in">
          <h3 className="font-medium text-brand-700 flex items-center gap-2">
            <Info className="h-5 w-5" />
            Parece que você não selecionou nenhum gatilho
          </h3>
          <p className="text-sm mt-2">
            Isso é incomum, mas não impossível! Você pode estar em um momento de maior conexão com sua fome física. 
            Continue praticando essa consciência.
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-6 animate-fade-in">
        <div className="bg-brand-100 p-4 rounded-lg">
          <h3 className="font-medium text-brand-700 flex items-center gap-2 mb-2">
            <Lightbulb className="h-5 w-5" />
            Seus principais gatilhos emocionais
          </h3>
          <div className="space-y-4">
            {selectedTriggers.map(triggerId => {
              const trigger = TRIGGERS.find(t => t.id === triggerId);
              return (
                <div key={triggerId} className="bg-white p-3 rounded-md shadow-sm">
                  <h4 className="text-brand-600 font-medium">{trigger?.label}</h4>
                  <p className="text-sm text-gray-600 mt-1">{trigger?.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-brand-50 p-4 rounded-lg border border-brand-200">
          <h3 className="font-medium text-brand-700 mb-2">Próximos passos</h3>
          <p className="text-sm text-gray-600">
            Agora que você identificou seus gatilhos, vamos trabalhar em estratégias para lidar com eles! 
            Nos próximos exercícios, você aprenderá técnicas específicas para cada um deles.
          </p>
        </div>
      </div>
    );
  };

  if (submitted) {
    return (
      <Card className="bg-gradient-to-br from-brand-50 to-white border-brand-200">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Check className="h-8 w-8 text-green-500" />
            </div>
            <h3 className="text-xl font-medium text-brand-700">Diagnóstico Concluído</h3>
            <p className="text-muted-foreground">Você ganhou 20 XP por este exercício!</p>
            <Progress value={100} className="h-2 w-full bg-brand-100" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden border-brand-200 shadow-md">
      <CardHeader className="bg-gradient-to-r from-brand-200 to-brand-100 pb-4">
        <CardTitle className="text-brand-700">Mapa Mental da Fome</CardTitle>
        <CardDescription>
          Identifique seus principais gatilhos emocionais que levam à fome emocional
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 ? (
            <>
              <div className="bg-brand-50 p-4 rounded-md border border-brand-100 mb-4 animate-fade-in">
                <p className="text-sm text-brand-700">
                  Selecione abaixo os gatilhos emocionais que você percebe que mais te levam a comer quando não está com fome física:
                </p>
              </div>
              <div className="space-y-3">
                {TRIGGERS.map((trigger) => (
                  <div 
                    key={trigger.id} 
                    className={`flex items-start space-x-3 p-3 rounded-md transition-colors ${
                      selectedTriggers.includes(trigger.id) 
                        ? 'bg-brand-100 border border-brand-200' 
                        : 'hover:bg-gray-50 border border-transparent'
                    }`}
                  >
                    <Checkbox
                      id={trigger.id}
                      className="mt-1"
                      checked={selectedTriggers.includes(trigger.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedTriggers([...selectedTriggers, trigger.id]);
                        } else {
                          setSelectedTriggers(selectedTriggers.filter(t => t !== trigger.id));
                        }
                      }}
                    />
                    <div className="space-y-1">
                      <Label 
                        htmlFor={trigger.id} 
                        className={`text-base font-medium ${selectedTriggers.includes(trigger.id) ? 'text-brand-700' : ''}`}
                      >
                        {trigger.label}
                      </Label>
                      <p className="text-sm text-muted-foreground">{trigger.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            renderFeedback()
          )}
          
          <Button 
            type="submit" 
            className="w-full bg-brand-500 hover:bg-brand-600 transition-all transform hover:scale-105 duration-200"
          >
            {step === 1 ? 'Confirmar Seleção' : 'Concluir Diagnóstico'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
