
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { AuthGuard } from '@/components/AuthGuard';
import { MainNav } from '@/components/MainNav';
import { MobileNav } from '@/components/MobileNav';
import { Avatar } from '@/components/Avatar';
import { JourneyProgress } from '@/components/JourneyProgress';
import { XPBar } from '@/components/XPBar';
import { AchievementsList } from '@/components/AchievementsList';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { state } = useApp();
  const { currentUser, achievements } = state;
  const navigate = useNavigate();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
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
  
  // Function to create confetti effect on load if user completed all steps
  useEffect(() => {
    if (currentUser?.current_step > 7) {
      const createConfetti = () => {
        const colors = ['#d6bcfa', '#b392f0', '#9b87f5', '#7E69AB', '#6E59A5'];
        
        for (let i = 0; i < 50; i++) {
          const confetti = document.createElement('div');
          confetti.className = 'confetti';
          confetti.style.left = `${Math.random() * 100}vw`;
          confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
          confetti.style.animationDuration = `${Math.random() * 3 + 1}s`;
          confetti.style.animationDelay = `${Math.random() * 2}s`;
          document.body.appendChild(confetti);
          
          // Remove confetti after animation
          setTimeout(() => {
            if (confetti.parentNode) {
              confetti.parentNode.removeChild(confetti);
            }
          }, 5000);
        }
      };
      
      createConfetti();
    }
  }, [currentUser?.current_step]);
  
  return (
    <AuthGuard>
      <MainNav />
      <main className="container py-6 pb-20 md:pb-6 dark:bg-brand-800">
        <motion.div 
          className="flex flex-col items-center space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="text-center" variants={itemVariants}>
            <h1 className="text-3xl font-serif font-bold bg-gradient-to-r from-brand-600 to-brand-800 dark:from-brand-300 dark:to-brand-100 bg-clip-text text-transparent mb-2">
              Sua Jornada 7Steps
            </h1>
            <p className="text-muted-foreground dark:text-white/70 mb-6">
              Bem-vinda de volta, {currentUser?.name || currentUser?.email?.split('@')[0]}!
            </p>
            <Avatar status={currentUser?.avatar_status || 1} size="xl" withAnimation />
          </motion.div>
          
          <motion.div className="w-full max-w-3xl" variants={itemVariants}>
            <JourneyProgress />
          </motion.div>
          
          <motion.div className="w-full max-w-3xl" variants={itemVariants}>
            <XPBar currentXP={currentUser?.xp_total || 0} />
          </motion.div>
          
          <motion.div 
            className="flex justify-center w-full"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              className="bg-brand-500 hover:bg-brand-600 dark:bg-brand-400 dark:hover:bg-brand-300 dark:text-brand-900 text-lg py-6 px-8 shadow-lg transform transition-all duration-300"
              onClick={() => navigate(`/passo/${currentUser?.current_step}`)}
            >
              {currentUser?.current_step === 1 
                ? 'Iniciar Minha Jornada' 
                : currentUser?.current_step > 7
                  ? 'Revisar Minha Jornada'
                  : 'Continuar Minha Jornada'}
            </Button>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl"
            variants={itemVariants}
          >
            <Card className="border-brand-200 dark:border-brand-700 bg-white dark:bg-brand-800/60 transform transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
              <CardContent className="p-4">
                <div className="flex flex-col items-center">
                  <h3 className="text-sm font-medium text-muted-foreground dark:text-white/70 mb-1">Passo Atual</h3>
                  <p className="text-2xl font-bold text-brand-700 dark:text-brand-300">
                    {currentUser?.current_step > 7 ? 'Concluído' : currentUser?.current_step}
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-brand-200 dark:border-brand-700 bg-white dark:bg-brand-800/60 transform transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
              <CardContent className="p-4">
                <div className="flex flex-col items-center">
                  <h3 className="text-sm font-medium text-muted-foreground dark:text-white/70 mb-1">XP Total</h3>
                  <p className="text-2xl font-bold text-brand-700 dark:text-brand-300">{currentUser?.xp_total || 0}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-brand-200 dark:border-brand-700 bg-white dark:bg-brand-800/60 transform transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
              <CardContent className="p-4">
                <div className="flex flex-col items-center">
                  <h3 className="text-sm font-medium text-muted-foreground dark:text-white/70 mb-1">Conquistas</h3>
                  <p className="text-2xl font-bold text-brand-700 dark:text-brand-300">
                    {achievements.filter(a => a.unlocked).length}/{achievements.length}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div className="w-full max-w-3xl" variants={itemVariants}>
            <AchievementsList achievements={achievements} />
          </motion.div>
        </motion.div>
      </main>
      <MobileNav />
    </AuthGuard>
  );
};

export default Dashboard;
