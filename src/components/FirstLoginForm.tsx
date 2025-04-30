
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { toast } from '@/components/ui/toast';
import { Logo } from '@/components/Logo';
import { motion } from 'framer-motion';

export const FirstLoginForm = () => {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { completeSignup } = useApp();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name) {
      toast({
        title: "Nome obrigatório",
        description: "Por favor, preencha seu nome para continuar.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      await completeSignup(name);
      navigate('/');
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro ao completar cadastro",
        description: "Não foi possível salvar seus dados. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-100/30 dark:bg-brand-800/50 p-4">
      <motion.div 
        className="w-full max-w-md"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="flex justify-center mb-6" variants={itemVariants}>
          <Logo size="lg" />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card className="border-brand-200 shadow-lg dark:border-brand-700 dark:bg-brand-800/70">
            <CardHeader>
              <CardTitle className="text-2xl text-center dark:text-white">Bem-vinda!</CardTitle>
              <CardDescription className="text-center dark:text-gray-300">
                Complete seu perfil para começar sua jornada
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="dark:text-gray-200">Como podemos te chamar?</Label>
                  <Input
                    id="name"
                    placeholder="Seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="dark:bg-brand-700/50 dark:border-brand-600 dark:text-white"
                    disabled={isLoading}
                    autoFocus
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-brand-500 hover:bg-brand-600 dark:bg-brand-500 dark:hover:bg-brand-600 dark:text-white"
                  disabled={isLoading}
                >
                  {isLoading ? 'Processando...' : 'Começar Jornada'}
                </Button>
              </form>
            </CardContent>
            <CardFooter>
              <p className="text-xs text-center w-full text-muted-foreground dark:text-gray-400">
                Ao continuar, você concorda com nossa política de privacidade e termos de uso.
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};
