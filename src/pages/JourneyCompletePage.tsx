
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MainNav } from '@/components/MainNav';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

const JourneyCompletePage = () => {
  const navigate = useNavigate();
  const { state } = useApp();
  const { currentUser } = state;
  
  return (
    <div className="flex flex-col min-h-screen">
      <MainNav />
      <div className="container py-8 flex-1 flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto bg-white dark:bg-brand-900/50 rounded-lg shadow-lg border border-brand-100 dark:border-brand-800 p-10"
        >
          <div className="flex justify-center mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Award className="h-16 w-16 text-brand-500 dark:text-brand-300" />
            </motion.div>
          </div>
          
          <motion.h1 
            className="text-3xl font-bold bg-gradient-to-r from-brand-500 to-brand-700 dark:from-brand-300 dark:to-brand-500 bg-clip-text text-transparent mb-6"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            SUA JORNADA ESTÁ APENAS COMEÇANDO
          </motion.h1>
          
          <motion.div
            className="prose prose-lg dark:prose-invert mx-auto mb-8 text-left"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            <p>Parabéns por chegar até aqui! Você agora possui um arsenal completo de ferramentas para controlar sua fome e transformar sua relação com a comida:</p>
            <ul className="space-y-2 list-disc list-inside">
              <li>Técnicas de reprogramação mental para quebrar o ciclo da fome emocional</li>
              <li>O poder da inulina para prolongar a saciedade física</li>
              <li>O segredo da espirulina para controlar os hormônios da fome</li>
              <li>Combinações alimentares que mantêm a fome longe por horas</li>
              <li>Estratégias práticas para implementar o método na sua rotina agitada</li>
              <li>Técnicas de reprogramação emocional para libertar-se do ciclo fome-emoção</li>
              <li>Estratégias para manter os resultados a longo prazo</li>
            </ul>
            
            <p className="mt-6">Lembre-se: esta não é apenas mais uma dieta. É uma transformação completa na sua relação com a comida e com seu corpo.</p>
            <p>A jornada não será perfeita, haverá altos e baixos, mas agora você tem o conhecimento para navegar por eles.</p>
            <p>Quando surgir um desafio, volte a este guia. Releia o capítulo que mais ressoa com sua dificuldade atual.</p>
            <p>Você merece se sentir livre da tirania da fome descontrolada. Você merece energia, vitalidade e paz com a comida.</p>
            <p>E lembre-se sempre: pequenos passos consistentes levam a grandes transformações.</p>
            <p className="font-bold">Estamos torcendo pelo seu sucesso!</p>
          </motion.div>
          
          <motion.div
            className="mt-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            <Button
              className="bg-brand-500 hover:bg-brand-600 dark:bg-brand-400 dark:hover:bg-brand-300 dark:text-brand-900 px-8 py-6 text-lg"
              size="lg"
              onClick={() => navigate('/')}
            >
              Voltar ao Dashboard
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default JourneyCompletePage;
