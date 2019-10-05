const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer')
const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const upload = multer({ storage: storage })

const encabezado = require('../models/encabezado');

router.get('/', async function (req, res) {
    try {
        let encabezados = await encabezado.find().sort({ orden: 1 })
        res.json(encabezados)
    } catch (error) {
        console.error(error);
    }
})

router.get('/:id', function (req, res) {

})

router.post('/', upload.single('imagen'), async function (req, res) {
    try {        
        let ruta

        if (req.file) {
            ruta = 'http://localhost:3333/' + req.file.path.substring(6)
        }

        let encabezados = await encabezado.find().sort({ orden: 1 })

        if (encabezados.length == 0) {
            let a = new encabezado({
                _id: mongoose.Types.ObjectId(1),
                imagen: ruta,
                texto: req.body.textoEncabezado
            })

            let respuesta = await a.save()
            res.json(respuesta)
        } else {
            let respuesta = await encabezado.update({ _id: encabezados[0]._id },
                {
                    imagen: ruta || encabezados[0].imagen,
                    texto: req.body.textoEncabezado
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