
import React from 'react';
import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const TRIGGERS = [
  { id: 'stress', label: 'Estresse' },
  { id: 'boredom', label: 'Tédio' },
  { id: 'sadness', label: 'Tristeza' },
  { id: 'anxiety', label: 'Ansiedade' },
  { id: 'tiredness', label: 'Cansaço' },
];

export const DiagnosticForm = ({ onComplete }: { onComplete: () => void }) => {
  const [selectedTriggers, setSelectedTriggers] = React.useState<string[]>([]);
  const { addXP } = useApp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addXP(20); // Award XP for completing the diagnostic
    onComplete();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Diagnóstico de Gatilhos</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            {TRIGGERS.map((trigger) => (
              <div key={trigger.id} className="flex items-center space-x-2">
                <Checkbox
                  id={trigger.id}
                  checked={selectedTriggers.includes(trigger.id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedTriggers([...selectedTriggers, trigger.id]);
                    } else {
                      setSelectedTriggers(selectedTriggers.filter(t => t !== trigger.id));
                    }
                  }}
                />
                <Label htmlFor={trigger.id}>{trigger.label}</Label>
              </div>
            ))}
          </div>
          <Button type="submit" className="w-full">Confirmar Seleção</Button>
        </form>
      </CardContent>
    </Card>
  );
};
