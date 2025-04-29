
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle } from 'lucide-react';

type Field = {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'number';
  placeholder?: string;
  required?: boolean;
};

type FormExerciseProps = {
  title: string;
  description: string;
  fields: Field[];
  onComplete: () => void;
};

export const FormExercise: React.FC<FormExerciseProps> = ({
  title,
  description,
  fields,
  onComplete
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (id: string, value: string) => {
    setFormData({ ...formData, [id]: value });
  };
  
  const handleSubmit = () => {
    // Check if all required fields are filled
    const isValid = fields.every(field => 
      !field.required || (formData[field.id] && formData[field.id].trim() !== '')
    );
    
    if (!isValid) return;
    
    setSubmitting(true);
    
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      
      setTimeout(() => {
        onComplete();
      }, 1500);
    }, 1000);
  };
  
  return (
    <div className="space-y-4 animate-fade-in">
      <Card className="border-brand-200 dark:border-brand-700 bg-white dark:bg-brand-800/60">
        <CardContent className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2 dark:text-white">{title}</h3>
            <p className="text-muted-foreground dark:text-white/70">{description}</p>
          </div>
          
          {submitted ? (
            <div className="flex flex-col items-center py-6 space-y-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <p className="text-center font-medium text-green-600 dark:text-green-400">
                Formulário enviado com sucesso!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {fields.map((field) => (
                <div key={field.id} className="space-y-2">
                  <Label htmlFor={field.id} className="dark:text-white">
                    {field.label} {field.required && <span className="text-red-500">*</span>}
                  </Label>
                  
                  {field.type === 'textarea' ? (
                    <Textarea
                      id={field.id}
                      placeholder={field.placeholder}
                      value={formData[field.id] || ''}
                      onChange={(e) => handleChange(field.id, e.target.value)}
                      rows={4}
                      className="resize-none dark:bg-brand-700 dark:border-brand-600 dark:text-white dark:placeholder:text-white/50"
                      required={field.required}
                    />
                  ) : (
                    <Input
                      id={field.id}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={formData[field.id] || ''}
                      onChange={(e) => handleChange(field.id, e.target.value)}
                      className="dark:bg-brand-700 dark:border-brand-600 dark:text-white dark:placeholder:text-white/50"
                      required={field.required}
                    />
                  )}
                </div>
              ))}
              
              <div className="flex justify-end pt-2">
                <Button 
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="bg-brand-500 hover:bg-brand-600 dark:bg-brand-400 dark:hover:bg-brand-300 dark:text-brand-900"
                >
                  {submitting ? 'Enviando...' : 'Enviar'}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
