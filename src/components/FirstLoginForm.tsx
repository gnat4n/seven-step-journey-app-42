import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
export const FirstLoginForm = () => {
  const [name, setName] = React.useState('');
  const {
    state,
    updateUser
  } = useApp();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      await updateUser({
        ...state.currentUser!,
        name: name.trim()
      });
      navigate('/');
    }
  };
  return <div className="min-h-screen flex items-center justify-center bg-brand-100/30 px-4">
      <div className="w-full max-w-md">
        <Card className="border-brand-200 shadow-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center font-serif text-brand-700 font-bold">
              Bem-vinda ao 7Steps!
            </CardTitle>
            <CardDescription className="text-center">
              Para começar, como você gostaria de ser chamada?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input id="name" type="text" placeholder="Digite seu nome" value={name} onChange={e => setName(e.target.value)} required />
                </div>
                <Button type="submit" className="bg-brand-500 hover:bg-brand-600">
                  Continuar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>;
};