
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, XCircle, MoveVertical } from 'lucide-react';

type DraggableItem = {
  id: string;
  content: string;
};

type DropZone = {
  id: string;
  label: string;
  items: DraggableItem[];
  maxItems?: number;
};

type DragDropExerciseProps = {
  title: string;
  description: string;
  items: DraggableItem[];
  dropZones: DropZone[];
  onComplete: () => void;
  checkSolution: (zones: DropZone[]) => boolean;
};

export const DragDropExercise: React.FC<DragDropExerciseProps> = ({
  title,
  description,
  items: initialItems,
  dropZones: initialDropZones,
  onComplete,
  checkSolution
}) => {
  const [availableItems, setAvailableItems] = useState<DraggableItem[]>(initialItems);
  const [dropZones, setDropZones] = useState<DropZone[]>(initialDropZones);
  const [draggedItem, setDraggedItem] = useState<DraggableItem | null>(null);
  const [dragSource, setDragSource] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  
  const handleDragStart = (item: DraggableItem, source: string) => {
    setDraggedItem(item);
    setDragSource(source);
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  
  const handleDrop = (e: React.DragEvent, targetZoneId: string) => {
    e.preventDefault();
    
    if (!draggedItem) return;
    
    // If item comes from available items
    if (dragSource === 'available') {
      // Check if the zone has a max item limit
      const targetZone = dropZones.find(zone => zone.id === targetZoneId);
      if (targetZone?.maxItems && targetZone.items.length >= targetZone.maxItems) {
        return;
      }
      
      setAvailableItems(availableItems.filter(item => item.id !== draggedItem.id));
      
      setDropZones(dropZones.map(zone => 
        zone.id === targetZoneId 
          ? { ...zone, items: [...zone.items, draggedItem] }
          : zone
      ));
    }
    // If item comes from another zone
    else if (dragSource) {
      // Remove from source zone
      const updatedZones = dropZones.map(zone => 
        zone.id === dragSource
          ? { ...zone, items: zone.items.filter(item => item.id !== draggedItem.id) }
          : zone
      );
      
      // Check if the target zone has a max item limit
      const targetZone = updatedZones.find(zone => zone.id === targetZoneId);
      if (targetZone?.maxItems && targetZone.items.length >= targetZone.maxItems) {
        return;
      }
      
      // Add to target zone
      setDropZones(updatedZones.map(zone => 
        zone.id === targetZoneId 
          ? { ...zone, items: [...zone.items, draggedItem] }
          : zone
      ));
    }
    
    setDraggedItem(null);
    setDragSource(null);
  };
  
  const handleReturnToDeck = (item: DraggableItem, zoneId: string) => {
    // Remove from drop zone
    setDropZones(dropZones.map(zone => 
      zone.id === zoneId
        ? { ...zone, items: zone.items.filter(i => i.id !== item.id) }
        : zone
    ));
    
    // Add back to available items
    setAvailableItems([...availableItems, item]);
  };
  
  const handleCheck = () => {
    setIsChecking(true);
    
    setTimeout(() => {
      const result = checkSolution(dropZones);
      setIsCorrect(result);
      setIsChecking(false);
      
      if (result) {
        setTimeout(() => {
          onComplete();
        }, 1500);
      }
    }, 1000);
  };
  
  const handleReset = () => {
    setAvailableItems(initialItems);
    setDropZones(initialDropZones.map(zone => ({ ...zone, items: [] })));
    setIsCorrect(null);
  };
  
  const allItemsPlaced = availableItems.length === 0;
  
  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="border-brand-200 dark:border-brand-700 bg-white dark:bg-brand-800/60">
        <CardContent className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2 dark:text-white">{title}</h3>
            <p className="text-muted-foreground dark:text-white/70">{description}</p>
          </div>
          
          <div className="mt-6 space-y-6">
            {/* Available Items */}
            <div className="border border-dashed border-gray-300 dark:border-brand-600 p-4 rounded-lg">
              <h4 className="text-sm font-medium mb-3 text-muted-foreground dark:text-white/70">Itens Disponíveis</h4>
              <div className="flex flex-wrap gap-2 min-h-[50px]">
                {availableItems.map((item) => (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={() => handleDragStart(item, 'available')}
                    className="px-3 py-2 bg-brand-50 dark:bg-brand-700 text-brand-800 dark:text-white rounded-md border border-brand-200 dark:border-brand-600 cursor-grab flex items-center gap-2"
                  >
                    <MoveVertical className="h-4 w-4 text-brand-500 dark:text-brand-300" />
                    <span>{item.content}</span>
                  </div>
                ))}
                {availableItems.length === 0 && (
                  <p className="text-sm text-muted-foreground w-full text-center py-2 dark:text-white/50">
                    Todos os itens foram utilizados
                  </p>
                )}
              </div>
            </div>
            
            {/* Drop Zones */}
            <div className="grid gap-6">
              {dropZones.map((zone) => (
                <div
                  key={zone.id}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, zone.id)}
                  className="border border-dashed border-gray-300 dark:border-brand-600 p-4 rounded-lg"
                >
                  <h4 className="text-sm font-medium mb-2 flex justify-between dark:text-white">
                    <span>{zone.label}</span>
                    {zone.maxItems && (
                      <span className="text-muted-foreground dark:text-white/70">
                        {zone.items.length}/{zone.maxItems}
                      </span>
                    )}
                  </h4>
                  
                  <div className="min-h-[60px] flex flex-wrap gap-2">
                    {zone.items.map((item) => (
                      <div
                        key={item.id}
                        draggable
                        onDragStart={() => handleDragStart(item, zone.id)}
                        className="px-3 py-2 bg-brand-100 dark:bg-brand-600 text-brand-800 dark:text-white rounded-md border border-brand-200 dark:border-brand-500 cursor-grab flex items-center gap-2 group relative"
                      >
                        <MoveVertical className="h-4 w-4 text-brand-500 dark:text-brand-300" />
                        <span>{item.content}</span>
                        <button
                          onClick={() => handleReturnToDeck(item, zone.id)}
                          className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-100 text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <XCircle className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            {isCorrect !== null && (
              <div className={`p-4 rounded-lg ${
                isCorrect 
                  ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700' 
                  : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700'
              }`}>
                <div className="flex items-center gap-2">
                  {isCorrect ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                  <p className={`font-medium ${
                    isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    {isCorrect ? 'Correto!' : 'Incorreto. Tente novamente.'}
                  </p>
                </div>
              </div>
            )}
            
            <div className="flex justify-end space-x-3 pt-2">
              <Button 
                variant="outline" 
                onClick={handleReset}
                className="hover:bg-brand-50 dark:border-brand-600 dark:text-white dark:hover:bg-brand-700"
              >
                Reiniciar
              </Button>
              <Button 
                onClick={handleCheck}
                disabled={!allItemsPlaced || isChecking}
                className={`${
                  !allItemsPlaced 
                    ? 'bg-gray-300 cursor-not-allowed dark:bg-gray-700' 
                    : 'bg-brand-500 hover:bg-brand-600 dark:bg-brand-400 dark:hover:bg-brand-300 dark:text-brand-900'
                }`}
              >
                {isChecking ? 'Verificando...' : 'Verificar'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
