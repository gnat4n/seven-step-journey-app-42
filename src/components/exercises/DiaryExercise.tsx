
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, PenLine } from 'lucide-react';

type DiaryExerciseProps = {
  title: string;
  description: string;
  moodOptions?: string[];
  promptQuestions?: string[];
  daysRequired?: number;
  onComplete: () => void;
};

export const DiaryExercise: React.FC<DiaryExerciseProps> = ({
  title,
  description,
  moodOptions = ['Excelente', 'Bom', 'Regular', 'Ruim', 'Péssimo'],
  promptQuestions = [],
  daysRequired = 1,
  onComplete
}) => {
  const [entries, setEntries] = useState<Array<{date: string, content: string, mood: string}>>([]);
  const [currentContent, setCurrentContent] = useState('');
  const [currentMood, setCurrentMood] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = () => {
    if (!currentContent.trim() || !currentMood) return;
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      const newEntry = {
        date: new Date().toISOString(),
        content: currentContent,
        mood: currentMood
      };
      
      setEntries([...entries, newEntry]);
      setCurrentContent('');
      setCurrentMood('');
      setIsSubmitting(false);
      
      if (entries.length + 1 >= daysRequired) {
        onComplete();
      }
    }, 1000);
  };
  
  // Format date string to local date
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const entriesRemaining = Math.max(0, daysRequired - entries.length);
  
  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="border-brand-200 dark:border-brand-700">
        <CardContent className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2 dark:text-white">{title}</h3>
            <p className="text-muted-foreground dark:text-white/70">{description}</p>
            
            {daysRequired > 1 && (
              <div className="mt-4 p-3 bg-brand-50 dark:bg-brand-700/50 rounded-lg">
                <p className="text-sm dark:text-white">
                  {entriesRemaining > 0
                    ? `Registre mais ${entriesRemaining} ${entriesRemaining === 1 ? 'entrada' : 'entradas'} para completar este exercício.`
                    : 'Você completou todas as entradas necessárias!'
                  }
                </p>
              </div>
            )}
          </div>
          
          {entries.length >= daysRequired ? (
            <div className="flex flex-col items-center py-6 space-y-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <p className="text-center font-medium text-green-600 dark:text-green-400">
                Exercício completo! Obrigado por compartilhar suas reflexões.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mood" className="dark:text-white">Como você está se sentindo hoje?</Label>
                <Select 
                  value={currentMood} 
                  onValueChange={setCurrentMood}
                >
                  <SelectTrigger id="mood" className="dark:bg-brand-700 dark:border-brand-600 dark:text-white">
                    <SelectValue placeholder="Selecione seu humor" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-brand-700 dark:border-brand-600">
                    {moodOptions.map((mood) => (
                      <SelectItem key={mood} value={mood} className="dark:text-white dark:focus:bg-brand-600 dark:focus:text-white">
                        {mood}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="diary-entry" className="dark:text-white">Reflexão do dia</Label>
                {promptQuestions.length > 0 && (
                  <div className="mb-3 space-y-2">
                    {promptQuestions.map((question, idx) => (
                      <p key={idx} className="text-sm italic text-muted-foreground dark:text-white/70">{question}</p>
                    ))}
                  </div>
                )}
                <Textarea
                  id="diary-entry"
                  placeholder="Compartilhe seus pensamentos e reflexões aqui..."
                  value={currentContent}
                  onChange={(e) => setCurrentContent(e.target.value)}
                  rows={5}
                  className="resize-none dark:bg-brand-700 dark:border-brand-600 dark:text-white dark:placeholder:text-white/50"
                />
              </div>
              
              <div className="flex justify-end mt-4">
                <Button 
                  onClick={handleSubmit}
                  disabled={!currentContent.trim() || !currentMood || isSubmitting}
                  className={`${
                    !currentContent.trim() || !currentMood
                      ? 'bg-gray-300 cursor-not-allowed dark:bg-gray-700'
                      : 'bg-brand-500 hover:bg-brand-600 dark:bg-brand-400 dark:hover:bg-brand-300 dark:text-brand-900'
                  }`}
                >
                  {isSubmitting ? 'Salvando...' : 'Salvar Entrada'}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {entries.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-md font-medium dark:text-white">Entradas Anteriores</h4>
          {entries.map((entry, index) => (
            <Card key={index} className="border-gray-200 dark:border-brand-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center text-sm text-muted-foreground dark:text-white/70">
                    <PenLine className="w-4 h-4 mr-1" />
                    {formatDate(entry.date)}
                  </div>
                  <span className="text-sm font-medium px-2 py-1 rounded-full bg-brand-50 text-brand-700 dark:bg-brand-700 dark:text-white">
                    {entry.mood}
                  </span>
                </div>
                <p className="text-sm whitespace-pre-wrap dark:text-white/90">{entry.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
