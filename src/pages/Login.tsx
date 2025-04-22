
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { FirstLoginForm } from '@/components/FirstLoginForm';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Login = () => {
  const { state, login } = useApp();
  const { currentUser, isLoading } = state;
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showNameForm, setShowNameForm] = useState(false);

  // If user is already logged in and has a name, redirect to dashboard
  if (currentUser?.name) {
    return <Navigate to="/" replace />;
  }

  // If user is logged in but doesn't have a name, show name form
  if (currentUser && !currentUser.name) {
    return <FirstLoginForm />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!email || !email.includes('@')) {
      setError('Por favor, digite um e-mail válido');
      return;
    }
    
    setError('');
    setIsSubmitting(true);
    
    try {
      const success = await login(email);
      if (!success) {
        setError('E-mail não encontrado ou não autorizado');
      }
    } catch (error) {
      setError('Ocorreu um erro durante o login. Tente novamente.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-100/30 px-4">
      <div className="w-full max-w-md">
        <Card className="border-brand-200 shadow-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center font-serif text-brand-700">
              Bem-vinda ao 7Steps
            </CardTitle>
            <CardDescription className="text-center">
              Entre com seu e-mail de compra para acessar sua jornada
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                    required
                  />
                  {error && <p className="text-sm text-red-500">{error}</p>}
                </div>
                <Button 
                  type="submit" 
                  className="bg-brand-500 hover:bg-brand-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Entrando...' : 'Entrar'}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <p className="text-xs text-muted-foreground text-center mt-4">
              Ao entrar, você concorda com nossos termos de serviço e política de privacidade.
            </p>
          </CardFooter>
        </Card>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            Para fins de demonstração, você pode usar qualquer e-mail.
            <br />
            Para acessar o painel de admin, use um e-mail contendo "admin".
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
