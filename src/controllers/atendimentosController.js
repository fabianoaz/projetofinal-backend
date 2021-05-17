const express = require('express')
const Atendimentos = require('../models/atendimentosModel')

const router = express.Router()

async function getAtendimento(req, res, next) {
    try {
        atendimento = await Atendimentos.findById(req.params.id)
        if (atendimento == null) {
            return res.status(404).json({ message: 'Atendimento não localizado' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.atendimento = atendimento
    next()
}

async function getAtendimentoPaciente(req, res, next) {
    try {
        atendimentos = await Atendimentos.find()
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.atendimentos = atendimentos
    next()
    if (atendimentos == null) {
        return res.status(404).json({ message: 'Atendimento para o paciente não localizado' })
    }else{
        res.json(atendimentos)
    }
}

router.get('/', async (req, res) => {
    try {
        const atendimentos = await Atendimentos.find()
        res.json(atendimentos)
    } catch (err) {
        return res.status(400).send({ error: 'Ocorreu falha ao listar atendimentos' })
    }
})

router.get('/:id', getAtendimento, async (req, res) => {
    try {
        const atendimento = await Atendimentos.findById(req.params.id)

        if (atendimento == null) {
            return res.status(404).json({ error: 'Atendimentos não localizado' })
        } else {
            res.json(atendimento)
        }
    } catch (err) {
        return res.status(400).send({ error: 'Ocorreu falha ao listar atendimentos ' + req.params.id })
    }
})

router.get('/paciente/:id', async (req, res) => {
    try {
        atendimentos = await Atendimentos.find().where('pacienteID').in(req.params.id).exec()
        res.json(atendimentos)
    } catch (err) {
        return res.status(400).json({ error: 'Ocorreu falha ao listar atendimento para o paciente ' + req.params.id + ' - ' + atendimentos})
    }
})

router.post('/', async (req, res) => {
    try {
        const atendimento = await Atendimentos.create(req.body)
        return res.send([atendimento])
    } catch (err) {
        return res.status(400).send({ error: 'Ocorreu falha ao criar atendimento\n' + err })
    }
})

module.exports = app => app.use('/atendimentos', router)