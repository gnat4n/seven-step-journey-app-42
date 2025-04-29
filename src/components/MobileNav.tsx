
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { 
  Home, 
  BookOpen, 
  Grid, 
  ShoppingBag,
  Settings,
  MoreHorizontal,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';

export const MobileNav = () => {
  const { state } = useApp();
  const { currentUser } = state;
  const location = useLocation();
  const isMobile = useIsMobile();
  
  if (!isMobile || !currentUser) return null;
  
  const navItems = [
    { 
      path: '/', 
      label: 'Home', 
      icon: Home 
    },
    { 
      path: '/diario', 
      label: 'Diário', 
      icon: BookOpen 
    },
    { 
      path: '/adicionais', 
      label: 'Adicionais', 
      icon: Grid 
    }
  ];
  
  // Add recipes link if user has reached step 3
  if (currentUser && currentUser.current_step > 3) {
    navItems.push({ 
      path: '/receitas', 
      label: 'Receitas', 
      icon: ShoppingBag
    });
  }
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <motion.div 
      className="fixed bottom-0 left-0 right-0 bg-white dark:bg-brand-800 border-t border-gray-200 dark:border-brand-700 py-2 px-4 z-50"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="flex items-center justify-around">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center px-3 py-1 rounded-lg transition-colors",
              isActive(item.path) 
                ? "text-brand-600 dark:text-brand-400"
                : "text-gray-500 dark:text-gray-400 hover:text-brand-500 dark:hover:text-brand-300"
            )}
          >
            <item.icon size={22} className={cn(
              isActive(item.path) && "animate-bounce"
            )} />
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="flex flex-col items-center justify-center p-1 h-auto">
              <User size={22} className="text-gray-500 dark:text-gray-400" />
              <span className="text-xs mt-1 text-gray-500 dark:text-gray-400">Perfil</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="dark:bg-brand-700 dark:border-brand-600">
            <DropdownMenuItem asChild>
              <Link to="/perfil" className="flex items-center dark:text-white dark:focus:bg-brand-600">
                <Settings className="mr-2 h-4 w-4" />
                <span>Meu Perfil</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/lista-compras" className="flex items-center dark:text-white dark:focus:bg-brand-600">
                <ShoppingBag className="mr-2 h-4 w-4" />
                <span>Lista de Compras</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.div>
  );
};
