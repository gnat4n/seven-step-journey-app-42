
import React, { useEffect, useState } from 'react';
import { useApp } from '@/context/AppContext';
import { AuthGuard } from '@/components/AuthGuard';
import { MainNav } from '@/components/MainNav';
import { User, DiaryEntry } from '@/types';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar } from '@/components/Avatar';
import { JourneyProgress } from '@/components/JourneyProgress';
import { XPBar } from '@/components/XPBar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const Admin = () => {
  const { state, fetchUsers } = useApp();
  const { users, diaryEntries } = state;
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  
  // Filter users based on selected filter and search term
  const filteredUsers = users.filter(user => {
    // Apply step filter
    if (filter !== 'all' && filter.startsWith('step-')) {
      const stepFilter = parseInt(filter.replace('step-', ''), 10);
      if (user.current_step !== stepFilter) return false;
    }
    
    // Apply XP filter
    if (filter === 'xp-low' && user.xp_total >= 100) return false;
    if (filter === 'xp-medium' && (user.xp_total < 100 || user.xp_total >= 300)) return false;
    if (filter === 'xp-high' && user.xp_total < 300) return false;
    
    // Apply search term filter
    if (searchTerm && !user.email.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    
    return true;
  });
  
  // Get user diary entries
  const getUserDiaryEntries = (userId: string): DiaryEntry[] => {
    return diaryEntries.filter(entry => entry.user_id === userId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 7); // Get only last 7 entries
  };
  
  return (
    <AuthGuard requireAdmin>
      <MainNav />
      <main className="container py-6">
        <div className="space-y-8">
          {/* Page Header */}
          <div>
            <h1 className="text-3xl font-serif font-bold text-brand-700 mb-2">
              Painel de Administração
            </h1>
            <p className="text-muted-foreground">
              Gerencie usuários e acompanhe o progresso da comunidade 7Steps
            </p>
          </div>
          
          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Buscar por email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-64">
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os usuários</SelectItem>
                  <SelectItem value="step-1">Passo 1</SelectItem>
                  <SelectItem value="step-2">Passo 2</SelectItem>
                  <SelectItem value="step-3">Passo 3</SelectItem>
                  <SelectItem value="step-4">Passo 4</SelectItem>
                  <SelectItem value="step-5">Passo 5</SelectItem>
                  <SelectItem value="step-6">Passo 6</SelectItem>
                  <SelectItem value="step-7">Passo 7</SelectItem>
                  <SelectItem value="xp-low">XP Baixo (0-99)</SelectItem>
                  <SelectItem value="xp-medium">XP Médio (100-299)</SelectItem>
                  <SelectItem value="xp-high">XP Alto (300+)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Users Table */}
          <Card>
            <CardHeader>
              <CardTitle>Usuários ({filteredUsers.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuário</TableHead>
                    <TableHead>Progresso</TableHead>
                    <TableHead>XP</TableHead>
                    <TableHead>Data de Entrada</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map(user => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar status={user.avatar_status} size="sm" />
                          <div>
                            <div className="font-medium">{user.email}</div>
                            <div className="text-xs text-muted-foreground">ID: {user.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <JourneyProgress compact />
                      </TableCell>
                      <TableCell>{user.xp_total}</TableCell>
                      <TableCell>
                        {new Date(user.created_at).toLocaleDateString('pt-BR')}
                      </TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              onClick={() => setSelectedUser(user)}
                            >
                              Detalhes
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                            {selectedUser && (
                              <>
                                <DialogHeader>
                                  <DialogTitle className="text-xl text-brand-700">
                                    Detalhes do Usuário
                                  </DialogTitle>
                                </DialogHeader>
                                
                                <div className="mt-4">
                                  <Tabs defaultValue="overview">
                                    <TabsList>
                                      <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                                      <TabsTrigger value="diary">Diário</TabsTrigger>
                                    </TabsList>
                                    
                                    <TabsContent value="overview" className="mt-4">
                                      <div className="flex flex-col lg:flex-row gap-8">
                                        <div className="flex-1">
                                          <div className="flex items-center gap-4 mb-6">
                                            <Avatar status={selectedUser.avatar_status} size="lg" />
                                            <div>
                                              <h3 className="text-lg font-medium">{selectedUser.email}</h3>
                                              <p className="text-muted-foreground text-sm">
                                                Desde {new Date(selectedUser.created_at).toLocaleDateString('pt-BR')}
                                              </p>
                                            </div>
                                          </div>
                                          
                                          <div className="space-y-4">
                                            <div>
                                              <h4 className="text-sm font-medium text-muted-foreground mb-1">
                                                Progresso na Jornada
                                              </h4>
                                              <JourneyProgress />
                                            </div>
                                            
                                            <div>
                                              <h4 className="text-sm font-medium text-muted-foreground mb-1">
                                                XP e Nível
                                              </h4>
                                              <XPBar currentXP={selectedUser.xp_total} />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </TabsContent>
                                    
                                    <TabsContent value="diary" className="mt-4">
                                      <h3 className="text-lg font-medium mb-4">
                                        Últimas Entradas no Diário
                                      </h3>
                                      
                                      {getUserDiaryEntries(selectedUser.id).length > 0 ? (
                                        <div className="space-y-4">
                                          {getUserDiaryEntries(selectedUser.id).map(entry => (
                                            <Card key={entry.id}>
                                              <CardContent className="p-4">
                                                <div className="flex justify-between items-start">
                                                  <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                      <span className="font-medium">
                                                        {new Date(entry.date).toLocaleDateString('pt-BR')}
                                                      </span>
                                                      <span className="text-xs text-muted-foreground">
                                                        {new Date(entry.date).toLocaleTimeString('pt-BR', {
                                                          hour: '2-digit',
                                                          minute: '2-digit',
                                                        })}
                                                      </span>
                                                    </div>
                                                    
                                                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm mb-2">
                                                      <div className="flex items-center gap-1">
                                                        <span className="text-muted-foreground">Nível de fome:</span>
                                                        <span className="font-medium">{entry.hunger_level}/10</span>
                                                      </div>
                                                      
                                                      <div className="flex items-center gap-1">
                                                        <span className="text-muted-foreground">Fome emocional:</span>
                                                        <span className="font-medium">
                                                          {entry.emotional_hunger ? 'Sim' : 'Não'}
                                                        </span>
                                                      </div>
                                                      
                                                      <div className="flex items-center gap-1">
                                                        <span className="text-muted-foreground">Sentimento:</span>
                                                        <span className="font-medium">{entry.feeling}</span>
                                                      </div>
                                                    </div>
                                                    
                                                    {entry.notes && (
                                                      <p className="text-sm border-l-2 border-brand-200 pl-2 italic">
                                                        {entry.notes}
                                                      </p>
                                                    )}
                                                  </div>
                                                </div>
                                              </CardContent>
                                            </Card>
                                          ))}
                                        </div>
                                      ) : (
                                        <div className="text-center py-8">
                                          <p className="text-muted-foreground">
                                            Sem entradas no diário para este usuário.
                                          </p>
                                        </div>
                                      )}
                                    </TabsContent>
                                  </Tabs>
                                </div>
                              </>
                            )}
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                  
                  {filteredUsers.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        <p className="text-muted-foreground">
                          Nenhum usuário encontrado com os filtros selecionados.
                        </p>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </AuthGuard>
  );
};

export default Admin;
