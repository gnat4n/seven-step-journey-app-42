import React from 'react';
import { useApp } from '@/context/AppContext';
import { AuthGuard } from '@/components/AuthGuard';
import { MainNav } from '@/components/MainNav';
import { Avatar } from '@/components/Avatar';
import { JourneyProgress } from '@/components/JourneyProgress';
import { XPBar } from '@/components/XPBar';
import { AchievementsList } from '@/components/AchievementsList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const Profile = () => {
  const { state } = useApp();
  const { currentUser, achievements, diaryEntries } = state;
  
  // Calculate statistics
  const totalDiaryEntries = diaryEntries.filter(entry => 
    entry.user_id === currentUser?.id
  ).length;
  
  const completedSteps = (currentUser?.current_step || 1) - 1;
  const completionPercentage = Math.min(100, Math.round((completedSteps / 7) * 100));
  const unlockedAchievements = achievements.filter(a => a.unlocked).length;
  
  return (
    <AuthGuard>
      <MainNav />
      <main className="container py-6">
        <div className="flex flex-col items-center space-y-8">
          {/* Profile Header */}
          <div className="text-center">
            <h1 className="text-3xl font-serif font-bold text-brand-700 mb-2">
              Meu Perfil
            </h1>
            <p className="text-muted-foreground mb-6">
              Acompanhe seu progresso na jornada 7Steps
            </p>
          </div>
          
          {/* Avatar and User Info */}
          <div className="w-full max-w-3xl">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <Avatar status={currentUser?.avatar_status || 1} size="lg" withAnimation />
                  
                  <div className="flex-1">
                    <h2 className="text-xl font-medium mb-1">
                      {currentUser?.name || currentUser?.email?.split('@')[0]}
                    </h2>
                    <p className="text-muted-foreground text-sm mb-4">
                      {currentUser?.email}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Membro desde</p>
                        <p className="font-medium">
                          {currentUser?.created_at 
                            ? new Date(currentUser.created_at).toLocaleDateString('pt-BR') 
                            : '-'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Progresso total</p>
                        <p className="font-medium">{completionPercentage}%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Passos Concluídos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-brand-700">{completedSteps}/7</div>
                <p className="text-xs text-muted-foreground">
                  {completionPercentage}% da jornada concluída
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Total de XP</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-brand-700">{currentUser?.xp_total || 0}</div>
                <p className="text-xs text-muted-foreground">
                  Continue ganhando XP para subir de nível
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Entradas no Diário</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-brand-700">{totalDiaryEntries}</div>
                <p className="text-xs text-muted-foreground">
                  Cada entrada te dá +10 XP
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full max-w-3xl">
            <h3 className="text-xl font-medium text-brand-700 mb-4">Jornada</h3>
            <JourneyProgress />
          </div>
          
          <Separator className="max-w-3xl" />
          
          {/* XP and Level */}
          <div className="w-full max-w-3xl">
            <h3 className="text-xl font-medium text-brand-700 mb-4">Nível e XP</h3>
            <XPBar currentXP={currentUser?.xp_total || 0} />
          </div>
          
          <Separator className="max-w-3xl" />
          
          {/* Achievements */}
          <div className="w-full max-w-3xl">
            <AchievementsList achievements={achievements} />
          </div>
        </div>
      </main>
    </AuthGuard>
  );
};

export default Profile;
