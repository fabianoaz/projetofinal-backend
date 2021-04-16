const mongoose = require('../database')

const ProfissionaisSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    especializacao: { type: String, required: true },
})

const Profissionais = mongoose.model('Profissionais',ProfissionaisSchema)

module.exports = Profissionais