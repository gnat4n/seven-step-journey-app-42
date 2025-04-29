
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useApp();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Por favor, preencha todos os campos.');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setIsLoading(false);
    }
  };

  // Demo login function for testing
  const handleDemoLogin = async () => {
    setIsLoading(true);
    try {
      await login('demo@7steps.com', 'demo123');
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao fazer login demonstrativo. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-100/30 px-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <img 
            src="/lovable-uploads/8802b8ff-8b05-41f8-82cd-7ef9c9355371.png" 
            alt="7Steps Logo" 
            className="h-16 mb-4"
          />
          <h1 className="text-2xl font-serif text-brand-700">Bem-vinda ao 7Steps!</h1>
          <p className="text-muted-foreground text-center mt-2">
            O método que bloqueia a fome em 7 passos
          </p>
        </div>

        <Card className="border-brand-200 shadow-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-center">Entrar</CardTitle>
            <CardDescription className="text-center">
              Entre com seu e-mail e senha para acessar sua conta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-brand-500 hover:bg-brand-600"
                disabled={isLoading}
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center w-full text-muted-foreground">
              <span>Ainda não tem uma conta? </span>
              <Link to="#" className="text-brand-600 hover:underline">
                Clique aqui
              </Link>
            </div>
            <Button 
              variant="outline"
              className="w-full border-brand-200 hover:bg-brand-50"
              onClick={handleDemoLogin}
              disabled={isLoading}
            >
              Acessar versão demo
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
