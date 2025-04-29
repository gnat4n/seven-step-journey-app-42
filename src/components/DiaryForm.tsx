
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useApp } from '@/context/AppContext';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/sonner';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { CalendarIcon } from 'lucide-react';

const formSchema = z.object({
  date: z.date(),
  hunger_level: z.number().min(1).max(10),
  emotional_hunger: z.boolean(),
  feeling: z.string().min(2),
  notes: z.string(),
});

export const DiaryForm: React.FC = () => {
  const { addDiaryEntry } = useApp();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      hunger_level: 5,
      emotional_hunger: false,
      feeling: '',
      notes: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      const formattedEntry = {
        date: format(values.date, 'yyyy-MM-dd'),
        hunger_level: values.hunger_level,
        emotional_hunger: values.emotional_hunger,
        feeling: values.feeling,
        notes: values.notes,
      };
      
      addDiaryEntry(formattedEntry);
      form.reset();
      toast.success("Entrada adicionada ao diário com sucesso!");
    } catch (error) {
      console.error("Error submitting diary entry:", error);
      toast.error("Erro ao adicionar entrada. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Data</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP', { locale: ptBR })
                      ) : (
                        <span>Selecione a data</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hunger_level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nível de Fome (1-10)</FormLabel>
              <FormControl>
                <div className="space-y-3">
                  <Slider
                    min={1}
                    max={10}
                    step={1}
                    defaultValue={[field.value]}
                    onValueChange={(vals) => field.onChange(vals[0])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Pouca fome (1)</span>
                    <span className="font-medium text-brand-600">{field.value}</span>
                    <span>Muita fome (10)</span>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="emotional_hunger"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Fome Emocional</FormLabel>
                <FormDescription>
                  Você sente que esta fome é emocional e não física?
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="feeling"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Como você está se sentindo?</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Descreva suas emoções agora (ex: ansioso, estressado, entediado)"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Observações</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Outras observações sobre sua fome, alimentação ou emoções do dia"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full bg-brand-600 hover:bg-brand-700" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Salvando...' : 'Salvar no Diário'}
        </Button>
      </form>
    </Form>
  );
};
