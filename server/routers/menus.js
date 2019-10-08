const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const menu = require('../models/menu');

router.get('/', async function (req, res) {
    try {
        let menus = await menu.find().sort({ orden: 1 })
        res.json(menus)
    } catch (error) {
        console.error(error);
    }
})

router.get('/:id', async function (req, res) {
    try {
        let m = await menu.findById(req.params.id)
        res.json(m)
    } catch (error) {
        console.error(error);
    }
})

router.post('/', async function (req, res) {
    try {
        let a = new menu({
            nombre: req.body.nombre,
            paginas: req.body.paginas,
            enlaces: req.body.enlaces
        })

        let respuesta = await a.save()
        res.json(respuesta)

    } catch (error) {
        console.error(error);
    }
})

router.delete('/:id', async function (req, res) {
    try {
        let a = await menu.remove({
            _id: req.params.id
        })
        res.json(a)
    } catch (error) {
        console.error(error);
    }
})

module.exports = router