
import { toast as originalToast } from "@/hooks/use-toast";

// Extended toast with variant methods
export const toast = {
  ...originalToast,
  error: (message: string) => {
    return originalToast({
      title: "Erro",
      description: message,
      variant: "destructive",
    });
  },
  success: (message: string) => {
    return originalToast({
      title: "Sucesso",
      description: message,
    });
  },
  info: (message: string) => {
    return originalToast({
      title: "Informação",
      description: message,
    });
  },
};
