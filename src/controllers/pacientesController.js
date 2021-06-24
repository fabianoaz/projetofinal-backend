const express = require('express')
const Paciente = require('../models/pacientesModel')
const Atendimentos = require('../models/atendimentosModel')

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

router.get('/:id', /*getPaciente,*/ async (req, res) => {
    try {
        const paciente = await Paciente.findById(req.params.id)
        console.log("GET Paciente by id: " + paciente)
        if (paciente == null) {
            return res.status(404).json({ error: 'Paciente TESTE não localizado' })
        } else {
            res.json(paciente)
        }
    } catch (err) {
        return res.status(400).send({ error: 'Ocorreu falha ao listar paciente ' + req.params.id })
    }
})

router.get('/semid/:id', /*getPaciente,*/ async (req, res) => {
    try {
        const paciente = await Paciente.findById(req.params.id) //.select('-_id')
        console.log("GET Paciente by id: " + paciente)
        if (paciente == null) {
            return res.status(404).json({ error: 'Paciente TESTE não localizado' })
        } else {
            res.json(paciente)
        }
    } catch (err) {
        return res.status(400).send({ error: 'Ocorreu falha ao listar paciente ' + req.params.id })
    }
})

router.get('/profissional/:id', async (req, res) => {
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

router.put("/associar/:id", async (req,resp) => {
    console.log(req.body)

   paciente = req.body

   const atualizado = await Paciente.updateOne(req.body).where(_id).equals(req.id)
    
    try{
    return resp.status(200).send({message:'Paciente atualizado: ' + [atualizado]})
    } catch (err) {
        return res.status(400).send({ error: 'Ocorreu falha ao atualizar paciente' })
    }
})

router.put('/:id', getPaciente, async (req, res) => {

    console.log("REQ: " + req.body.nome)

    if(req.body.nome != null){
        res.paciente.nome = req.body.nome
    }

    if(req.body.idade != null){
        res.paciente.idade = req.body.idade
    }

    if(req.body.diagnostico != null){
        res.paciente.diagnostico = req.body.diagnostico
    }

    if(req.body.profissionalID != null){
        res.paciente.profissionalID = req.body.profissionalID
    }

    console.log("RESP: " + res)

    try {
        const pacienteAtualizado = await res.paciente.save()
        console.log(pacienteAtualizado)
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