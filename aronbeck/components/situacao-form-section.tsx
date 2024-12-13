'use client';

import { UseFormReturn, Path } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Label } from './ui/label';
import { FormData } from '@/lib/schemas/conceitualizacao-schema';

interface SituacaoFormSectionProps {
  form: UseFormReturn<FormData>;
  index: 1 | 2;
}

export function SituacaoFormSection({ form, index }: SituacaoFormSectionProps) {
  const baseFieldName = `situacao${index}`;

  return (
    <div className='space-y-6 bg-white p-6 rounded-lg border'>
      <h2 className='text-2xl font-bold text-slate-800'>Situação {index}</h2>
      <div className='grid gap-6'>
        <FormField
          control={form.control}
          name={`${baseFieldName}.situacao` as Path<FormData>}
          render={({ field }) => (
            <FormItem>
              <Label>Situação</Label>
              <FormControl>
                <Textarea
                  placeholder='Descreva a situação específica...'
                  className='min-h-[100px]'
                  {...field}
                  value={field.value as string}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='grid grid-cols-2 gap-4'>
          <FormField
            control={form.control}
            name={`${baseFieldName}.pensamentoAutomatico` as Path<FormData>}
            render={({ field }) => (
              <FormItem>
                <Label>Pensamento Automático</Label>
                <FormControl>
                  <Textarea
                    placeholder='O que passou pela sua mente?'
                    className='min-h-[80px]'
                    {...field}
                    value={field.value as string}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`${baseFieldName}.significadoPA` as Path<FormData>}
            render={({ field }) => (
              <FormItem>
                <Label>Significado do PA</Label>
                <FormControl>
                  <Textarea
                    placeholder='O que isso significa para você?'
                    className='min-h-[80px]'
                    {...field}
                    value={field.value as string}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <FormField
            control={form.control}
            name={`${baseFieldName}.emocao` as Path<FormData>}
            render={({ field }) => (
              <FormItem>
                <Label>Emoção</Label>
                <FormControl>
                  <Textarea
                    placeholder='O que você sentiu?'
                    className='min-h-[80px]'
                    {...field}
                    value={field.value as string}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`${baseFieldName}.comportamento` as Path<FormData>}
            render={({ field }) => (
              <FormItem>
                <Label>Comportamento</Label>
                <FormControl>
                  <Textarea
                    placeholder='O que você fez?'
                    className='min-h-[80px]'
                    {...field}
                    value={field.value as string}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
