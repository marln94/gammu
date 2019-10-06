const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const categoria = require('../models/categoria');

router.get('/', async function (req, res) {
    try {
        let categorias = await categoria.find().sort({ orden: 1 })
        res.json(categorias)
    } catch (error) {
        console.error(error);
    }
})

router.get('/:id', function (req, res) {

})

router.post('/', async function (req, res) {
    try {
        let a = new categoria({
            nombre: req.body.nombre
        })

        let respuesta = await a.save()
        res.json(respuesta)

    } catch (error) {
        console.error(error);
    }
})

router.delete('/:id', async function (req, res) {
    try {
        let a = await categoria.remove({
            _id: req.params.id
        })
        res.json(a)
    } catch (error) {
        console.error(error);
    }
})

module.exports = router