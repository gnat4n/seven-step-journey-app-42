
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { useTheme } from '@/context/ThemeContext';
import { Avatar } from '@/components/Avatar';
import { XPBar } from '@/components/XPBar';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { motion } from 'framer-motion';

export const MainNav: React.FC = () => {
  const { state, logout } = useApp();
  const { currentUser } = state;
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  
  // Define main navigation links - removendo "Lista de Compras" e "Perfil" como solicitado
  const navLinks = [
    { path: '/', label: 'Dashboard' },
    { path: '/diario', label: 'Diário' },
    { path: '/adicionais', label: 'Adicionais' },
  ];
  
  // Add recipes link if user has reached step 3
  if (currentUser && currentUser.current_step > 3) {
    navLinks.push({ path: '/receitas', label: 'Receitas' });
  }
  
  // Add admin link for admin users
  if (currentUser?.is_admin) {
    navLinks.push({ path: '/admin', label: 'Admin' });
  }
  
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    }
  };
  
  return (
    <motion.header 
      className="sticky top-0 z-40 w-full border-b bg-background dark:bg-brand-800 dark:border-brand-700"
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container flex h-16 items-center justify-between py-4">
        {/* Logo */}
        <Logo size="sm" />
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-brand-500 dark:hover:text-brand-300 relative ${
                location.pathname === link.path
                  ? 'text-brand-600 dark:text-brand-400'
                  : 'text-muted-foreground dark:text-white/70'
              }`}
            >
              {link.label}
              {location.pathname === link.path && (
                <motion.div 
                  className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-brand-500 dark:bg-brand-400"
                  layoutId="navIndicator"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>
        
        {/* User menu */}
        {currentUser ? (
          <div className="flex items-center gap-4">
            <XPBar currentXP={currentUser.xp_total} compact />
            
            {/* Theme Toggle */}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleTheme}
              className="rounded-full h-8 w-8 text-muted-foreground hover:text-brand-500 dark:text-white/70 dark:hover:text-brand-300"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-0 h-8 w-8 rounded-full">
                  <Avatar status={currentUser.avatar_status} size="sm" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="dark:bg-brand-700 dark:border-brand-600">
                <DropdownMenuLabel className="dark:text-white">Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator className="dark:bg-brand-600" />
                
                {/* Mobile Nav Links */}
                <div className="md:hidden">
                  {navLinks.map((link) => (
                    <DropdownMenuItem key={link.path} asChild>
                      <Link to={link.path} className="dark:text-white dark:focus:bg-brand-600">
                        {link.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator className="dark:bg-brand-600" />
                </div>
                
                <DropdownMenuItem asChild>
                  <Link to="/perfil" className="dark:text-white dark:focus:bg-brand-600">Perfil</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/lista-compras" className="dark:text-white dark:focus:bg-brand-600">Lista de Compras</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout} className="dark:text-white dark:focus:bg-brand-600">
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <Link to="/login">
            <Button variant="outline" className="dark:border-brand-600 dark:text-white dark:hover:bg-brand-700">Entrar</Button>
          </Link>
        )}
      </div>
    </motion.header>
  );
};
