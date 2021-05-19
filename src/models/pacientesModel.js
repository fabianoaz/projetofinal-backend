const mongoose = require('../database')

const PacientesSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    idade: { type: String, required: true },
    diagnostico: { type: String, required: true },
    faz: { type: String, required: false },
    dificuldade: { type: String, required: false },
})

const Pacientes = mongoose.model('Pacientes',PacientesSchema)

module.exports = Pacientes