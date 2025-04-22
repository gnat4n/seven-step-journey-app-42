
import React from 'react';
import { useApp } from '@/context/AppContext';
import { AuthGuard } from '@/components/AuthGuard';
import { MainNav } from '@/components/MainNav';
import { DiaryForm } from '@/components/DiaryForm';
import { DiaryHistory } from '@/components/DiaryHistory';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Diary = () => {
  const { state } = useApp();
  const { currentUser, diaryEntries } = state;
  
  // Filter diary entries for the current user
  const userEntries = diaryEntries.filter(entry => 
    entry.user_id === currentUser?.id
  );
  
  return (
    <AuthGuard>
      <MainNav />
      <main className="container py-6">
        <div className="flex flex-col items-center space-y-8">
          {/* Page Header */}
          <div className="text-center">
            <h1 className="text-3xl font-serif font-bold text-brand-700 mb-2">
              Diário Emocional e Alimentar
            </h1>
            <p className="text-muted-foreground mb-2">
              Registre como você se sente e desenvolva consciência sobre sua fome emocional
            </p>
          </div>
          
          {/* Tabs for Form and History */}
          <div className="w-full max-w-3xl">
            <Tabs defaultValue="form" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="form">Nova Entrada</TabsTrigger>
                <TabsTrigger value="history">Histórico</TabsTrigger>
              </TabsList>
              
              <TabsContent value="form" className="mt-6">
                <DiaryForm />
              </TabsContent>
              
              <TabsContent value="history" className="mt-6">
                <DiaryHistory entries={userEntries} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </AuthGuard>
  );
};

export default Diary;
