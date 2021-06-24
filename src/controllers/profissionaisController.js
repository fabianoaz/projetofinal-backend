const express = require('express')
const Profissional = require('../models/profissionaisModel')

const router = express.Router()

async function getProfissional(req, res, next) {
    try {
        profissional = await Profissional.findById(req.params.id)
        if (profissional == null) {
            return res.status(404).json({ message: 'profissional não localizado' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.profissional = profissional
    next()
}

router.get('/', async (req, res) => {
    try {
        const profissionals = await Profissional.find()
        res.json(profissionals)
    } catch (err) {
        return res.status(400).send({ error: 'Ocorreu falha ao listar profissionais' })
    }
})

router.get('/:id', /*getProfissional,*/ async (req, res) => {
    try {
        const profissional = await Profissional.findById(req.params.id)
        if (profissional == null) {
            return res.status(404).json({ error: 'profissional não localizado' })
        } else {
            res.json(profissional)
        }
    } catch (err) {
        return res.status(400).send({ error: 'Ocorreu falha ao listar profissional ' + req.params.id })
    }
})

router.get('/nome/:nome', async (req, res) => {
    try {
        const profissional = await Profissional.find().where('nome').equals(req.params.nome).exec()
        console.log(profissional)
        if (profissional == null) {
            return res.status(404).json({ error: 'profissional não localizado' })
        } else {
            res.json(profissional)
        }
    } catch (err) {
        return res.status(400).send({ error: 'Ocorreu falha ao listar profissional ' + req.params.id })
    }
})

router.post('/', async (req, res) => {
    try {
        const profissional = await Profissional.create(req.body)
        return res.send([profissional])
    } catch (err) {
        return res.status(400).send({ error: 'Ocorreu falha ao criar profissional\n' + err.message})
    }
})

router.put('/:id', getProfissional, async (req, res) => {

    if(req.body.nome != null){
        res.profissional.nome = req.body.nome
    }

    if(req.body.idade != null){
        res.profissional.idade = req.body.idade
    }

    if(req.body.diagnostico != null){
        res.profissional.diagnostico = req.body.diagnostico
    }

    try {
        const profissionalAtualizado = await res.profissional.save()
        res.json(profissionalAtualizado)
    } catch (err) {
        return res.status(400).send({ error: 'Ocorreu falha ao atualizar profissional' })
    }
})

router.delete('/:id', getProfissional, async (req, res) => {
    try {
        await res.profissional.remove()
        res.json({message: 'profissional removido'})
    } catch (err) {
        return res.status(400).send({ error: 'Ocorreu falha ao atualizar profissional' })
    }
})

module.exports = app => app.use('/profissionais', router)