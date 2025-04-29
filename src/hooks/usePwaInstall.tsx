
import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed',
    platform: string
  }>;
  prompt(): Promise<void>;
}

// Hook para gerenciar a instalação do PWA
export function usePwaInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Detectar se o app já está instalado
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    // Captura o evento beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    // Evento de instalação concluída
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const installApp = async () => {
    // Se tivermos o deferredPrompt, podemos usar a API para instalar
    if (deferredPrompt) {
      try {
        // Mostrar o prompt de instalação
        await deferredPrompt.prompt();
        
        // Aguardar pela escolha do usuário
        const choiceResult = await deferredPrompt.userChoice;
        
        // Limpar o deferredPrompt após uso
        setDeferredPrompt(null);
        setIsInstallable(false);
        
        return choiceResult.outcome === 'accepted';
      } catch (error) {
        console.error('Erro ao instalar PWA:', error);
        return false;
      }
    } 
    
    // Para iOS (Safari) que não suporta a API de instalação
    // Retornamos false para que a UI possa mostrar instruções alternativas
    return false;
  };

  // Retorna dados úteis sobre o estado da instalação
  return { 
    isInstallable, 
    isInstalled, 
    installApp 
  };
}
