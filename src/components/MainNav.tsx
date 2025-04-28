
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Avatar } from '@/components/Avatar';
import { XPBar } from '@/components/XPBar';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const MainNav: React.FC = () => {
  const { state, logout } = useApp();
  const { currentUser } = state;
  const location = useLocation();
  
  // Define main navigation links
  const navLinks = [
    { path: '/', label: 'Dashboard' },
    { path: '/perfil', label: 'Perfil' },
    { path: '/diario', label: 'Diário' },
    { path: '/lista-compras', label: 'Lista de Compras' },
  ];
  
  // Add recipes link if user has reached step 3
  if (currentUser && currentUser.current_step > 3) {
    navLinks.push({ path: '/receitas', label: 'Receitas' });
  }
  
  // Add admin link for admin users
  if (currentUser?.is_admin) {
    navLinks.push({ path: '/admin', label: 'Admin' });
  }
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/8802b8ff-8b05-41f8-82cd-7ef9c9355371.png" 
              alt="7Steps Logo" 
              className="h-8"
            />
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-brand-500 ${
                location.pathname === link.path
                  ? 'text-brand-600'
                  : 'text-muted-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        
        {/* User menu */}
        {currentUser ? (
          <div className="flex items-center gap-4">
            <XPBar currentXP={currentUser.xp_total} compact />
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-0 h-8 w-8 rounded-full">
                  <Avatar status={currentUser.avatar_status} size="sm" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                {/* Mobile Nav Links */}
                <div className="md:hidden">
                  {navLinks.map((link) => (
                    <DropdownMenuItem key={link.path} asChild>
                      <Link to={link.path}>{link.label}</Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                </div>
                
                <DropdownMenuItem asChild>
                  <Link to="/perfil">Perfil</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <Link to="/login">
            <Button variant="outline">Entrar</Button>
          </Link>
        )}
      </div>
    </header>
  );
};
