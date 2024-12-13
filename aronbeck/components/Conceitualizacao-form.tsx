'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { SituacaoFormSection } from './situacao-form-section';
import { useConceitualizacaoSubmit } from '@/hooks/use-conceitualizacao-submit';
import { Textarea } from './ui/textarea';
import { mockFormData } from '@/lib/mocks/form-data-mock';
import { generatePDF } from '@/lib/services/pdf-generator';
import { Label } from './ui/label';

const situacaoSchema = z.object({
  situacao: z.string().min(10, 'Descreva a situação com mais detalhes'),
  pensamentoAutomatico: z
    .string()
    .min(10, 'Descreva o pensamento automático'),
  significadoPA: z.string().min(10, 'Descreva o significado'),
  emocao: z.string().min(3, 'Descreva a emoção'),
  comportamento: z.string().min(10, 'Descreva o comportamento')
});

const formSchema = z.object({
  // Dados Gerais
  dadosHistoria: z.string().min(50, 'A história deve ser mais detalhada'),
  crencasCentrais: z.string().min(10, 'Descreva as crenças centrais'),
  crencasRegra: z.string().min(10, 'Descreva as crenças-regra'),
  estrategiasCompensatorias: z
    .string()
    .min(10, 'Descreva as estratégias compensatórias'),

  // Situações
  situacao1: situacaoSchema,
  situacao2: situacaoSchema
});

export function ConceitualizacaoForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dadosHistoria: '',
      crencasCentrais: '',
      crencasRegra: '',
      estrategiasCompensatorias: '',
      situacao1: {
        situacao: '',
        pensamentoAutomatico: '',
        significadoPA: '',
        emocao: '',
        comportamento: ''
      },
      situacao2: {
        situacao: '',
        pensamentoAutomatico: '',
        significadoPA: '',
        emocao: '',
        comportamento: ''
      }
    }
  });

  const { handleSubmit, isLoading } = useConceitualizacaoSubmit();

  const handleAutoFill = () => {
    form.reset(mockFormData);
  };

  const handleDownloadPDF = () => {
    try {
      console.log('Downloading PDF...');
      const formData = form.getValues();
      console.log('Form data:', formData);
      generatePDF(formData);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className='space-y-8 max-w-2xl mx-auto'
      >
        <div className='flex justify-end mb-4'>
          <Button 
            type='button' 
            variant='secondary'
            onClick={handleAutoFill}
          >
            Preencher com Dados de Teste
          </Button>
        </div>

        {/* Dados Gerais */}
        <div className='space-y-6 bg-slate-50 p-6 rounded-lg'>
          <h2 className='text-2xl font-bold text-slate-800'>Dados Gerais</h2>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='dadosHistoria'
              render={({ field }) => (
                <FormItem>
                  <Label>História Relevante</Label>
                  <FormControl>
                    <Textarea
                      placeholder='História relevante do paciente...'
                      className='min-h-[150px]'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='crencasCentrais'
              render={({ field }) => (
                <FormItem>
                  <Label>Crenças Centrais</Label>
                  <FormControl>
                    <Textarea
                      placeholder='Crenças centrais do paciente...'
                      className='min-h-[100px]'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='crencasRegra'
              render={({ field }) => (
                <FormItem>
                  <Label>Crenças-Regra</Label>
                  <FormControl>
                    <Textarea
                      placeholder='Regras e atitudes...'
                      className='min-h-[100px]'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='estrategiasCompensatorias'
              render={({ field }) => (
                <FormItem>
                  <Label>Estratégias Compensatórias ou de Manutenção de Crenças</Label>
                  <FormControl>
                    <Textarea
                      placeholder='Estratégias de manutenção...'
                      className='min-h-[100px]'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Situações */}
        <SituacaoFormSection form={form} index={1} />
        <SituacaoFormSection form={form} index={2} />

        <div className='flex justify-end gap-4 pt-6'>
          <Button type='submit' disabled={isLoading}>
            {isLoading ? 'Salvando...' : 'Salvar Conceitualização'}
          </Button>
          <Button 
            type='button' 
            variant='outline'
            onClick={() => handleDownloadPDF()}
          >
            Baixar PDF
          </Button>
        </div>
      </form>
    </Form>
  );
}
