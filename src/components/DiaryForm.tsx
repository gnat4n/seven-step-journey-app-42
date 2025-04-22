
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Emotion } from '@/types';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';

const emotions: { value: Emotion; label: string; emoji: string }[] = [
  { value: 'happy', label: 'Feliz', emoji: '😊' },
  { value: 'sad', label: 'Triste', emoji: '😢' },
  { value: 'anxious', label: 'Ansiosa', emoji: '😰' },
  { value: 'calm', label: 'Calma', emoji: '😌' },
  { value: 'tired', label: 'Cansada', emoji: '😴' },
  { value: 'energetic', label: 'Energética', emoji: '⚡' },
  { value: 'stressed', label: 'Estressada', emoji: '😤' },
  { value: 'relaxed', label: 'Relaxada', emoji: '🧘‍♀️' },
];

export const DiaryForm: React.FC = () => {
  const { addDiaryEntry } = useApp();
  const [hungerLevel, setHungerLevel] = useState<number>(5);
  const [emotionalHunger, setEmotionalHunger] = useState<boolean>(false);
  const [feeling, setFeeling] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!feeling) {
      alert('Por favor, selecione como você está se sentindo.');
      return;
    }
    
    // Add diary entry
    addDiaryEntry({
      date: new Date().toISOString(),
      hunger_level: hungerLevel,
      emotional_hunger: emotionalHunger,
      feeling,
      notes,
    });
    
    // Reset form
    setHungerLevel(5);
    setEmotionalHunger(false);
    setFeeling('');
    setNotes('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
      <div className="space-y-3">
        <h3 className="text-lg font-medium">Como você está se sentindo hoje?</h3>
        
        <div className="space-y-1">
          <Label>Nível de fome antes da última refeição (1-10)</Label>
          <div className="flex items-center gap-4">
            <Slider 
              value={[hungerLevel]} 
              min={1} 
              max={10} 
              step={1} 
              onValueChange={(values) => setHungerLevel(values[0])}
              className="flex-1"
            />
            <span className="w-8 text-center font-bold text-brand-600">{hungerLevel}</span>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Sem fome</span>
            <span>Extrema fome</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch 
            id="emotional-hunger" 
            checked={emotionalHunger}
            onCheckedChange={setEmotionalHunger}
          />
          <Label htmlFor="emotional-hunger">Comi por emoção, não por fome física</Label>
        </div>
        
        <div className="space-y-1">
          <Label>Sentimento predominante hoje</Label>
          <div className="grid grid-cols-4 gap-2 mt-1">
            {emotions.map((emotion) => (
              <button
                key={emotion.value}
                type="button"
                className={`
                  flex flex-col items-center justify-center p-2 rounded-lg transition-all
                  ${feeling === emotion.value 
                    ? 'bg-brand-200 border-2 border-brand-500' 
                    : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                  }
                `}
                onClick={() => setFeeling(emotion.value)}
              >
                <span className="text-2xl mb-1">{emotion.emoji}</span>
                <span className="text-xs">{emotion.label}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="space-y-1">
          <Label htmlFor="notes">Notas do dia (opcional)</Label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Como foi seu dia? O que quer lembrar?"
            className="min-h-[100px]"
          />
        </div>
      </div>
      
      <Button type="submit" className="w-full bg-brand-500 hover:bg-brand-600">
        Salvar no Diário
      </Button>
    </form>
  );
};
