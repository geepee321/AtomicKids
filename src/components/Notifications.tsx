import { useToast } from "@/components/ui/use-toast";

export function useNotifications() {
  const { toast } = useToast();

  const showSuccess = (message: string) => {
    toast({
      title: "Success",
      description: message,
      variant: "default",
    });
  };

  const showError = (message: string) => {
    toast({
      title: "Error",
      description: message,
      variant: "destructive",
    });
  };

  return { showSuccess, showError };
}
