
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, Check, Lightbulb } from 'lucide-react';

const NEGATIVE_THOUGHTS = [
  "Eu nunca vou conseguir parar de comer doces.",
  "Sou fraca, não tenho força de vontade com comida.",
  "Já estraguei a dieta, melhor continuar comendo mesmo.",
  "Não posso desperdiçar comida, preciso comer tudo.",
  "Não consigo controlar minha fome emocional."
];

export const ThoughtReprogramming = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(1);
  const [selectedThought, setSelectedThought] = useState('');
  const [customThought, setCustomThought] = useState('');
  const [positiveThought, setPositiveThought] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const { addXP } = useApp();

  const handleSelectThought = (thought: string) => {
    setSelectedThought(thought);
    setCustomThought('');
  };

  const effectiveThought = selectedThought || customThought;

  const handleNextStep = () => {
    if (step === 1 && effectiveThought) {
      setStep(2);
    } else if (step === 2 && positiveThought) {
      setIsComplete(true);
      setTimeout(() => {
        addXP(15);
        onComplete();
      }, 2000);
    }
  };

  const getExamplePositiveThought = () => {
    if (effectiveThought.includes("nunca vou conseguir")) {
      return "Eu posso aprender a ter uma relação equilibrada com doces, um passo de cada vez.";
    } else if (effectiveThought.includes("fraca") || effectiveThought.includes("força de vontade")) {
      return "Estou desenvolvendo autocompaixão e consciência com minha alimentação a cada dia.";
    } else if (effectiveThought.includes("estraguei") || effectiveThought.includes("dieta")) {
      return "Um deslize não define minha jornada. Posso voltar ao equilíbrio na próxima refeição.";
    } else if (effectiveThought.includes("desperdiçar")) {
      return "Respeitar meu corpo é mais importante que evitar desperdício de comida.";
    } else {
      return "Estou aprendendo a reconhecer meus gatilhos emocionais e a responder a eles de forma consciente.";
    }
  };

  if (isComplete) {
    return (
      <Card className="border-brand-200 shadow-md overflow-hidden bg-gradient-to-br from-brand-50 to-white">
        <CardContent className="p-8 flex flex-col items-center justify-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 animate-scale-in">
            <Check className="h-12 w-12 text-green-500" />
          </div>
          <h3 className="text-xl font-medium text-center text-brand-700 mb-2">Pensamento Reprogramado!</h3>
          <p className="text-center text-muted-foreground mb-4">
            Você ganhou 15 XP por completar este exercício.
          </p>
          
          <div className="w-full mt-4 space-y-3">
            <div className="p-3 bg-gray-100 rounded-md text-gray-700 border border-gray-200">
              <p className="text-sm italic">"{effectiveThought}"</p>
            </div>
            <div className="p-3 bg-brand-100 rounded-md text-brand-700 border border-brand-200">
              <p className="text-sm font-medium">"{positiveThought}"</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-brand-200 shadow-md overflow-hidden">
      <div className="h-1.5 bg-gray-100 w-full">
        <div 
          className="h-full bg-brand-500 transition-all duration-300" 
          style={{ width: step === 1 ? '50%' : '100%' }}
        ></div>
      </div>
      <CardHeader className="bg-gradient-to-r from-brand-500 to-brand-400 text-white">
        <CardTitle>Reprogramação de Pensamentos</CardTitle>
        <CardDescription className="text-white/90">
          Transforme pensamentos negativos sobre comida em afirmações positivas
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        {step === 1 ? (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-brand-50 p-4 rounded-lg border border-brand-100 space-y-2">
              <div className="flex items-start gap-2">
                <Lightbulb className="h-5 w-5 text-brand-600 mt-1 flex-shrink-0" />
                <p className="text-sm text-brand-700">
                  Selecione um pensamento negativo que você costuma ter sobre comida, 
                  ou escreva um personalizado abaixo:
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              {NEGATIVE_THOUGHTS.map((thought, index) => (
                <div 
                  key={index}
                  onClick={() => handleSelectThought(thought)}
                  className={`p-3 rounded-md cursor-pointer transition-all hover:bg-brand-50 ${
                    selectedThought === thought 
                      ? 'bg-brand-100 border border-brand-200' 
                      : 'bg-gray-50 border border-gray-200'
                  }`}
                >
                  <p className={`text-sm ${selectedThought === thought ? 'text-brand-700' : 'text-gray-700'}`}>
                    "{thought}"
                  </p>
                </div>
              ))}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="custom-thought">Ou escreva seu próprio pensamento negativo:</Label>
              <Textarea 
                id="custom-thought"
                placeholder="Ex: Não consigo controlar o que como quando estou estressada..."
                value={customThought}
                onChange={(e) => {
                  setCustomThought(e.target.value);
                  setSelectedThought('');
                }}
                className="resize-none"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4 animate-fade-in">
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-700 font-medium mb-1">Pensamento Original:</p>
              <p className="text-sm text-gray-600 italic">"{effectiveThought}"</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="positive-thought">
                Transforme este pensamento em uma afirmação positiva e realista:
              </Label>
              <Textarea 
                id="positive-thought"
                placeholder={getExamplePositiveThought()}
                value={positiveThought}
                onChange={(e) => setPositiveThought(e.target.value)}
                className="resize-none h-24"
              />
            </div>
            
            <div className="bg-brand-50 p-4 rounded-lg border border-brand-100">
              <p className="text-sm text-brand-700 mb-2 font-medium">Dica para uma afirmação eficaz:</p>
              <ul className="text-sm space-y-1 list-disc pl-5 text-brand-600">
                <li>Use o tempo presente</li>
                <li>Seja realista e específica</li>
                <li>Foque em suas forças e capacidades</li>
                <li>Use linguagem positiva</li>
              </ul>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t bg-gray-50 px-6 py-4">
        <Button 
          onClick={handleNextStep} 
          className="w-full bg-brand-500 hover:bg-brand-600 gap-2 transition-all transform hover:scale-105 duration-200"
          disabled={(step === 1 && !effectiveThought) || (step === 2 && !positiveThought)}
        >
          Continuar
          <ArrowRight className="h-5 w-5" />
        </Button>
      </CardFooter>
    </Card>
  );
};
