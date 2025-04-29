
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { usePwaInstall } from '@/hooks/usePwaInstall';
import { Download } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { state, login } = useApp();
  const navigate = useNavigate();
  const { isInstallable, installApp } = usePwaInstall();

  useEffect(() => {
    if (state.currentUser) {
      if (!state.currentUser.name) {
        navigate('/first-login');
      } else {
        navigate('/');
      }
    }
  }, [state.currentUser, navigate]);

  const handleInstall = async () => {
    try {
      await installApp();
    } catch (error) {
      console.error('Error installing app:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) return;
    
    setIsLoading(true);
    
    try {
      const success = await login(email);
      
      if (success) {
        // We won't navigate here, the useEffect will handle navigation
        // based on whether the user has a name or not
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (state.currentUser) {
    return null; // The useEffect will handle redirection
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-brand-50 via-white to-brand-100 dark:from-brand-800 dark:via-brand-800 dark:to-brand-700 animate-gradient-x p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="mb-6 text-center transform hover:scale-105 transition-transform duration-300">
          <img 
            src="/lovable-uploads/8802b8ff-8b05-41f8-82cd-7ef9c9355371.png" 
            alt="7Steps Logo" 
            className="h-12 mx-auto mb-4 drop-shadow-lg"
          />
          <p className="text-muted-foreground animate-fade-in opacity-0 animation-delay-200 dark:text-white/70">
            Bloqueie a Fome em 7 Passos
          </p>
        </div>

        <Card className="border-brand-200 shadow-lg backdrop-blur-sm bg-white/90 dark:bg-brand-800/90 dark:border-brand-700 transform hover:shadow-xl transition-all duration-300">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center font-serif bg-gradient-to-r from-brand-600 to-brand-800 bg-clip-text text-transparent dark:from-brand-300 dark:to-brand-100">
              Bem-vinda ao 7Steps!
            </CardTitle>
            <CardDescription className="text-center animate-fade-in opacity-0 animation-delay-300 dark:text-white/70">
              Entre com seu e-mail de compra para acessar sua jornada
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="animate-fade-in opacity-0 animation-delay-400">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="dark:text-white">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu.email@exemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="transition-all duration-300 focus:ring-2 focus:ring-brand-400 hover:border-brand-300 dark:bg-brand-700 dark:text-white dark:border-brand-600"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="bg-brand-500 hover:bg-brand-600 dark:bg-brand-400 dark:hover:bg-brand-300 dark:text-brand-900 transform hover:scale-[1.02] active:scale-95 transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? 'Entrando...' : 'Entrar'}
                </Button>
              </div>
            </form>
          </CardContent>
          {isInstallable && (
            <CardFooter className="flex flex-col border-t pt-4 animate-fade-in opacity-0 animation-delay-500 dark:border-brand-700">
              <p className="text-sm text-muted-foreground mb-2 text-center dark:text-white/70">
                Instale o aplicativo para acesso rápido mesmo offline!
              </p>
              <Button 
                variant="outline" 
                className="w-full border-brand-300 text-brand-700 hover:bg-brand-100 dark:border-brand-500 dark:text-white dark:hover:bg-brand-700 gap-2 transform hover:scale-[1.02] active:scale-95 transition-all duration-300"
                onClick={handleInstall}
              >
                <Download size={18} className="animate-bounce" />
                Instalar como Aplicativo
              </Button>
            </CardFooter>
          )}
        </Card>

        <div className="mt-8 text-center text-sm text-muted-foreground space-y-2 animate-fade-in opacity-0 animation-delay-600 dark:text-white/70">
          <p className="hover:text-brand-600 transition-colors duration-300">
            Comprou recentemente? Certifique-se de usar o mesmo e-mail da compra.
          </p>
          <p className="hover:text-brand-600 transition-colors duration-300">
            Problemas para acessar? Entre em contato pelo WhatsApp: (11) 99999-9999
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
