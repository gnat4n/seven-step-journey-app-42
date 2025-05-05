

import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";
import { MobileNav } from "@/components/MobileNav";
import { ThemeProvider } from "@/context/ThemeContext";
import Index from "./pages/Dashboard";
import Login from "./pages/Login";
import FirstLogin from "./pages/FirstLogin";
import StepPage from "./pages/StepPage";
import StepExercisesPage from "./pages/StepExercisesPage";
import ModulePage from "./pages/ModulePage";
import ModuleExercisesPage from "./pages/ModuleExercisesPage";
import Profile from "./pages/Profile";
import Diary from "./pages/Diary";
import ShoppingList from "./pages/ShoppingList";
import Recipes from "./pages/Recipes";
import Extras from "./pages/Extras";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import { AuthGuard } from "./components/AuthGuard";

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <ThemeProvider>
          <TooltipProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/first-login" element={<FirstLogin />} />
                <Route path="/" element={<AuthGuard><Index /></AuthGuard>} />
                <Route path="/passo/:stepId" element={<AuthGuard><StepPage /></AuthGuard>} />
                <Route path="/passo/:stepId/exercicios" element={<AuthGuard><StepExercisesPage /></AuthGuard>} />
                <Route path="/passo/:stepId/modulo/:moduleId" element={<AuthGuard><ModulePage /></AuthGuard>} />
                <Route path="/passo/:stepId/exercicios/:moduleId" element={<AuthGuard><ModuleExercisesPage /></AuthGuard>} />
                <Route path="/perfil" element={<AuthGuard><Profile /></AuthGuard>} />
                <Route path="/diario" element={<AuthGuard><Diary /></AuthGuard>} />
                <Route path="/lista-compras" element={<AuthGuard><ShoppingList /></AuthGuard>} />
                <Route path="/adicionais" element={<AuthGuard><Extras /></AuthGuard>} />
                <Route path="/receitas" element={<AuthGuard><Recipes /></AuthGuard>} />
                <Route path="/admin" element={<AuthGuard requireAdmin={true}><Admin /></AuthGuard>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <MobileNav />
              <Toaster />
              <Sonner />
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </AppProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;

