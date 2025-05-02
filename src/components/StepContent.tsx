
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { JourneyStep, Exercise } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DiagnosticForm } from './exercises/DiagnosticForm';
import { StopTimer } from './exercises/StopTimer';
import { ThoughtReprogramming } from './exercises/ThoughtReprogramming';
import { QuizExercise } from './exercises/QuizExercise';
import { ChallengeExercise } from './exercises/ChallengeExercise';
import { DiaryExercise } from './exercises/DiaryExercise';
import { FormExercise } from './exercises/FormExercise';
import { DragDropExercise } from './exercises/DragDropExercise';
import { toast } from '@/components/ui/sonner';
import { CheckCircle, LockKeyhole, ArrowRight, BookOpen } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

type StepContentProps = {
  step: JourneyStep;
  onComplete: () => void;
  stepCompleted: boolean;
};

export const StepContent: React.FC<StepContentProps> = ({ 
  step, 
  onComplete,
  stepCompleted
}) => {
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);
  const [completedCards, setCompletedCards] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { state } = useApp();
  const navigate = useNavigate();
  
  // Use useEffect to initialize completedExercises with exercises that are completed
  useEffect(() => {
    if (stepCompleted) {
      // If the step is completed, mark all exercises as completed
      setCompletedExercises(step.exercises.map(ex => ex.id));
      setCompletedCards(['content', 'exercises']);
    }
  }, [step, stepCompleted]);
  
  const renderHtml = (html: string) => {
    return { __html: html };
  };

  const handleExerciseComplete = (exerciseId: number) => {
    if (!completedExercises.includes(exerciseId)) {
      setCompletedExercises(prev => [...prev, exerciseId]);
    }
  };

  const handleCardComplete = (cardId: string) => {
    if (!completedCards.includes(cardId)) {
      setCompletedCards(prev => [...prev, cardId]);
      toast.success(`Conteúdo concluído!`);
    }
  };

  const allExercisesCompleted = step.exercises.length > 0 && 
    step.exercises.every(ex => completedExercises.includes(ex.id));

  const allCardsCompleted = completedCards.includes('content') && completedCards.includes('exercises');

  const handleStepComplete = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      onComplete();
      setIsSubmitting(false);
      toast.success(`Passo ${step.id} concluído! Continue sua jornada.`);
    }, 800);
  };
  
  const handleNextStep = () => {
    if (state.steps.length > step.id) {
      navigate(`/passo/${step.id + 1}`);
    }
  };

  // Improved mental detox content with beautiful styling
  const mentalDetoxContent = `
    <div class="space-y-6">
      <div class="bg-brand-50 dark:bg-brand-900/30 p-6 rounded-xl border border-brand-100 dark:border-brand-700">
        <h2 class="text-2xl font-bold text-brand-700 dark:text-brand-300 mb-4">PASSO 1: DESINTOXICAÇÃO MENTAL</h2>
        
        <div class="flex items-start gap-4 mb-6">
          <div class="bg-brand-100 dark:bg-brand-800 p-3 rounded-full text-brand-600 dark:text-brand-300 mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-brain"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5V6a2 2 0 0 0 2 2h4.5A2.5 2.5 0 0 1 21 10.5V16a2 2 0 0 1-2 2h-2a2 2 0 0 0-2 2v2.5"/><path d="M7 16.5c-.31.34-.5.78-.5 1.25a2.5 2.5 0 0 0 5 0V18a2 2 0 0 1 2-2h2.5"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5V6a2 2 0 0 1-2 2H5.5A2.5 2.5 0 0 0 3 10.5V16a2 2 0 0 0 2 2h2a2 2 0 0 1 2 2v2.5"/><path d="M17 16.5c.31.34.5.78.5 1.25a2.5 2.5 0 0 1-5 0V18a2 2 0 0 0-2-2H8"/></svg>
          </div>
          <div>
            <h3 class="text-xl font-semibold text-brand-600 dark:text-brand-300">QUEBRANDO O CICLO MENTAL DA FOME EMOCIONAL</h3>
            <p class="mt-2 text-gray-700 dark:text-gray-300">Grande parte da nossa fome não tem nada a ver com necessidades nutricionais, mas sim com gatilhos emocionais. Antes de falarmos de alimentos e nutrientes, precisamos "limpar" nossa mente.</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white dark:bg-brand-800/60 p-6 rounded-xl border border-gray-200 dark:border-brand-700 shadow-sm">
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full text-amber-600 dark:text-amber-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lightbulb"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">IDENTIFICANDO SEUS GATILHOS</h3>
        </div>
        
        <p class="mb-3 text-gray-700 dark:text-gray-300">Na maioria das vezes, comemos por emoção sem nem perceber. Vamos identificar seus principais gatilhos:</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
          <div class="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 p-3 rounded-lg border border-red-100 dark:border-red-900/30">
            <div class="flex items-start gap-2">
              <span class="text-lg">😫</span>
              <div>
                <p class="font-medium text-red-700 dark:text-red-300">Estresse:</p>
                <p class="text-sm text-gray-700 dark:text-gray-300">"Dia difícil no trabalho? Mereço aquele chocolate!"</p>
              </div>
            </div>
          </div>
          
          <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-900/30">
            <div class="flex items-start gap-2">
              <span class="text-lg">😴</span>
              <div>
                <p class="font-medium text-blue-700 dark:text-blue-300">Tédio:</p>
                <p class="text-sm text-gray-700 dark:text-gray-300">"Não tenho nada para fazer... o que tem na geladeira?"</p>
              </div>
            </div>
          </div>
          
          <div class="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-3 rounded-lg border border-indigo-100 dark:border-indigo-900/30">
            <div class="flex items-start gap-2">
              <span class="text-lg">😢</span>
              <div>
                <p class="font-medium text-indigo-700 dark:text-indigo-300">Tristeza:</p>
                <p class="text-sm text-gray-700 dark:text-gray-300">"Estou chateada... um sorvete vai me fazer sentir melhor."</p>
              </div>
            </div>
          </div>
          
          <div class="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 p-3 rounded-lg border border-violet-100 dark:border-violet-900/30">
            <div class="flex items-start gap-2">
              <span class="text-lg">😰</span>
              <div>
                <p class="font-medium text-violet-700 dark:text-violet-300">Ansiedade:</p>
                <p class="text-sm text-gray-700 dark:text-gray-300">"Tenho uma reunião importante amanhã... preciso de algo para roer."</p>
              </div>
            </div>
          </div>
          
          <div class="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-3 rounded-lg border border-emerald-100 dark:border-emerald-900/30">
            <div class="flex items-start gap-2">
              <span class="text-lg">🥱</span>
              <div>
                <p class="font-medium text-emerald-700 dark:text-emerald-300">Cansaço:</p>
                <p class="text-sm text-gray-700 dark:text-gray-300">"Estou exausta... um docinho vai me dar energia."</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="bg-brand-50 dark:bg-brand-900/30 p-6 rounded-xl border border-brand-100 dark:border-brand-700">
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-brand-100 dark:bg-brand-800 p-2 rounded-full text-brand-600 dark:text-brand-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-hand"><path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8.5"/><path d="M6 18c0 2.2 1.8 4 4 4 1.5 0 3-.8 3.5-2"/><path d="M18 18c0 2.2-1.8 4-4 4"/></svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">TÉCNICA DO STOP</h3>
        </div>
        
        <p class="mb-4 text-gray-700 dark:text-gray-300">Quando sentir vontade de comer sem estar realmente com fome, pratique a técnica STOP:</p>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <div class="bg-white dark:bg-brand-800/60 p-4 rounded-lg border border-brand-200 dark:border-brand-700 flex flex-col items-center text-center">
            <div class="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-red-600 dark:text-red-300 mb-2">S</div>
            <p class="font-medium text-gray-800 dark:text-gray-100">Pare (Stop)</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">o que estiver fazendo</p>
          </div>
          
          <div class="bg-white dark:bg-brand-800/60 p-4 rounded-lg border border-brand-200 dark:border-brand-700 flex flex-col items-center text-center">
            <div class="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-300 mb-2">T</div>
            <p class="font-medium text-gray-800 dark:text-gray-100">Respire (Take a breath)</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">profundamente 3 vezes</p>
          </div>
          
          <div class="bg-white dark:bg-brand-800/60 p-4 rounded-lg border border-brand-200 dark:border-brand-700 flex flex-col items-center text-center">
            <div class="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center text-amber-600 dark:text-amber-300 mb-2">O</div>
            <p class="font-medium text-gray-800 dark:text-gray-100">Observe</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">o que está sentindo (sem julgamento)</p>
          </div>
          
          <div class="bg-white dark:bg-brand-800/60 p-4 rounded-lg border border-brand-200 dark:border-brand-700 flex flex-col items-center text-center">
            <div class="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-300 mb-2">P</div>
            <p class="font-medium text-gray-800 dark:text-gray-100">Prossiga</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">de forma consciente</p>
          </div>
        </div>
        
        <div class="mt-4 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg border border-yellow-100 dark:border-yellow-900/30 flex items-start">
          <div class="text-yellow-600 dark:text-yellow-300 mr-3 mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lightbulb"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
          </div>
          <p class="text-sm text-gray-700 dark:text-gray-300">Este intervalo de apenas 30 segundos pode ser suficiente para quebrar o piloto automático que nos leva à geladeira sem pensar.</p>
        </div>
      </div>
      
      <div class="bg-white dark:bg-brand-800/60 p-6 rounded-xl border border-gray-200 dark:border-brand-700 shadow-sm">
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full text-purple-600 dark:text-purple-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-brain"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5V6a2 2 0 0 0 2 2h4.5A2.5 2.5 0 0 1 21 10.5V16a2 2 0 0 1-2 2h-2a2 2 0 0 0-2 2v2.5"/><path d="M7 16.5c-.31.34-.5.78-.5 1.25a2.5 2.5 0 0 0 5 0V18a2 2 0 0 1 2-2h2.5"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5V6a2 2 0 0 1-2 2H5.5A2.5 2.5 0 0 0 3 10.5V16a2 2 0 0 0 2 2h2a2 2 0 0 1 2 2v2.5"/><path d="M17 16.5c.31.34.5.78.5 1.25a2.5 2.5 0 0 1-5 0V18a2 2 0 0 0-2-2H8"/></svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">REPROGRAMANDO PENSAMENTOS AUTOMÁTICOS</h3>
        </div>
        
        <p class="mb-4 text-gray-700 dark:text-gray-300">Nosso cérebro está cheio de pensamentos automáticos sobre comida que aceitamos como verdade, mas são apenas hábitos mentais:</p>
        
        <div class="space-y-4">
          <div class="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 rounded-lg overflow-hidden">
            <div class="p-3 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 dark:border-red-700">
              <p class="font-medium text-gray-800 dark:text-gray-200">Pensamento antigo:</p>
              <p class="text-red-700 dark:text-red-300">"Preciso limpar o prato."</p>
            </div>
            <div class="p-3 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 dark:border-green-700">
              <p class="font-medium text-gray-800 dark:text-gray-200">Reprogramação:</p>
              <p class="text-green-700 dark:text-green-300">"Posso parar quando me sentir satisfeita."</p>
            </div>
          </div>
          
          <div class="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 rounded-lg overflow-hidden">
            <div class="p-3 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 dark:border-red-700">
              <p class="font-medium text-gray-800 dark:text-gray-200">Pensamento antigo:</p>
              <p class="text-red-700 dark:text-red-300">"Mereço esse doce após um dia difícil."</p>
            </div>
            <div class="p-3 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 dark:border-green-700">
              <p class="font-medium text-gray-800 dark:text-gray-200">Reprogramação:</p>
              <p class="text-green-700 dark:text-green-300">"Mereço me sentir bem e energizada, não pesada e culpada."</p>
            </div>
          </div>
          
          <div class="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 rounded-lg overflow-hidden">
            <div class="p-3 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 dark:border-red-700">
              <p class="font-medium text-gray-800 dark:text-gray-200">Pensamento antigo:</p>
              <p class="text-red-700 dark:text-red-300">"Uma vez que comecei, não consigo parar."</p>
            </div>
            <div class="p-3 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 dark:border-green-700">
              <p class="font-medium text-gray-800 dark:text-gray-200">Reprogramação:</p>
              <p class="text-green-700 dark:text-green-300">"Cada mordida é uma nova escolha. Posso parar quando quiser."</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="bg-gradient-to-br from-brand-50 to-indigo-50 dark:from-brand-900/30 dark:to-indigo-900/30 p-6 rounded-xl border border-brand-100 dark:border-brand-700">
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-full text-indigo-600 dark:text-indigo-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-utensils"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">MINDFULNESS NA ALIMENTAÇÃO</h3>
        </div>
        
        <p class="mb-4 text-gray-700 dark:text-gray-300">Estudos científicos comprovam que a alimentação consciente reduz significativamente episódios de compulsão. Isso significa:</p>
        
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
          <div class="bg-white dark:bg-brand-800/60 p-4 rounded-lg border border-indigo-100 dark:border-indigo-800/50 flex flex-col items-center text-center">
            <div class="text-indigo-500 dark:text-indigo-300 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-smartphone-x"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/><path d="M9 9l6 6"/><path d="M15 9l-6 6"/></svg>
            </div>
            <p class="text-gray-700 dark:text-gray-300">Comer sem distrações (TV, celular, computador)</p>
          </div>
          
          <div class="bg-white dark:bg-brand-800/60 p-4 rounded-lg border border-indigo-100 dark:border-indigo-800/50 flex flex-col items-center text-center">
            <div class="text-indigo-500 dark:text-indigo-300 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <p class="text-gray-700 dark:text-gray-300">Mastigar lentamente, saboreando cada garfada</p>
          </div>
          
          <div class="bg-white dark:bg-brand-800/60 p-4 rounded-lg border border-indigo-100 dark:border-indigo-800/50 flex flex-col items-center text-center">
            <div class="text-indigo-500 dark:text-indigo-300 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart-handshake"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66"/><path d="m18 15-2-2"/><path d="m15 18-2-2"/></svg>
            </div>
            <p class="text-gray-700 dark:text-gray-300">Perceber quando está satisfeita (não necessariamente cheia)</p>
          </div>
        </div>
        
        <div class="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg border border-indigo-100 dark:border-indigo-800/50 mb-4">
          <div class="flex items-center gap-2">
            <div class="text-indigo-600 dark:text-indigo-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar-check"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="m9 16 2 2 4-4"/></svg>
            </div>
            <p class="font-semibold text-gray-800 dark:text-gray-100">DESAFIO DE 7 DIAS:</p>
          </div>
          <p class="mt-2 text-gray-700 dark:text-gray-300">Escolha pelo menos uma refeição por dia para praticar a alimentação consciente. Sente-se à mesa, sem distrações, e dedique pelo menos 15 minutos àquela refeição.</p>
        </div>
        
        <div class="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-100 dark:border-yellow-800/50">
          <div class="flex items-center gap-2">
            <div class="text-yellow-600 dark:text-yellow-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lightbulb"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
            </div>
            <p class="font-semibold text-gray-800 dark:text-gray-100">LEMBRE-SE:</p>
          </div>
          <p class="mt-2 text-gray-700 dark:text-gray-300">Pensamentos não são fatos. Quando vier aquele pensamento "Não vou aguentar ficar sem comer", observe-o como apenas um pensamento, não uma verdade absoluta.</p>
        </div>
      </div>
    </div>
  `;

  // Improved inulina content with beautiful styling for step 2
  const inulinaContent = `
    <div class="space-y-6">
      <div class="bg-brand-50 dark:bg-brand-900/30 p-6 rounded-xl border border-brand-100 dark:border-brand-700">
        <h2 class="text-2xl font-bold text-brand-700 dark:text-brand-300 mb-4">PASSO 2: O PODER DA INULINA</h2>
        
        <div class="flex items-start gap-4 mb-6">
          <div class="bg-brand-100 dark:bg-brand-800 p-3 rounded-full text-brand-600 dark:text-brand-300 mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-leaf"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
          </div>
          <div>
            <h3 class="text-xl font-semibold text-brand-600 dark:text-brand-300">O SEGREDO NATURAL PARA PROLONGAR A SACIEDADE</h3>
            <p class="mt-2 text-gray-700 dark:text-gray-300">Agora que começamos a trabalhar sua mente, vamos falar sobre algo que vai revolucionar sua fisiologia: a inulina.</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white dark:bg-brand-800/60 p-6 rounded-xl border border-gray-200 dark:border-brand-700 shadow-sm">
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-green-100 dark:bg-green-900/30 p-2 rounded-full text-green-600 dark:text-green-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-help-circle"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">O QUE É INULINA?</h3>
        </div>
        
        <div class="prose prose-brand dark:prose-invert max-w-none">
          <p>A inulina é uma fibra solúvel natural encontrada em diversos vegetais. Mas não é uma fibra qualquer - ela é considerada um prebiótico funcional com superpoderes contra a fome.</p>
          <p>Diferente de outras fibras, a inulina tem uma capacidade extraordinária: quando entra em contato com água no seu estômago, forma um gel que aumenta de volume, criando uma sensação de saciedade que dura horas!</p>
        </div>
      </div>
      
      <div class="bg-gradient-to-r from-brand-50 to-blue-50 dark:from-brand-900/30 dark:to-blue-900/30 p-6 rounded-xl border border-brand-100 dark:border-brand-700">
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full text-blue-600 dark:text-blue-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">COMO A INULINA BLOQUEIA SUA FOME</h3>
        </div>
        
        <p class="mb-3 text-gray-700 dark:text-gray-300">Imagine ter um assistente dentro do seu estômago trabalhando para você se sentir satisfeita por mais tempo. É exatamente isso que a inulina faz:</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div class="bg-white dark:bg-brand-800/60 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30 flex">
            <div class="mr-3 bg-blue-100 dark:bg-blue-900/50 h-8 w-8 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-300 font-medium">1</div>
            <div>
              <p class="text-gray-800 dark:text-gray-100">Forma um gel no estômago que ocupa espaço e reduz a capacidade física</p>
            </div>
          </div>
          
          <div class="bg-white dark:bg-brand-800/60 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30 flex">
            <div class="mr-3 bg-blue-100 dark:bg-blue-900/50 h-8 w-8 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-300 font-medium">2</div>
            <div>
              <p class="text-gray-800 dark:text-gray-100">Retarda o esvaziamento gástrico, fazendo a digestão durar mais tempo</p>
            </div>
          </div>
          
          <div class="bg-white dark:bg-brand-800/60 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30 flex">
            <div class="mr-3 bg-blue-100 dark:bg-blue-900/50 h-8 w-8 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-300 font-medium">3</div>
            <div>
              <p class="text-gray-800 dark:text-gray-100">Alimenta as bactérias benéficas do intestino, melhorando sua flora intestinal</p>
            </div>
          </div>
          
          <div class="bg-white dark:bg-brand-800/60 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30 flex">
            <div class="mr-3 bg-blue-100 dark:bg-blue-900/50 h-8 w-8 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-300 font-medium">4</div>
            <div>
              <p class="text-gray-800 dark:text-gray-100">Reduz a absorção de gorduras dos alimentos que você consome</p>
            </div>
          </div>
        </div>
        
        <div class="mt-4 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg border border-yellow-100 dark:border-yellow-900/30 flex items-start">
          <div class="text-yellow-600 dark:text-yellow-300 mr-3 mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          </div>
          <p class="text-sm text-gray-700 dark:text-gray-300">Tudo isso sem os efeitos colaterais de medicamentos para emagrecer!</p>
        </div>
      </div>
      
      <div class="bg-white dark:bg-brand-800/60 p-6 rounded-xl border border-gray-200 dark:border-brand-700 shadow-sm">
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-full text-emerald-600 dark:text-emerald-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-salad"><path d="M7 21h10"/><path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z"/><path d="M11.38 12a2.4 2.4 0 0 1-.4-4.77 2.4 2.4 0 0 1 3.2-2.77 3.2 3.2 0 0 1 3.47-1.63 2.4 2.4 0 0 1 2.33 3 2.4 2.4 0 0 1 1.2 5.6"/><path d="M13 12a3 3 0 0 0-2 5"/><path d="M10.57 5.76a5.24 5.24 0 0 0-6.35 1.69 3 3 0 0 0 .23 3.53"/></svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">ONDE ENCONTRAR INULINA</h3>
        </div>
        
        <p class="mb-4 text-gray-700 dark:text-gray-300">Você pode encontrar inulina naturalmente nestes alimentos:</p>
        
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          <div class="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 p-3 rounded-lg border border-emerald-100 dark:border-emerald-900/30 flex flex-col items-center text-center">
            <div class="text-emerald-600 dark:text-emerald-300 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sprout"><path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/></svg>
            </div>
            <p class="font-medium text-emerald-800 dark:text-emerald-200">Raiz de chicória</p>
            <p class="text-xs text-gray-600 dark:text-gray-400">Fonte mais rica</p>
          </div>
          
          <div class="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 p-3 rounded-lg border border-emerald-100 dark:border-emerald-900/30 flex flex-col items-center text-center">
            <div class="text-emerald-600 dark:text-emerald-300 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-potato"><path d="M10.93 4.69 8.07 7.97C7.46 8.84 7.46 9.97 8.07 10.84L12.76 19.26C13.57 20.57 15.46 20.57 16.27 19.26L18.86 14.84C19.86 13.05 20.23 10.94 19.95 8.91L19.07 2.35C18.95 1.4 18.18 .732 17.35 .873L10.93 2.12C9.9 2.45 9.3 3.33 9.3 4.33C9.3 4.45 9.3 4.57 9.32 4.69"/><path d="M14.39 8.11 12.89 11.89c-0.78 1.2-2.93 1.01-3.58-.32L7.05 7.69"/><path d="M17.2 14 16.3 16.1c-0.2 0.73-1.32 0.61-1.51-.16L14 12M11.3 14.25 12.1 17.75c0.2 0.97 1.38 0.83 1.57-.17L15.3 11.3"/></svg>
            </div>
            <p class="font-medium text-emerald-800 dark:text-emerald-200">Yacon</p>
            <p class="text-xs text-gray-600 dark:text-gray-400">Batata andina</p>
          </div>
          
          <div class="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 p-3 rounded-lg border border-emerald-100 dark:border-emerald-900/30 flex flex-col items-center text-center">
            <div class="text-emerald-600 dark:text-emerald-300 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-utensils-crossed"><path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8"/><path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7"/><path d="m2.1 21.8 6.4-6.3"/><path d="m19 5-7 7"/></svg>
            </div>
            <p class="font-medium text-emerald-800 dark:text-emerald-200">Alho</p>
          </div>
          
          <div class="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 p-3 rounded-lg border border-emerald-100 dark:border-emerald-900/30 flex flex-col items-center text-center">
            <div class="text-emerald-600 dark:text-emerald-300 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-dashed"><path d="M10.1 2.18a9.93 9.93 0 0 1 3.8 0"/><path d="M17.6 3.71a10.07 10.07 0 0 1 2.69 2.69"/><path d="M21.82 10.1a9.93 9.93 0 0 1 0 3.8"/><path d="M20.29 17.6a10.07 10.07 0 0 1-2.69 2.69"/><path d="M13.9 21.82a9.93 9.93 0 0 1-3.8 0"/><path d="M6.4 20.29a10.07 10.07 0 0 1-2.69-2.69"/><path d="M2.18 13.9a9.93 9.93 0 0 1 0-3.8"/><path d="M3.71 6.4a10.07 10.07 0 0 1 2.69-2.69"/></svg>
            </div>
            <p class="font-medium text-emerald-800 dark:text-emerald-200">Cebola</p>
          </div>
          
          <div class="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 p-3 rounded-lg border border-emerald-100 dark:border-emerald-900/30 flex flex-col items-center text-center">
            <div class="text-emerald-600 dark:text-emerald-300 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-banana"><path d="M4 13c3.5-2 8-2 10 2a5.5 5.5 0 0 1 8 5"/><path d="M5.15 17.89c5.52-1.52 8.65-6.89 7-12C11.55 4 11.5 2 13 2c3.22 0 5 5.5 5 8 0 .5-.5 2-1 2"/><path d="M18.15 14.89c-2.87-.79-5.85-.16-7.15 2"/></svg>
            </div>
            <p class="font-medium text-emerald-800 dark:text-emerald-200">Banana verde</p>
            <p class="text-xs text-gray-600 dark:text-gray-400">Ligeiramente verde</p>
          </div>
          
          <div class="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 p-3 rounded-lg border border-emerald-100 dark:border-emerald-900/30 flex flex-col items-center text-center">
            <div class="text-emerald-600 dark:text-emerald-300 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-wheat"><path d="M2 22 16 8"/><path d="M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1-5 0z"/><path d="M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1-5 0z"/><path d="M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1-5 0z"/><path d="M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z"/><path d="M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1 0-5z"/><path d="M15.47 13.47 17 15l-1.53 1.53a3.5 3.5 0 0 1 0-5z"/><path d="M19.47 9.47 21 11l-1.53 1.53a3.5 3.5 0 0 1 0-5z"/></svg>
            </div>
            <p class="font-medium text-emerald-800 dark:text-emerald-200">Trigo integral</p>
          </div>
          
          <div class="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 p-3 rounded-lg border border-emerald-100 dark:border-emerald-900/30 flex flex-col items-center text-center">
            <div class="text-emerald-600 dark:text-emerald-300 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-flower"><path d="M12 7.5a4.5 4.5 0 1 1 4.5 4.5M12 7.5A4.5 4.5 0 1 0 7.5 12M12 7.5V9m-4.5 3a4.5 4.5 0 1 0 4.5 4.5M7.5 12H9m7.5 0a4.5 4.5 0 1 1-4.5 4.5m4.5-4.5H15m-3 4.5V15"/><circle cx="12" cy="12" r="3"/><path d="m8 16 1.5-1.5"/><path d="M14.5 9.5 16 8"/><path d="m8 8 1.5 1.5"/><path d="M14.5 14.5 16 16"/></svg>
            </div>
            <p class="font-medium text-emerald-800 dark:text-emerald-200">Almeirão</p>
          </div>
        </div>
        
        <div class="mt-4 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-100 dark:border-green-900/30 flex items-start">
          <div class="text-green-600 dark:text-green-300 mr-3 mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lightbulb"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
          </div>
          <p class="text-sm text-gray-700 dark:text-gray-300"><strong>DICA PRÁTICA:</strong> Adicione uma cebola extra ao preparar suas refeições. Além de dar sabor, ela aumenta o teor de inulina do seu prato.</p>
        </div>
      </div>
      
      <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-900/30">
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full text-blue-600 dark:text-blue-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-flask-round"><path d="M10 2v7.31"/><path d="M14 9.3V2"/><path d="M8.5 2h7"/><path d="M14 9.3a6.5 6.5 0 1 1-4 0"/><path d="M5.52 16h12.96"/></svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">COMO USAR INULINA PARA MÁXIMO BENEFÍCIO</h3>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div class="bg-white dark:bg-brand-800/60 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30">
            <h4 class="font-medium text-blue-700 dark:text-blue-300 mb-2">Dosagem diária recomendada</h4>
            <p class="text-gray-700 dark:text-gray-300">5 a 20g por dia</p>
          </div>
          
          <div class="bg-white dark:bg-brand-800/60 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30">
            <h4 class="font-medium text-blue-700 dark:text-blue-300 mb-2">Uso ideal</h4>
            <p class="text-gray-700 dark:text-gray-300">Comece com doses menores (5g/dia) e aumente gradualmente para evitar desconforto intestinal inicial (gases, inchaço).</p>
          </div>
          
          <div class="bg-white dark:bg-brand-800/60 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30">
            <h4 class="font-medium text-blue-700 dark:text-blue-300 mb-2">Momento perfeito</h4>
            <p class="text-gray-700 dark:text-gray-300">Tome 500mg de inulina pura (em pó ou suplemento) em jejum, com um copo grande de água, 30 minutos antes do café da manhã. Isso criará uma "barreira de gel" no seu estômago antes mesmo de começar o dia.</p>
          </div>
          
          <div class="bg-white dark:bg-brand-800/60 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30">
            <h4 class="font-medium text-blue-700 dark:text-blue-300 mb-2">Para resultados visíveis</h4>
            <p class="text-gray-700 dark:text-gray-300">Use por pelo menos 15 dias consecutivos.</p>
          </div>
        </div>
        
        <div class="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-100 dark:border-blue-800/50">
          <h4 class="flex items-center gap-2 font-medium text-blue-700 dark:text-blue-300 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-flask-conical"><path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/></svg>
            RECEITA RÁPIDA: ÁGUA DE INULINA
          </h4>
          
          <ul class="space-y-2">
            <li class="flex items-center gap-2">
              <div class="h-1.5 w-1.5 rounded-full bg-blue-500 dark:bg-blue-400"></div>
              <span class="text-gray-700 dark:text-gray-300">1 colher de chá de inulina em pó (3g)</span>
            </li>
            <li class="flex items-center gap-2">
              <div class="h-1.5 w-1.5 rounded-full bg-blue-500 dark:bg-blue-400"></div>
              <span class="text-gray-700 dark:text-gray-300">1 copo de água (200ml)</span>
            </li>
            <li class="flex items-center gap-2">
              <div class="h-1.5 w-1.5 rounded-full bg-blue-500 dark:bg-blue-400"></div>
              <span class="text-gray-700 dark:text-gray-300">Suco de meio limão (opcional)</span>
            </li>
            <li class="flex items-center gap-2">
              <div class="h-1.5 w-1.5 rounded-full bg-blue-500 dark:bg-blue-400"></div>
              <span class="text-gray-700 dark:text-gray-300">Misture bem e tome em jejum</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div class="bg-white dark:bg-brand-800/60 p-6 rounded-xl border border-gray-200 dark:border-brand-700 shadow-sm">
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full text-purple-600 dark:text-purple-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkles"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">OUTROS BENEFÍCIOS DA INULINA</h3>
        </div>
        
        <p class="mb-4 text-gray-700 dark:text-gray-300">Além de controlar sua fome, a inulina oferece:</p>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <div class="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-3 rounded-lg border border-purple-100 dark:border-purple-900/30">
            <div class="flex items-center gap-2">
              <div class="text-purple-600 dark:text-purple-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <p class="text-gray-700 dark:text-gray-300">Melhora da digestão e combate à prisão de ventre</p>
            </div>
          </div>
          
          <div class="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-3 rounded-lg border border-purple-100 dark:border-purple-900/30">
            <div class="flex items-center gap-2">
              <div class="text-purple-600 dark:text-purple-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <p class="text-gray-700 dark:text-gray-300">Fortalecimento do sistema imunológico</p>
            </div>
          </div>
          
          <div class="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-3 rounded-lg border border-purple-100 dark:border-purple-900/30">
            <div class="flex items-center gap-2">
              <div class="text-purple-600 dark:text-purple-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <p class="text-gray-700 dark:text-gray-300">Redução do colesterol e triglicerídeos</p>
            </div>
          </div>
          
          <div class="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-3 rounded-lg border border-purple-100 dark:border-purple-900/30">
            <div class="flex items-center gap-2">
              <div class="text-purple-600 dark:text-purple-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <p class="text-gray-700 dark:text-gray-300">Prevenção de doenças intestinais</p>
            </div>
          </div>
          
          <div class="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-3 rounded-lg border border-purple-100 dark:border-purple-900/30">
            <div class="flex items-center gap-2">
              <div class="text-purple-600 dark:text-purple-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <p class="text-gray-700 dark:text-gray-300">Auxílio na absorção de minerais como cálcio</p>
            </div>
          </div>
        </div>
        
        <div class="mt-6 bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-100 dark:border-red-900/30 flex items-start">
          <div class="text-red-600 dark:text-red-300 mr-3 mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-alert-triangle"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
          </div>
          <p class="text-red-800 dark:text-red-200"><strong>ATENÇÃO:</strong> Se você tem síndrome do intestino irritável severa ou outras condições digestivas, consulte seu médico antes de aumentar significativamente seu consumo de inulina.</p>
        </div>
      </div>
    </div>
  `;

  const renderExercise = (exercise: Exercise) => {
    let ExerciseComponent;
    const isCompleted = completedExercises.includes(exercise.id);

    // Map exercise types to components based on step ID
    switch (exercise.type) {
      case 'form':
        if (step.id === 1 && exercise.id === 101) {
          ExerciseComponent = DiagnosticForm;
        } else if (step.id === 1 && exercise.id === 103) {
          ExerciseComponent = ThoughtReprogramming;
        } else {
          ExerciseComponent = FormExercise;
          return (
            <FormExercise
              title={exercise.title}
              description={exercise.description}
              fields={[
                { id: 'field1', label: 'Resposta 1', type: 'textarea', required: true, placeholder: 'Digite sua resposta...' },
                { id: 'field2', label: 'Resposta 2', type: 'textarea', required: false, placeholder: 'Complemento (opcional)...' }
              ]}
              onComplete={() => handleExerciseComplete(exercise.id)}
            />
          );
        }
        break;
      case 'challenge':
        if (step.id === 1 && exercise.id === 102) {
          ExerciseComponent = StopTimer;
        } else {
          return (
            <ChallengeExercise
              title={exercise.title}
              description={exercise.description}
              steps={exercise.content.split('.').filter(step => step.trim() !== '').map(step => step.trim())}
              onComplete={() => handleExerciseComplete(exercise.id)}
            />
          );
        }
        break;
      case 'quiz':
        return (
          <QuizExercise
            question={exercise.title}
            options={[
              { id: 'option1', text: 'Chicória', isCorrect: true },
              { id: 'option2', text: 'Banana Verde', isCorrect: true },
              { id: 'option3', text: 'Alho', isCorrect: true },
              { id: 'option4', text: 'Cebola', isCorrect: true },
              { id: 'option5', text: 'Yacon', isCorrect: true }
            ]}
            explanation="Todos estes alimentos são boas fontes de inulina, uma fibra solúvel que ajuda a prolongar a sensação de saciedade."
            onComplete={() => handleExerciseComplete(exercise.id)}
          />
        );
      case 'diary':
        return (
          <DiaryExercise
            title={exercise.title}
            description={exercise.description}
            promptQuestions={[
              'Como você se sentiu após aplicar a técnica?',
              'Notou diferença na sua fome?',
              'O que você aprendeu sobre seus padrões alimentares?'
            ]}
            daysRequired={3}
            onComplete={() => handleExerciseComplete(exercise.id)}
          />
        );
      case 'dragdrop':
        return (
          <DragDropExercise
            title={exercise.title}
            description={exercise.description}
            items={[
              { id: '1', content: 'Brócolis' },
              { id: '2', content: 'Frango' },
              { id: '3', content: 'Arroz Integral' },
              { id: '4', content: 'Azeite' },
              { id: '5', content: 'Espinafre' },
              { id: '6', content: 'Atum' },
              { id: '7', content: 'Quinoa' },
              { id: '8', content: 'Abacate' }
            ]}
            dropZones={[
              { id: 'vegetais', label: 'Vegetais (1/2 do prato)', items: [], maxItems: 2 },
              { id: 'proteinas', label: 'Proteínas (1/4 do prato)', items: [], maxItems: 2 },
              { id: 'carboidratos', label: 'Carboidratos (1/4 do prato)', items: [], maxItems: 2 },
              { id: 'gorduras', label: 'Gorduras Saudáveis', items: [], maxItems: 2 }
            ]}
            checkSolution={(zones) => {
              // Example validation logic
              const vegetais = zones.find(z => z.id === 'vegetais')?.items || [];
              const proteinas = zones.find(z => z.id === 'proteinas')?.items || [];
              const carboidratos = zones.find(z => z.id === 'carboidratos')?.items || [];
              const gorduras = zones.find(z => z.id === 'gorduras')?.items || [];
              
              return vegetais.length === 2 && proteinas.length === 2 && 
                     carboidratos.length === 2 && gorduras.length === 2;
            }}
            onComplete={() => handleExerciseComplete(exercise.id)}
          />
        );
      default:
        return null;
    }

    return (
      ExerciseComponent ? (
        <ExerciseComponent onComplete={() => handleExerciseComplete(exercise.id)} />
      ) : null
    );
  };

  // Code for Step 1, using improved content
  if (step.id === 1) {
    return (
      <div className="w-full max-w-3xl mx-auto mb-20">
        <div className="mb-8">
          <h3 className="text-xl font-medium text-brand-700 dark:text-brand-300 mb-6">
            Conteúdo do Passo
          </h3>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Card 1: Desintoxicação Mental */}
            <Card className={`overflow-hidden transition-all duration-300 hover:shadow-md border-${completedCards.includes('content') ? 'brand-200 dark:border-brand-500' : 'gray-200 dark:border-brand-700'}`}>
              <CardHeader className={`pb-2 ${completedCards.includes('content') ? 'bg-brand-50 dark:bg-brand-700/50' : ''}`}>
                <div className="flex justify-between">
                  <div className="flex items-start gap-2">
                    <div className="mt-1">
                      <BookOpen className="h-5 w-5 text-brand-500 dark:text-brand-300" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Desintoxicação Mental</CardTitle>
                      <CardDescription>Aprenda como quebrar o ciclo mental da fome emocional</CardDescription>
                    </div>
                  </div>
                  <Badge variant={completedCards.includes('content') ? "outline" : "secondary"} 
                    className={completedCards.includes('content') ? "bg-brand-100 dark:bg-brand-700 dark:text-white" : "dark:bg-brand-600 dark:text-white"}>
                    {completedCards.includes('content') ? 'Concluído' : 'Pendente'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <div className="text-sm text-muted-foreground mb-2">
                      Conteúdo sobre identificação de gatilhos emocionais e técnicas para controlar a fome emocional...
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="text-sm">
                      Aprenda a reconhecer quando sua fome é física ou emocional, e descubra técnicas para quebrar o ciclo da compulsão alimentar.
                    </div>
                  </HoverCardContent>
                </HoverCard>
                <Button 
                  onClick={() => {
                    const modal = document.createElement('div');
                    modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4';
                    modal.innerHTML = `
                      <div class="bg-white dark:bg-brand-800 rounded-lg shadow-lg w-full max-w-4xl max-h-[80vh] overflow-auto">
                        <div class="p-6">
                          <div class="flex justify-between items-center mb-4">
                            <h2 class="text-2xl font-bold text-brand-700 dark:text-brand-300">Desintoxicação Mental</h2>
                            <button class="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white">
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                          <div class="prose prose-brand dark:prose-invert max-w-none">
                            ${mentalDetoxContent}
                          </div>
                          <div class="mt-6 flex justify-end">
                            <button class="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-md">
                              Marcar como Concluído
                            </button>
                          </div>
                        </div>
                      </div>
                    `;
                    
                    document.body.appendChild(modal);
                    
                    // Close button handler
                    const closeButton = modal.querySelector('button');
                    closeButton?.addEventListener('click', () => {
                      document.body.removeChild(modal);
                    });
                    
                    // Complete button handler
                    const completeButton = modal.querySelectorAll('button')[1];
                    completeButton?.addEventListener('click', () => {
                      handleCardComplete('content');
                      document.body.removeChild(modal);
                    });
                  }}
                  className="w-full"
                  variant={completedCards.includes('content') ? "outline" : "default"}
                >
                  {completedCards.includes('content') ? 'Revisar Conteúdo' : 'Ler Conteúdo'}
                </Button>
              </CardContent>
            </Card>
            
            {/* Card 2: Exercícios Práticos */}
            <Card className={`overflow-hidden transition-all duration-300 hover:shadow-md border-${completedCards.includes('exercises') ? 'brand-200 dark:border-brand-500' : 'gray-200 dark:border-brand-700'}`}>
              <CardHeader className={`pb-2 ${completedCards.includes('exercises') ? 'bg-brand-50 dark:bg-brand-700/50' : ''}`}>
                <div className="flex justify-between">
                  <div className="flex items-start gap-2">
                    <div className="mt-1">
                      <BookOpen className="h-5 w-5 text-brand-500 dark:text-brand-300" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Exercícios Práticos</CardTitle>
                      <CardDescription>Fixe o conteúdo através de atividades práticas</CardDescription>
                    </div>
                  </div>
                  <Badge variant={completedCards.includes('exercises') ? "outline" : "secondary"} 
                    className={completedCards.includes('exercises') ? "bg-brand-100 dark:bg-brand-700 dark:text-white" : "dark:bg-brand-600 dark:text-white"}>
                    {completedCards.includes('exercises') ? 'Concluído' : 'Pendente'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <div className="text-sm text-muted-foreground mb-2">
                      Exercícios sobre Mapa Mental da Fome, Técnica STOP e Reprogramação de Pensamentos...
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="text-sm">
                      Atividades práticas que ajudarão você a aplicar as técnicas aprendidas no seu dia a dia, identificando gatilhos e criando novas respostas.
                    </div>
                  </HoverCardContent>
                </HoverCard>
                <Button 
                  onClick={() => navigate('/passo/1/exercicios')}
                  className="w-full"
                  variant={completedCards.includes('exercises') ? "outline" : "default"}
                >
                  {completedCards.includes('exercises') ? 'Revisar Exercícios' : 'Fazer Exercícios'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <Separator className="my-8 dark:bg-brand-700" />
        
        <div className="flex justify-center gap-4 mb-8">
          {!stepCompleted ? (
            <Button 
              onClick={handleStepComplete} 
              disabled={!allCardsCompleted || isSubmitting}
              className={`
                ${!allCardsCompleted 
                  ? 'bg-gray-300 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-700 cursor-not-allowed' 
                  : 'bg-brand-500 hover:bg-brand-600 dark:bg-brand-400 dark:hover:bg-brand-300 dark:text-brand-900 animate-pulse'
                }
                px-8 py-6 text-lg font-medium transition-all duration-300 transform hover:scale-105
              `}
              size="lg"
            >
              {isSubmitting ? 'Concluindo...' : 'Concluir Passo'}
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                size="lg"
                className="border-brand-200 hover:bg-brand-50 dark:border-brand-500 dark:hover:bg-brand-700 px-8 py-6"
              >
                Rever este passo
              </Button>
              
              <Button 
                onClick={handleNextStep}
                className="bg-brand-500 hover:bg-brand-600 dark:bg-brand-400 dark:hover:bg-brand-300 dark:text-brand-900 px-8 py-6 text-lg font-medium transition-all duration-300 transform hover:scale-105 gap-2"
                size="lg"
              >
                Próximo Passo <ArrowRight className="h-5 w-5" />
              </Button>
            </>
          )}
        </div>
        
        {!allCardsCompleted && !stepCompleted && (
          <div className="text-center text-sm text-muted-foreground dark:text-white/70">
            Complete o conteúdo e os exercícios para desbloquear o próximo passo da sua jornada.
          </div>
        )}
      </div>
    );
  }

  // Code for Step 2, with inulina content
  if (step.id === 2) {
    return (
      <div className="w-full max-w-3xl mx-auto mb-20">
        <div className="mb-8">
          <h3 className="text-xl font-medium text-brand-700 dark:text-brand-300 mb-6">
            Conteúdo do Passo
          </h3>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Card 1: O Poder da Inulina */}
            <Card className={`overflow-hidden transition-all duration-300 hover:shadow-md border-${completedCards.includes('content') ? 'brand-200 dark:border-brand-500' : 'gray-200 dark:border-brand-700'}`}>
              <CardHeader className={`pb-2 ${completedCards.includes('content') ? 'bg-brand-50 dark:bg-brand-700/50' : ''}`}>
                <div className="flex justify-between">
                  <div className="flex items-start gap-2">
                    <div className="mt-1">
                      <BookOpen className="h-5 w-5 text-brand-500 dark:text-brand-300" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">O Poder da Inulina</CardTitle>
                      <CardDescription>Aprenda como este superalimento controla sua fome</CardDescription>
                    </div>
                  </div>
                  <Badge variant={completedCards.includes('content') ? "outline" : "secondary"} 
                    className={completedCards.includes('content') ? "bg-brand-100 dark:bg-brand-700 dark:text-white" : "dark:bg-brand-600 dark:text-white"}>
                    {completedCards.includes('content') ? 'Concluído' : 'Pendente'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <div className="text-sm text-muted-foreground mb-2">
                      Conteúdo sobre a inulina, a fibra solúvel que revoluciona o controle da fome...
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="text-sm">
                      Descubra como a inulina forma um gel no estômago que aumenta a sensação de saciedade e ajuda no controle da fome por horas.
                    </div>
                  </HoverCardContent>
                </HoverCard>
                <Button 
                  onClick={() => {
                    const modal = document.createElement('div');
                    modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4';
                    modal.innerHTML = `
                      <div class="bg-white dark:bg-brand-800 rounded-lg shadow-lg w-full max-w-4xl max-h-[80vh] overflow-auto">
                        <div class="p-6">
                          <div class="flex justify-between items-center mb-4">
                            <h2 class="text-2xl font-bold text-brand-700 dark:text-brand-300">O Poder da Inulina</h2>
                            <button class="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white">
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                          <div class="prose prose-brand dark:prose-invert max-w-none">
                            ${inulinaContent}
                          </div>
                          <div class="mt-6 flex justify-end">
                            <button class="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-md">
                              Marcar como Concluído
                            </button>
                          </div>
                        </div>
                      </div>
                    `;
                    
                    document.body.appendChild(modal);
                    
                    // Close button handler
                    const closeButton = modal.querySelector('button');
                    closeButton?.addEventListener('click', () => {
                      document.body.removeChild(modal);
                    });
                    
                    // Complete button handler
                    const completeButton = modal.querySelectorAll('button')[1];
                    completeButton?.addEventListener('click', () => {
                      handleCardComplete('content');
                      document.body.removeChild(modal);
                    });
                  }}
                  className="w-full"
                  variant={completedCards.includes('content') ? "outline" : "default"}
                >
                  {completedCards.includes('content') ? 'Revisar Conteúdo' : 'Ler Conteúdo'}
                </Button>
              </CardContent>
            </Card>
            
            {/* Card 2: Exercícios Práticos */}
            <Card className={`overflow-hidden transition-all duration-300 hover:shadow-md border-${completedCards.includes('exercises') ? 'brand-200 dark:border-brand-500' : 'gray-200 dark:border-brand-700'}`}>
              <CardHeader className={`pb-2 ${completedCards.includes('exercises') ? 'bg-brand-50 dark:bg-brand-700/50' : ''}`}>
                <div className="flex justify-between">
                  <div className="flex items-start gap-2">
                    <div className="mt-1">
                      <BookOpen className="h-5 w-5 text-brand-500 dark:text-brand-300" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Exercícios Práticos</CardTitle>
                      <CardDescription>Fixe o conteúdo através de atividades práticas</CardDescription>
                    </div>
                  </div>
                  <Badge variant={completedCards.includes('exercises') ? "outline" : "secondary"} 
                    className={completedCards.includes('exercises') ? "bg-brand-100 dark:bg-brand-700 dark:text-white" : "dark:bg-brand-600 dark:text-white"}>
                    {completedCards.includes('exercises') ? 'Concluído' : 'Pendente'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <div className="text-sm text-muted-foreground mb-2">
                      Exercícios práticos sobre fontes de inulina, preparo da água de inulina...
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="text-sm">
                      Atividades que ajudarão você a incorporar a inulina na sua alimentação e aproveitar seus benefícios para o controle da fome.
                    </div>
                  </HoverCardContent>
                </HoverCard>
                <Button 
                  onClick={() => navigate('/passo/2/exercicios')}
                  className="w-full"
                  variant={completedCards.includes('exercises') ? "outline" : "default"}
                >
                  {completedCards.includes('exercises') ? 'Revisar Exercícios' : 'Fazer Exercícios'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <Separator className="my-8 dark:bg-brand-700" />
        
        <div className="flex justify-center gap-4 mb-8">
          {!stepCompleted ? (
            <Button 
              onClick={handleStepComplete} 
              disabled={!allCardsCompleted || isSubmitting}
              className={`
                ${!allCardsCompleted 
                  ? 'bg-gray-300 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-700 cursor-not-allowed' 
                  : 'bg-brand-500 hover:bg-brand-600 dark:bg-brand-400 dark:hover:bg-brand-300 dark:text-brand-900 animate-pulse'
                }
                px-8 py-6 text-lg font-medium transition-all duration-300 transform hover:scale-105
              `}
              size="lg"
            >
              {isSubmitting ? 'Concluindo...' : 'Concluir Passo'}
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                size="lg"
                className="border-brand-200 hover:bg-brand-50 dark:border-brand-500 dark:hover:bg-brand-700 px-8 py-6"
              >
                Rever este passo
              </Button>
              
              <Button 
                onClick={handleNextStep}
                className="bg-brand-500 hover:bg-brand-600 dark:bg-brand-400 dark:hover:bg-brand-300 dark:text-brand-900 px-8 py-6 text-lg font-medium transition-all duration-300 transform hover:scale-105 gap-2"
                size="lg"
              >
                Próximo Passo <ArrowRight className="h-5 w-5" />
              </Button>
            </>
          )}
        </div>
        
        {!allCardsCompleted && !stepCompleted && (
          <div className="text-center text-sm text-muted-foreground dark:text-white/70">
            Complete o conteúdo e os exercícios para desbloquear o próximo passo da sua jornada.
          </div>
        )}
      </div>
    );
  }

  // For other steps, use the original code
  return (
    <div className="w-full max-w-3xl mx-auto mb-20">
      <ScrollArea className="prose prose-brand max-w-none mb-8 max-h-[500px] overflow-auto pr-4 dark:prose-invert">
        <div 
          className="p-6 bg-white dark:bg-brand-800/60 rounded-lg shadow-sm border border-brand-100 dark:border-brand-700 transition-all duration-300"
          dangerouslySetInnerHTML={renderHtml(step.content)} 
        />
      </ScrollArea>
      
      <Separator className="my-8 dark:bg-brand-700" />
      
      <div className="mb-8">
        <h3 className="text-xl font-medium text-brand-700 dark:text-brand-300 mb-6 flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-700 text-brand-700 dark:text-brand-300 flex items-center justify-center text-sm font-bold">
            {step.exercises.length}
          </span>
          Exercícios Práticos
        </h3>
        <div className="space-y-6">
          {step.exercises.map(exercise => (
            <div key={exercise.id} className="mb-6 animate-fade-in">
              <Card className={`border-${completedExercises.includes(exercise.id) ? 'brand-200 dark:border-brand-500' : 'gray-200 dark:border-brand-700'} overflow-hidden transition-all duration-300 hover:shadow-md`}>
                <CardHeader className={`pb-2 ${completedExercises.includes(exercise.id) ? 'bg-brand-50 dark:bg-brand-700/50' : ''}`}>
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      {completedExercises.includes(exercise.id) && (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                      <div>
                        <CardTitle className={`text-lg ${completedExercises.includes(exercise.id) ? 'text-brand-700 dark:text-brand-300' : 'dark:text-white'}`}>
                          {exercise.title}
                        </CardTitle>
                        <CardDescription className="dark:text-white/70">{exercise.description}</CardDescription>
                      </div>
                    </div>
                    <Badge variant={completedExercises.includes(exercise.id) ? "outline" : "secondary"} className={completedExercises.includes(exercise.id) ? "bg-brand-100 dark:bg-brand-700 dark:text-white" : "dark:bg-brand-600 dark:text-white"}>
                      +{exercise.xp_reward} XP
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className={completedExercises.includes(exercise.id) ? "opacity-70" : ""}>
                  {completedExercises.includes(exercise.id) ? (
                    <div className="p-4 text-center">
                      <p className="text-brand-600 dark:text-brand-300 font-medium">Exercício concluído! ✅</p>
                      <p className="text-sm text-muted-foreground mt-1 dark:text-white/70">
                        Você ganhou {exercise.xp_reward} XP com este exercício.
                      </p>
                    </div>
                  ) : renderExercise(exercise)}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-center gap-4 mb-8">
        {!stepCompleted ? (
          <Button 
            onClick={handleStepComplete} 
            disabled={!allExercisesCompleted || isSubmitting}
            className={`
              ${!allExercisesCompleted 
                ? 'bg-gray-300 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-700 cursor-not-allowed' 
                : 'bg-brand-500 hover:bg-brand-600 dark:bg-brand-400 dark:hover:bg-brand-300 dark:text-brand-900 animate-pulse'
              }
              px-8 py-6 text-lg font-medium transition-all duration-300 transform hover:scale-105
            `}
            size="lg"
          >
            {isSubmitting ? 'Concluindo...' : 'Concluir Passo'}
          </Button>
        ) : (
          <>
            <Button
              variant="outline"
              size="lg"
              className="border-brand-200 hover:bg-brand-50 dark:border-brand-500 dark:hover:bg-brand-700 px-8 py-6"
            >
              Rever este passo
            </Button>
            
            <Button 
              onClick={handleNextStep}
              className="bg-brand-500 hover:bg-brand-600 dark:bg-brand-400 dark:hover:bg-brand-300 dark:text-brand-900 px-8 py-6 text-lg font-medium transition-all duration-300 transform hover:scale-105 gap-2"
              size="lg"
            >
              Próximo Passo <ArrowRight className="h-5 w-5" />
            </Button>
          </>
        )}
      </div>
      
      {!allExercisesCompleted && !stepCompleted && (
        <div className="text-center text-sm text-muted-foreground dark:text-white/70">
          Complete todos os exercícios para desbloquear o próximo passo da sua jornada.
        </div>
      )}
    </div>
  );
};
