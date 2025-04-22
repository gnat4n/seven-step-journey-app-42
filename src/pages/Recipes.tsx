
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { AuthGuard } from '@/components/AuthGuard';
import { MainNav } from '@/components/MainNav';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

// Recipe type definition
type Recipe = {
  id: number;
  title: string;
  description: string;
  preparationTime: number;
  difficulty: 'easy' | 'medium' | 'hard';
  ingredients: string[];
  steps: string[];
  benefits: string[];
  tags: string[];
};

// Mock recipes data
const mockRecipes: Recipe[] = [
  {
    id: 1,
    title: "Smoothie de Espirulina e Inulina",
    description: "Um smoothie poderoso para começar o dia com saciedade duradoura.",
    preparationTime: 5,
    difficulty: "easy",
    ingredients: [
      "1 banana", 
      "1 colher de chá de espirulina", 
      "1 colher de chá de inulina", 
      "1 copo de leite vegetal", 
      "Gelo a gosto"
    ],
    steps: [
      "Adicione todos os ingredientes no liquidificador",
      "Bata até obter uma consistência homogênea",
      "Sirva imediatamente"
    ],
    benefits: [
      "Fornece proteínas de alta qualidade",
      "Estabiliza níveis de açúcar no sangue",
      "Cria sensação de saciedade duradoura"
    ],
    tags: ["café da manhã", "rápido", "espirulina", "inulina"]
  },
  {
    id: 2,
    title: "Omelete Nutritiva com Inulina",
    description: "Um café da manhã rico em proteínas e fibras para manter a fome longe.",
    preparationTime: 10,
    difficulty: "easy",
    ingredients: [
      "2 ovos",
      "1 colher de sopa de cebola picada (fonte de inulina)",
      "Folhas verdes picadas",
      "1 colher de chá de azeite",
      "Sal e pimenta a gosto"
    ],
    steps: [
      "Bata os ovos em uma tigela",
      "Aqueça o azeite em uma frigideira pequena",
      "Refogue a cebola levemente",
      "Adicione as folhas verdes e mexa rapidamente",
      "Despeje os ovos batidos e cozinhe até dourar",
      "Dobre ao meio e sirva"
    ],
    benefits: [
      "Proteína completa dos ovos",
      "Fibras da cebola e verduras",
      "Inulina natural da cebola"
    ],
    tags: ["café da manhã", "rápido", "proteico", "inulina"]
  },
  {
    id: 3,
    title: "Bowl de Proteína Completo",
    description: "Uma refeição balanceada para almoço ou jantar com todos os nutrientes necessários.",
    preparationTime: 20,
    difficulty: "medium",
    ingredients: [
      "100g de frango ou tofu grelhado",
      "1/3 xícara de quinoa cozida",
      "Mix de vegetais coloridos picados",
      "1/2 abacate fatiado",
      "1 colher de sopa de cebola roxa (fonte de inulina)",
      "1 colher de chá de espirulina",
      "1 colher de sopa de azeite",
      "Suco de limão, sal e pimenta a gosto"
    ],
    steps: [
      "Cozinhe a quinoa conforme instruções da embalagem",
      "Grelhe o frango ou tofu com temperos a gosto",
      "Prepare os vegetais",
      "Misture a espirulina com azeite e limão para fazer o molho",
      "Monte o bowl com quinoa na base, proteína e vegetais por cima",
      "Finalize com abacate e o molho de espirulina"
    ],
    benefits: [
      "Combinação perfeita de proteínas, fibras e gorduras saudáveis",
      "Nutrientes da espirulina potencializam saciedade",
      "Baixo índice glicêmico mantém energia estável"
    ],
    tags: ["almoço", "jantar", "proteico", "espirulina", "inulina"]
  },
  // Add more recipes as needed
];

const Recipes = () => {
  const { state } = useApp();
  const { currentUser } = state;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  
  // Filter recipes based on search term
  const filteredRecipes = mockRecipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  // Only users who completed step 3 should access recipes
  if (currentUser && currentUser.current_step <= 3) {
    return (
      <AuthGuard>
        <MainNav />
        <main className="container py-6">
          <div className="flex flex-col items-center space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-serif font-bold text-brand-700 mb-4">
                Receitas Especiais
              </h1>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                As receitas serão desbloqueadas após você completar o Passo 3 da sua jornada.
              </p>
              <Card className="max-w-md mx-auto">
                <CardContent className="p-6 text-center">
                  <p>Continue sua jornada para desbloquear 30 receitas exclusivas!</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </AuthGuard>
    );
  }
  
  return (
    <AuthGuard>
      <MainNav />
      <main className="container py-6">
        <div className="flex flex-col items-center space-y-8">
          {/* Page Header */}
          <div className="text-center">
            <h1 className="text-3xl font-serif font-bold text-brand-700 mb-2">
              Receitas Especiais
            </h1>
            <p className="text-muted-foreground mb-6">
              30 receitas exclusivas para manter a fome longe
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="w-full max-w-3xl">
            <Input
              type="search"
              placeholder="Buscar receitas por nome ou ingrediente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-6"
            />
          </div>
          
          {/* Selected Recipe Detail */}
          {selectedRecipe && (
            <Card className="w-full max-w-3xl mb-8">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{selectedRecipe.title}</CardTitle>
                    <p className="text-muted-foreground mt-1">{selectedRecipe.description}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="bg-brand-100 mb-2">
                      {selectedRecipe.difficulty === 'easy' ? 'Fácil' :
                       selectedRecipe.difficulty === 'medium' ? 'Médio' : 'Difícil'}
                    </Badge>
                    <p className="text-sm text-muted-foreground">
                      {selectedRecipe.preparationTime} min
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium text-brand-700 mb-2">Ingredientes</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedRecipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="text-sm">{ingredient}</li>
                    ))}
                  </ul>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium text-brand-700 mb-2">Modo de Preparo</h3>
                  <ol className="list-decimal list-inside space-y-2">
                    {selectedRecipe.steps.map((step, index) => (
                      <li key={index} className="text-sm">{step}</li>
                    ))}
                  </ol>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium text-brand-700 mb-2">Benefícios</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedRecipe.benefits.map((benefit, index) => (
                      <li key={index} className="text-sm">{benefit}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex flex-wrap gap-2">
                  {selectedRecipe.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardFooter>
            </Card>
          )}
          
          {/* Recipe Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-5xl">
            {filteredRecipes.map((recipe) => (
              <Card 
                key={recipe.id} 
                className="cursor-pointer hover:border-brand-300 transition-all"
                onClick={() => setSelectedRecipe(recipe)}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle className="text-lg">{recipe.title}</CardTitle>
                    <Badge variant="outline" className="bg-brand-50 text-xs">
                      {recipe.preparationTime} min
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {recipe.description}
                  </p>
                </CardContent>
                <CardFooter>
                  <div className="flex flex-wrap gap-1">
                    {recipe.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {recipe.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{recipe.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                </CardFooter>
              </Card>
            ))}
            
            {/* Show message if no recipes found */}
            {filteredRecipes.length === 0 && (
              <div className="col-span-full text-center p-8">
                <p className="text-muted-foreground">Nenhuma receita encontrada com "{searchTerm}"</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </AuthGuard>
  );
};

export default Recipes;
