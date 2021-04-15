const mongoose = require('../database')

const PacientesSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    idade: { type: String, required: true },
    diagnostico: { type: String, required: true },
})

const Pacientes = mongoose.model('Pacientes',PacientesSchema)

module.exports = Pacientes