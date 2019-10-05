const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const pie = require('../models/piePagina');

router.get('/', async function (req, res) {
    try {
        let pies = await pie.find().sort({ orden: 1 })
        res.json(pies)
    } catch (error) {
        console.error(error);
    }
})

router.get('/:id', function (req, res) {

})

router.post('/', async function (req, res) {
    try {
        let pies = await pie.find().sort({ orden: 1 })

        if (pies.length == 0) {
            let a = new pie({
                _id: mongoose.Types.ObjectId(1),
                texto: req.body.textoPie
            })

            let respuesta = await a.save()
            res.json(respuesta)
        } else {
            let respuesta = await pie.update({ _id: pies[0]._id },
                {
                    texto: req.body.textoPie
                })
            res.json(respuesta)
        }

    } catch (error) {
        console.error(error);
    }
})

router.delete('/:id', async function (req, res) {
})

module.exports = router