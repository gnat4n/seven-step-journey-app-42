
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";
import Index from "./pages/Dashboard";
import Login from "./pages/Login";
import FirstLogin from "./pages/FirstLogin";
import StepPage from "./pages/StepPage";
import Profile from "./pages/Profile";
import Diary from "./pages/Diary";
import ShoppingList from "./pages/ShoppingList";
import Recipes from "./pages/Recipes";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import { AuthGuard } from "./components/AuthGuard";

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <TooltipProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/first-login" element={<FirstLogin />} />
              <Route path="/" element={<AuthGuard><Index /></AuthGuard>} />
              <Route path="/passo/:stepId" element={<AuthGuard><StepPage /></AuthGuard>} />
              <Route path="/perfil" element={<AuthGuard><Profile /></AuthGuard>} />
              <Route path="/diario" element={<AuthGuard><Diary /></AuthGuard>} />
              <Route path="/lista-compras" element={<AuthGuard><ShoppingList /></AuthGuard>} />
              <Route path="/receitas" element={<AuthGuard><Recipes /></AuthGuard>} />
              <Route path="/admin" element={<AuthGuard requireAdmin={true}><Admin /></AuthGuard>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
            <Sonner />
          </BrowserRouter>
        </TooltipProvider>
      </AppProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
