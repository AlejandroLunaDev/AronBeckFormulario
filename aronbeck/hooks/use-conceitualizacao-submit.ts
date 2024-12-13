import { useState } from 'react';
import { ConceitualizacaoData } from '@/types/conceitualizacao';

export function useConceitualizacaoSubmit() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: ConceitualizacaoData) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/conceitualizacao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });

      if (!response.ok) throw new Error('Error al guardar');
      
      // Aquí podrías agregar notificaciones de éxito
    } catch (error) {
      console.error('Error:', error);
      // Aquí podrías agregar notificaciones de error
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSubmit, isLoading };
} 