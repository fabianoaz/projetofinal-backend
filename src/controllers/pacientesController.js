const express = require('express')
const Paciente = require('../models/pacientesModel')

const router = express.Router()

async function getPaciente(req, res, next) {
    try {
        paciente = await Paciente.findById(req.params.id)
        if (paciente == null) {
            return res.status(404).json({ message: 'Paciente não localizado' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.paciente = paciente
    next()
}

router.get('/', async (req, res) => {
    try {
        const pacientes = await Paciente.find()
        res.json(pacientes)
    } catch (err) {
        return res.status(400).send({ error: 'Ocorreu falha ao listar pacientes' })
    }
})

router.get('/:id', getPaciente, async (req, res) => {
    try {
        const paciente = await Paciente.findById(req.params.id)
        if (paciente == null) {
            return res.status(404).json({ error: 'Paciente não localizado' })
        } else {
            res.json(paciente)
        }
    } catch (err) {
        return res.status(400).send({ error: 'Ocorreu falha ao listar paciente ' + req.params.id })
    }
})

router.get('/profissional/:id', async (req, res) => {
    console.log("Profissional ID: " + req.params.id)
    try {
        pacientes = await Paciente.find().where('profissionalID').in(req.params.id).exec()
        res.json(pacientes)
    } catch (err) {
        return res.status(400).json({ error: 'Ocorreu falha ao listar pacientes para o profissional selecionado ' + req.params.id})
    }
})

router.post('/', async (req, res) => {
    try {
        const paciente = await Paciente.create(req.body)
        return res.send([paciente])
    } catch (err) {
        return res.status(400).send({ error: 'Ocorreu falha ao criar paciente' })
    }
})

router.put('/:id', getPaciente, async (req, res) => {

    if(req.body.nome != null){
        res.paciente.nome = req.body.nome
    }

    if(req.body.idade != null){
        res.paciente.idade = req.body.idade
    }

    if(req.body.diagnostico != null){
        res.paciente.diagnostico = req.body.diagnostico
    }

    try {
        const pacienteAtualizado = await res.paciente.save()
        res.json(pacienteAtualizado)
    } catch (err) {
        return res.status(400).send({ error: 'Ocorreu falha ao atualizar paciente' })
    }
})

router.delete('/:id', getPaciente, async (req, res) => {
    try {
        await res.paciente.remove()
        res.json({message: 'Paciente removido'})
    } catch (err) {
        return res.status(400).send({ error: 'Ocorreu falha ao atualizar paciente' })
    }
})

module.exports = app => app.use('/pacientes', router)