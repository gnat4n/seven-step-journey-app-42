
import React, { useState } from 'react';
import { AuthGuard } from '@/components/AuthGuard';
import { MainNav } from '@/components/MainNav';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

type Item = {
  id: string;
  name: string;
  category: string;
  checked: boolean;
};

type Category = {
  id: string;
  name: string;
};

const ShoppingList = () => {
  // Define categories
  const categories: Category[] = [
    { id: 'base', name: 'Base' },
    { id: 'complementos', name: 'Complementos' },
    { id: 'semana1', name: 'Semana 1' },
    { id: 'semana2', name: 'Semana 2' },
    { id: 'especiais', name: 'Especiais' },
  ];
  
  // Initial items
  const initialItems: Item[] = [
    // Base
    { id: '1', name: 'Inulina em pó', category: 'base', checked: false },
    { id: '2', name: 'Espirulina em cápsulas ou pó', category: 'base', checked: false },
    { id: '3', name: 'Alho', category: 'base', checked: false },
    { id: '4', name: 'Cebola', category: 'base', checked: false },
    { id: '5', name: 'Limão', category: 'base', checked: false },
    
    // Complementos
    { id: '6', name: 'Aveia em flocos', category: 'complementos', checked: false },
    { id: '7', name: 'Sementes de chia', category: 'complementos', checked: false },
    { id: '8', name: 'Iogurte natural', category: 'complementos', checked: false },
    { id: '9', name: 'Pasta de amendoim', category: 'complementos', checked: false },
    { id: '10', name: 'Azeite extra virgem', category: 'complementos', checked: false },
    
    // Semana 1
    { id: '11', name: 'Vegetais folhosos', category: 'semana1', checked: false },
    { id: '12', name: 'Ovos', category: 'semana1', checked: false },
    { id: '13', name: 'Proteína (frango, peixe ou tofu)', category: 'semana1', checked: false },
    { id: '14', name: 'Banana verde', category: 'semana1', checked: false },
    { id: '15', name: 'Leite vegetal', category: 'semana1', checked: false },
    
    // Semana 2
    { id: '16', name: 'Quinoa', category: 'semana2', checked: false },
    { id: '17', name: 'Abacate', category: 'semana2', checked: false },
    { id: '18', name: 'Batata doce', category: 'semana2', checked: false },
    { id: '19', name: 'Castanhas variadas', category: 'semana2', checked: false },
    { id: '20', name: 'Chocolate 70% cacau', category: 'semana2', checked: false },
    
    // Especiais
    { id: '21', name: 'Raiz de chicória', category: 'especiais', checked: false },
    { id: '22', name: 'Yacon', category: 'especiais', checked: false },
    { id: '23', name: 'Frutas vermelhas', category: 'especiais', checked: false },
    { id: '24', name: 'Homus', category: 'especiais', checked: false },
    { id: '25', name: 'Whey protein (opcional)', category: 'especiais', checked: false },
  ];
  
  const [items, setItems] = useState<Item[]>(initialItems);
  
  const toggleItem = (id: string) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id 
          ? { ...item, checked: !item.checked } 
          : item
      )
    );
  };
  
  return (
    <AuthGuard>
      <MainNav />
      <main className="container py-6">
        <div className="flex flex-col items-center space-y-8">
          {/* Page Header */}
          <div className="text-center">
            <h1 className="text-3xl font-serif font-bold text-brand-700 mb-2">
              Lista de Compras
            </h1>
            <p className="text-muted-foreground mb-2">
              Todos os itens que você precisa para sua jornada 7Steps
            </p>
          </div>
          
          {/* Shopping List Tabs */}
          <div className="w-full max-w-3xl">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="all">Todos</TabsTrigger>
                {categories.map(category => (
                  <TabsTrigger key={category.id} value={category.id}>
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {/* All Items */}
              <TabsContent value="all" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Lista Completa</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {categories.map(category => (
                      <div key={category.id} className="mb-6">
                        <h3 className="font-medium text-brand-700 mb-2">{category.name}</h3>
                        <div className="space-y-3">
                          {items
                            .filter(item => item.category === category.id)
                            .map(item => (
                              <div key={item.id} className="flex items-center space-x-2">
                                <Checkbox 
                                  id={`item-${item.id}`} 
                                  checked={item.checked}
                                  onCheckedChange={() => toggleItem(item.id)}
                                />
                                <label
                                  htmlFor={`item-${item.id}`}
                                  className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                                    item.checked ? 'line-through text-muted-foreground' : ''
                                  }`}
                                >
                                  {item.name}
                                </label>
                              </div>
                            ))
                          }
                        </div>
                        {category.id !== 'especiais' && <Separator className="mt-4" />}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Category Tabs */}
              {categories.map(category => (
                <TabsContent key={category.id} value={category.id} className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>{category.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {items
                          .filter(item => item.category === category.id)
                          .map(item => (
                            <div key={item.id} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`${category.id}-item-${item.id}`} 
                                checked={item.checked}
                                onCheckedChange={() => toggleItem(item.id)}
                              />
                              <label
                                htmlFor={`${category.id}-item-${item.id}`}
                                className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                                  item.checked ? 'line-through text-muted-foreground' : ''
                                }`}
                              >
                                {item.name}
                              </label>
                            </div>
                          ))
                        }
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </main>
    </AuthGuard>
  );
};

export default ShoppingList;
