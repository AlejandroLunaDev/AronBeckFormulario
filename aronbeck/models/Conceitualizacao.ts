import mongoose from 'mongoose';

const SituacaoSchema = new mongoose.Schema({
  situacao: { type: String, required: true },
  pensamentoAutomatico: { type: String, required: true },
  significadoPA: { type: String, required: true },
  emocao: { type: String, required: true },
  comportamento: { type: String, required: true }
});

const ConceitualizacaoSchema = new mongoose.Schema({
  dadosHistoria: {
    type: String,
    required: true
  },
  crencasCentrais: {
    type: String,
    required: true
  },
  crencasRegra: {
    type: String,
    required: true
  },
  estrategiasCompensatorias: {
    type: String,
    required: true
  },
  situacao1: { type: SituacaoSchema, required: true },
  situacao2: { type: SituacaoSchema, required: true }
}, {
  timestamps: true,
  collection: 'tcc'
});

export const Conceitualizacao = mongoose.models.tcc || 
  mongoose.model('tcc', ConceitualizacaoSchema);