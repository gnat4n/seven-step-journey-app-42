
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { AuthGuard } from '@/components/AuthGuard';
import { MainNav } from '@/components/MainNav';
import { MobileNav } from '@/components/MobileNav';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingBag, BookOpen, Gift, Coffee, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const Extras = () => {
  const { state } = useApp();
  const { currentUser } = state;
  const navigate = useNavigate();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100 }
    }
  };
  
  const extras = [
    {
      id: 'shopping-list',
      title: 'Lista de Compras',
      description: 'Todos os itens recomendados para sua jornada 7Steps.',
      icon: ShoppingBag,
      color: 'from-green-400 to-teal-500',
      path: '/lista-compras',
      locked: false
    },
    {
      id: 'recipes',
      title: 'Receitas Especiais',
      description: '30 receitas exclusivas para manter a fome longe.',
      icon: BookOpen,
      color: 'from-orange-400 to-amber-500',
      path: '/receitas',
      locked: currentUser?.current_step < 3
    },
    {
      id: 'supplements',
      title: 'Suplementos',
      description: 'Conheça nossa linha de suplementos para potencializar resultados.',
      icon: Coffee,
      color: 'from-purple-400 to-indigo-500',
      path: '#',
      locked: true,
      comingSoon: true
    },
    {
      id: 'bonus',
      title: 'Bônus Exclusivos',
      description: 'Conteúdos especiais para assinantes premium.',
      icon: Gift,
      color: 'from-pink-400 to-rose-500',
      path: '#',
      locked: true,
      comingSoon: true
    }
  ];
  
  return (
    <AuthGuard>
      <MainNav />
      <main className="container py-6 pb-20 md:pb-6">
        <motion.div 
          className="flex flex-col items-center space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Page Header */}
          <motion.div 
            className="text-center"
            variants={itemVariants}
          >
            <h1 className="text-3xl font-serif font-bold text-brand-700 dark:text-brand-300 mb-2">
              Conteúdo Adicional
            </h1>
            <p className="text-muted-foreground dark:text-white/70 mb-6">
              Recursos exclusivos para complementar sua jornada
            </p>
          </motion.div>
          
          {/* Cards Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl"
            variants={containerVariants}
          >
            {extras.map((extra) => (
              <motion.div key={extra.id} variants={itemVariants}>
                <Card className="border-gray-200 dark:border-brand-700 overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                  <div className={`h-2 bg-gradient-to-r ${extra.color}`}></div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2 dark:text-white">
                          <extra.icon className="h-5 w-5 text-brand-500 dark:text-brand-400" />
                          {extra.title}
                          {extra.comingSoon && (
                            <span className="text-xs px-2 py-1 bg-brand-100 dark:bg-brand-700 text-brand-600 dark:text-brand-300 rounded-full">
                              Em breve
                            </span>
                          )}
                        </CardTitle>
                        <CardDescription className="dark:text-white/70">
                          {extra.description}
                        </CardDescription>
                      </div>
                      {extra.locked && (
                        <Lock className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-24 flex items-center justify-center bg-brand-50 dark:bg-brand-800 rounded-md">
                      <extra.icon className={`h-12 w-12 ${extra.locked ? 'text-gray-300 dark:text-gray-600' : `text-gradient-to-r ${extra.color} text-brand-500 dark:text-brand-400`}`} />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={() => extra.locked ? {} : navigate(extra.path)} 
                      className={`w-full ${
                        extra.locked 
                          ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed' 
                          : 'bg-brand-500 hover:bg-brand-600 dark:bg-brand-400 dark:hover:bg-brand-300 dark:text-brand-900'
                      }`}
                      disabled={extra.locked}
                    >
                      {extra.locked 
                        ? extra.comingSoon 
                          ? 'Em breve' 
                          : `Desbloqueie no Passo ${extra.id === 'recipes' ? '3' : '7'}`
                        : 'Acessar'}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </main>
      <MobileNav />
    </AuthGuard>
  );
};

export default Extras;
