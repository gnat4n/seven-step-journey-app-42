
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";
import Index from "./pages/Dashboard";
import Login from "./pages/Login";
import StepPage from "./pages/StepPage";
import Profile from "./pages/Profile";
import Diary from "./pages/Diary";
import ShoppingList from "./pages/ShoppingList";
import Recipes from "./pages/Recipes";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/passo/:stepId" element={<StepPage />} />
            <Route path="/perfil" element={<Profile />} />
            <Route path="/diario" element={<Diary />} />
            <Route path="/lista-compras" element={<ShoppingList />} />
            <Route path="/receitas" element={<Recipes />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
