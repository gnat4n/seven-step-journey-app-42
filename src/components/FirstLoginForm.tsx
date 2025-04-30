import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from "@/hooks/use-toast";
import { useSignup } from '@/hooks/useSignup';

export const FirstLoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { completeSignup } = useSignup();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'male',
    goals: [] as string[],
    height: '',
    weight: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGoalChange = (goal: string) => {
    setFormData((prev) => {
      const goals = prev.goals.includes(goal)
        ? prev.goals.filter((g) => g !== goal)
        : [...prev.goals, goal];
      return { ...prev, goals };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { name, age, gender, goals, height, weight } = formData;

    if (!name || !age || !height || !weight) {
      toast.error('Por favor, preencha todos os campos obrigatórios.');
      setIsLoading(false);
      return;
    }

    const success = await completeSignup({
      name,
      age: Number(age),
      gender,
      goals,
      height: Number(height),
      weight: Number(weight),
    });

    if (success) {
      toast.success('Cadastro completo! Bem-vindo ao 7Steps!');
      navigate('/');
    } else {
      toast.error('Erro ao completar o cadastro. Tente novamente.');
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Nome</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="age">Idade</Label>
        <Input
          id="age"
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label>Gênero</Label>
        <RadioGroup value={formData.gender} onValueChange={handleChange}>
          <div className="flex space-x-4">
            <RadioGroupItem value="male" id="male" label="Masculino" />
            <RadioGroupItem value="female" id="female" label="Feminino" />
          </div>
        </RadioGroup>
      </div>
      <div>
        <Label>Objetivos</Label>
        <div className="flex space-x-4">
          <Checkbox
            id="goal1"
            checked={formData.goals.includes('perder peso')}
            onChange={() => handleGoalChange('perder peso')}
          />
          <Label htmlFor="goal1">Perder Peso</Label>
          <Checkbox
            id="goal2"
            checked={formData.goals.includes('ganhar massa')}
            onChange={() => handleGoalChange('ganhar massa')}
          />
          <Label htmlFor="goal2">Ganhar Massa</Label>
        </div>
      </div>
      <div>
        <Label htmlFor="height">Altura (cm)</Label>
        <Input
          id="height"
          name="height"
          type="number"
          value={formData.height}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="weight">Peso (kg)</Label>
        <Input
          id="weight"
          name="weight"
          type="number"
          value={formData.weight}
          onChange={handleChange}
          required
        />
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Carregando...' : 'Completar Cadastro'}
      </Button>
    </form>
  );
};
