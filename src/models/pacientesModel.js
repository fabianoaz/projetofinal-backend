const mongoose = require('../database')

const PacientesSchema = new mongoose.Schema({
   /* _id:{ type: String, required: true },*/
    nome: { type: String, required: true },
    idade: { type: String, required: true },
    diagnostico: { type: String, required: true },
    faz: { type: String, required: false },
    dificuldade: { type: String, required: false },
    profissionalID:{type: [String], require:true}
})

const Pacientes = mongoose.model('Pacientes',PacientesSchema)

module.exports = Pacientes