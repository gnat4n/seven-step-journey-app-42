
import React, { useState, useEffect } from 'react';
import { MainNav } from '@/components/MainNav';
import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { User, SupabaseUser } from '@/types';

const Admin = () => {
  const { state } = useApp();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        // In a real app, this would fetch from the API/Supabase
        const { data, error } = await supabase.from('usuarios').select('*');
        
        if (error) throw error;
        
        // Map the Supabase user format to our application's User format
        const mappedUsers = (data as SupabaseUser[] || []).map(dbUser => ({
          id: dbUser.id,
          email: dbUser.email,
          xp_total: dbUser.xp_total,
          current_step: dbUser.nivel_atual, // Mapping nivel_atual to current_step
          avatar_status: dbUser.avatar_status,
          is_admin: dbUser.admin, // Mapping admin to is_admin
          created_at: dbUser.created_at
        }));
        
        setUsers(mappedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);

  if (!state.currentUser?.is_admin) {
    return (
      <div className="flex flex-col min-h-screen">
        <MainNav />
        <div className="flex-1 container py-8 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-xl font-bold text-red-600 mb-2">Acesso Restrito</h1>
            <p>Você não tem permissão para acessar esta página.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <MainNav />
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Painel Administrativo</h1>
        
        <Tabs defaultValue="users">
          <TabsList>
            <TabsTrigger value="users">Usuários</TabsTrigger>
            <TabsTrigger value="content">Conteúdo</TabsTrigger>
            <TabsTrigger value="metrics">Métricas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="users" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciar Usuários</CardTitle>
                <CardDescription>
                  Lista de todos os usuários registrados no sistema.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-4">Carregando usuários...</div>
                ) : users.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-muted">
                          <th className="p-2 text-left">ID</th>
                          <th className="p-2 text-left">Email</th>
                          <th className="p-2 text-left">XP Total</th>
                          <th className="p-2 text-left">Passo Atual</th>
                          <th className="p-2 text-left">Data de Criação</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr key={user.id} className="border-b">
                            <td className="p-2">{user.id.substring(0, 8)}...</td>
                            <td className="p-2">{user.email}</td>
                            <td className="p-2">{user.xp_total}</td>
                            <td className="p-2">{user.current_step}</td>
                            <td className="p-2">{new Date(user.created_at).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-4">Nenhum usuário encontrado.</div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="content" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciar Conteúdo</CardTitle>
                <CardDescription>
                  Edite os passos e exercícios do programa.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Interface de edição de conteúdo será implementada em breve.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="metrics" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Métricas do Programa</CardTitle>
                <CardDescription>
                  Visualize estatísticas de uso e engajamento.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Total de Usuários</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-4xl font-bold">{users.length}</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Média de Progresso</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-4xl font-bold">
                        {users.length > 0
                          ? Math.round(
                              users.reduce((sum, user) => sum + user.current_step, 0) / users.length
                            )
                          : 0}
                        /7
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Média de XP</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-4xl font-bold">
                        {users.length > 0
                          ? Math.round(
                              users.reduce((sum, user) => sum + user.xp_total, 0) / users.length
                            )
                          : 0}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
