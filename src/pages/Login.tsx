import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/sonner';
import { usePwaInstall } from '@/hooks/usePwaInstall';
import { Download } from 'lucide-react';
const Login = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {
    login
  } = useApp();
  const navigate = useNavigate();
  const {
    installApp
  } = usePwaInstall();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Por favor, preencha o campo de e-mail.');
      return;
    }
    setIsLoading(true);
    try {
      await login(email);
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao fazer login. Verifique seu e-mail.');
    } finally {
      setIsLoading(false);
    }
  };

  // Demo login function for testing
  const handleDemoLogin = async () => {
    setIsLoading(true);
    try {
      await login('demo@7steps.com');
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao fazer login demonstrativo. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle PWA installation
  const handleInstall = async () => {
    try {
      const installed = await installApp();
      if (installed) {
        toast.success('Aplicativo instalado com sucesso!');
      } else {
        // If installation didn't happen through the browser API, show instructions
        toast.info('Para instalar o app: Use o menu do navegador e selecione "Adicionar à tela inicial".');
      }
    } catch (error) {
      console.error('Erro ao instalar o aplicativo:', error);
      toast.error('Não foi possível instalar o aplicativo. Tente novamente.');
    }
  };
  return <div className="min-h-screen flex items-center justify-center bg-brand-100/30 dark:bg-brand-800/50 px-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <img src="/lovable-uploads/8802b8ff-8b05-41f8-82cd-7ef9c9355371.png" alt="7Steps Logo" className="h-16 mb-4" />
          <h1 className="font-serif text-brand-700 dark:text-brand-300 text-2xl font-bold">Bem-vinda ao 7Steps!</h1>
          <p className="text-muted-foreground text-center mt-2 dark:text-gray-300">
            O método que bloqueia a fome em 7 passos
          </p>
        </div>

        <Card className="border-brand-200 shadow-md dark:border-brand-700 dark:bg-brand-800/70">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-center dark:text-white">Entrar</CardTitle>
            <CardDescription className="text-center dark:text-gray-300">
              Entre com seu e-mail para acessar sua conta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="dark:text-gray-200">E-mail</Label>
                <Input id="email" type="email" placeholder="seu@email.com" value={email} onChange={e => setEmail(e.target.value)} disabled={isLoading} className="dark:bg-brand-700/50 dark:border-brand-600 dark:text-white dark:placeholder-gray-400" required />
              </div>
              <Button type="submit" className="w-full bg-brand-500 hover:bg-brand-600 dark:bg-brand-500 dark:hover:bg-brand-600 dark:text-white" disabled={isLoading}>
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button variant="outline" className="w-full border-brand-200 hover:bg-brand-50 dark:border-brand-600 dark:text-white dark:hover:bg-brand-700 dark:hover:text-white flex items-center justify-center gap-2" onClick={handleInstall} disabled={isLoading}>
              <Download size={18} />
              Instalar o App
            </Button>
            
            
          </CardFooter>
        </Card>
      </div>
    </div>;
};
export default Login;