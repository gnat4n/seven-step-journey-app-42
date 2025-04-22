
import React from 'react';
import { DiaryEntry, Emotion } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

type DiaryHistoryProps = {
  entries: DiaryEntry[];
};

export const DiaryHistory: React.FC<DiaryHistoryProps> = ({ entries }) => {
  // Sort entries by date (newest first)
  const sortedEntries = [...entries].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  // Group entries by date
  const groupedEntries: { [date: string]: DiaryEntry[] } = {};
  
  sortedEntries.forEach(entry => {
    const date = new Date(entry.date).toLocaleDateString('pt-BR');
    if (!groupedEntries[date]) {
      groupedEntries[date] = [];
    }
    groupedEntries[date].push(entry);
  });
  
  // Get emotion data
  const getEmotionData = (emotion: string) => {
    const emotionMap: { [key in Emotion]: { label: string; emoji: string } } = {
      'happy': { label: 'Feliz', emoji: '😊' },
      'sad': { label: 'Triste', emoji: '😢' },
      'anxious': { label: 'Ansiosa', emoji: '😰' },
      'calm': { label: 'Calma', emoji: '😌' },
      'tired': { label: 'Cansada', emoji: '😴' },
      'energetic': { label: 'Energética', emoji: '⚡' },
      'stressed': { label: 'Estressada', emoji: '😤' },
      'relaxed': { label: 'Relaxada', emoji: '🧘‍♀️' },
    };
    
    return emotionMap[emotion as Emotion] || { label: 'Desconhecido', emoji: '❓' };
  };

  if (entries.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground">Sem entradas no diário ainda. Complete o formulário para ver seu histórico.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-medium text-brand-700">Histórico do Diário</h3>
      
      {Object.entries(groupedEntries).map(([date, dayEntries]) => (
        <Card key={date} className="overflow-hidden">
          <CardHeader className="bg-brand-100 py-2">
            <CardTitle className="text-sm font-medium">{date}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {dayEntries.map((entry, index) => {
              const { emoji, label } = getEmotionData(entry.feeling);
              const time = new Date(entry.date).toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit'
              });
              
              return (
                <div key={entry.id} className="p-4">
                  {index > 0 && <Separator className="mb-4" />}
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">{emoji}</span>
                        <span className="font-medium">{label}</span>
                        <span className="text-xs text-muted-foreground">({time})</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                        <div className="flex items-center gap-1">
                          <span className="text-muted-foreground">Nível de fome:</span>
                          <span className="font-medium">{entry.hunger_level}/10</span>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <span className="text-muted-foreground">Fome emocional:</span>
                          <span className="font-medium">{entry.emotional_hunger ? 'Sim' : 'Não'}</span>
                        </div>
                      </div>
                      
                      {entry.notes && (
                        <p className="mt-2 text-sm border-l-2 border-brand-200 pl-2 italic">
                          {entry.notes}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
