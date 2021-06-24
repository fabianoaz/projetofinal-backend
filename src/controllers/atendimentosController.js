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

router.get('/evolucao/:id', async (req, res) => {
    evolucao = [];
    try {
        evolucao = await Atendimentos.find().select('evolucao atendimentoData -_id').sort('atendimentoData').where('pacienteID').in(req.params.id).exec()
        teste = []

        for(let i=0; i<evolucao.length; i++){
            teste.push([evolucao[i].atendimentoData , evolucao[i].evolucao])
        }
        res.json(teste)
    } catch (err) {
        return res.status(400).json({ error: 'Ocorreu falha ao listar evolução para o paciente ' + req.params.id + ' - ' + evolucao})
    }
})

router.get('/evolucao/:pacienteid/:profissionalNome', async (req, res) => {
    evolucao = [];
    try {
        evolucao = await Atendimentos.find().select('evolucao atendimentoData -_id').sort('atendimentoData').where('pacienteID').in(req.params.pacienteid)
        .where('profissionalNome').in(req.params.profissionalNome).exec()
        teste = []

        if(evolucao.length <=0){
            return res.status(402).json({message: 'Não há atendimento para o profissional selecionado'})
        }

        for(let i=0; i<evolucao.length; i++){
            teste.push([evolucao[i].atendimentoData , evolucao[i].evolucao])
        }
        res.json(teste)
    } catch (err) {
        return res.status(400).json({ error: 'Ocorreu falha ao listar evolução para o paciente ' + req.params.id + ' - ' + evolucao})
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