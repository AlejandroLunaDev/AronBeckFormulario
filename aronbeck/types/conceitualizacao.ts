export interface SituacaoData {
  situacao: string;
  pensamentoAutomatico: string;
  significadoPA: string;
  emocao: string;
  comportamento: string;
}

export interface DadosGerais {
  dadosHistoria: string;
  crencasCentrais: string;
  crencasRegra: string;
  estrategiasCompensatorias: string;
}

export interface ConceitualizacaoData extends DadosGerais {
  situacao1: SituacaoData;
  situacao2: SituacaoData;
} 