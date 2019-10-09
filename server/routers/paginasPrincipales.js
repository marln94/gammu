const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const paginaPrincipal = require('../models/paginaPrincipal');

router.get('/', async function (req, res) {
    try {        
        let paginas = await paginaPrincipal.find().sort({ orden: 1 })
        res.json(paginas)
    } catch (error) {
        console.error(error);
    }
})

router.get('/:id', function (req, res) {

})

router.post('/', async function (req, res) {
    try {
        console.log(req.body)
        
        let paginas = await paginaPrincipal.find().sort({ orden: 1 })

        if (paginas.length == 0) {
            let a = new paginaPrincipal({
                _id: mongoose.Types.ObjectId(1),
                html: req.body.html
            })

            let respuesta = await a.save()
            res.json(respuesta)
        } else {
            let respuesta = await paginaPrincipal.update({ _id: paginas[0]._id },
                {
                    html: req.body.html
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