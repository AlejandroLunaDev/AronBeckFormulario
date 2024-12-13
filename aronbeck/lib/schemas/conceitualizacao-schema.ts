import * as z from 'zod';

export const situacaoSchema = z.object({
  situacao: z.string().min(10, 'Descreva a situação com mais detalhes'),
  pensamentoAutomatico: z
    .string()
    .min(10, 'Descreva o pensamento automático'),
  significadoPA: z.string().min(10, 'Descreva o significado'),
  emocao: z.string().min(3, 'Descreva a emoção'),
  comportamento: z.string().min(10, 'Descreva o comportamento')
});

export const formSchema = z.object({
  dadosHistoria: z.string().min(50, 'A história deve ser mais detalhada'),
  crencasCentrais: z.string().min(10, 'Descreva as crenças centrais'),
  crencasRegra: z.string().min(10, 'Descreva as crenças-regra'),
  estrategiasCompensatorias: z
    .string()
    .min(10, 'Descreva as estratégias compensatórias'),
  situacao1: situacaoSchema,
  situacao2: situacaoSchema
});

export type FormData = z.infer<typeof formSchema>; 