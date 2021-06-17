const mongoose = require('../database')

const AtendimentosSchema = new mongoose.Schema({
    pacienteID: { type: String, required: true },
    pacienteNome: { type: String, required: true },
    atendimentoData: { type: String, required: true },
    profissionalNome: { type: String, required: true },
    profissionalEspecialidade: { type: String, required: true },
    atendimento: { type: String, required: true },
    orientacao: { type: String, required: true },
    evolucao:{type: Number, require:true},
})

const Atendimentos = mongoose.model('Atendimentos',AtendimentosSchema)

module.exports = Atendimentos