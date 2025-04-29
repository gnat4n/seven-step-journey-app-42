
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from '@/components/ui/sonner';
import { usePwaInstall } from '@/hooks/usePwaInstall';
import { ArrowRight, Download } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState("");
  const { login } = useApp();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { isInstallable, installApp } = usePwaInstall();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error("Por favor, digite um email válido.");
      return;
    }
    
    setIsLoading(true);
    try {
      const success = await login(email);
      if (success) {
        navigate('/');
      } else {
        toast.error("Erro ao fazer login. Por favor, tente novamente.");
      }
    } catch (error) {
      toast.error("Ocorreu um erro. Por favor, tente novamente mais tarde.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleInstallApp = async () => {
    try {
      const installed = await installApp();
      if (!installed) {
        // Se não foi instalado (provavelmente iOS), mostrar instruções
        toast.info(
          "Para instalar em iOS: toque no ícone 'Compartilhar' e selecione 'Adicionar à Tela de Início'",
          { duration: 6000 }
        );
      }
    } catch (error) {
      toast.error("Não foi possível instalar o app. Por favor, tente novamente.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-brand-50 to-brand-100 dark:from-brand-900 dark:to-brand-800 px-4">
      <div className="w-full max-w-md flex flex-col items-center mb-8">
        <img 
          src="/lovable-uploads/8802b8ff-8b05-41f8-82cd-7ef9c9355371.png" 
          alt="7Steps Logo" 
          className="h-28 mb-4 drop-shadow-md"
        />
        <h1 className="text-2xl md:text-3xl font-bold text-brand-700 dark:text-white text-center">
          Bloqueie a Fome em 7 Passos
        </h1>
        <p className="text-brand-600/80 dark:text-brand-300/80 text-center mt-2 max-w-sm">
          Transforme sua relação com a comida e vença a compulsão alimentar
        </p>
      </div>

      <Card className="w-full max-w-md shadow-lg dark:bg-brand-800/50 dark:border-brand-700">
        <CardHeader>
          <CardTitle className="text-center text-brand-700 dark:text-brand-100">Acesse sua conta</CardTitle>
          <CardDescription className="text-center dark:text-brand-300/80">
            Informe seu e-mail para continuar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-brand-700 dark:text-brand-200">
                E-mail
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="dark:bg-brand-700 dark:border-brand-600 dark:text-white"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-brand-500 hover:bg-brand-600 dark:bg-brand-400 dark:hover:bg-brand-300 dark:text-brand-900"
              disabled={isLoading}
            >
              {isLoading ? "Entrando..." : "Entrar"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-brand-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-brand-600 dark:bg-brand-800 dark:text-brand-300">ou</span>
            </div>
          </div>
          
          <Button 
            type="button" 
            variant="outline" 
            className="w-full gap-2 border-brand-200 hover:bg-brand-50 dark:border-brand-600 dark:hover:bg-brand-700 dark:text-white"
            onClick={handleInstallApp}
          >
            <Download className="h-4 w-4" />
            Instalar o App
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
