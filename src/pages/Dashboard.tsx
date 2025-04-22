import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { AuthGuard } from '@/components/AuthGuard';
import { MainNav } from '@/components/MainNav';
import { Avatar } from '@/components/Avatar';
import { JourneyProgress } from '@/components/JourneyProgress';
import { XPBar } from '@/components/XPBar';
import { AchievementsList } from '@/components/AchievementsList';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Dashboard = () => {
  const { state } = useApp();
  const { currentUser, achievements } = state;
  const navigate = useNavigate();
  
  return (
    <AuthGuard>
      <MainNav />
      <main className="container py-6">
        <div className="flex flex-col items-center space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-serif font-bold text-brand-700 mb-2">
              Sua Jornada 7Steps
            </h1>
            <p className="text-muted-foreground mb-6">
              Bem-vinda de volta, {currentUser?.name || currentUser?.email?.split('@')[0]}!
            </p>
            <Avatar status={currentUser?.avatar_status || 1} size="xl" withAnimation />
          </div>
          
          <div className="w-full max-w-3xl">
            <JourneyProgress />
          </div>
          
          <XPBar currentXP={currentUser?.xp_total || 0} />
          
          <Button 
            className="bg-brand-500 hover:bg-brand-600 text-lg py-6 px-8"
            onClick={() => navigate(`/passo/${currentUser?.current_step}`)}
          >
            {currentUser?.current_step === 1 
              ? 'Iniciar Minha Jornada' 
              : 'Continuar Minha Jornada'}
          </Button>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col items-center">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Passo Atual</h3>
                  <p className="text-2xl font-bold text-brand-700">
                    {currentUser?.current_step > 7 ? 'Concluído' : currentUser?.current_step}
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col items-center">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">XP Total</h3>
                  <p className="text-2xl font-bold text-brand-700">{currentUser?.xp_total || 0}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col items-center">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Conquistas</h3>
                  <p className="text-2xl font-bold text-brand-700">
                    {achievements.filter(a => a.unlocked).length}/{achievements.length}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="w-full max-w-3xl">
            <AchievementsList achievements={achievements} />
          </div>
        </div>
      </main>
    </AuthGuard>
  );
};

export default Dashboard;
