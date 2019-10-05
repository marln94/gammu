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

const configuracion = require('../models/configuracion');

router.get('/', async function (req, res) {
    try {
        let configuraciones = await configuracion.find().sort({ orden: 1 })
        res.json(configuraciones)
    } catch (error) {
        console.error(error);
    }
})

router.get('/:id', function (req, res) {

})

var cpUpload = upload.fields([{ name: 'favicon', maxCount: 1 }, { name: 'logo', maxCount: 1 }])
router.post('/', cpUpload, async function (req, res) {
    try {
        let favicon
        let logo

        if (req.files['favicon']) {
            favicon = 'http://localhost:3333/' + req.files['favicon'][0].path.substring(6)
        }
        if (req.files['logo']) {
            logo = 'http://localhost:3333/' + req.files['logo'][0].path.substring(6)
        }

        let configuraciones = await configuracion.find().sort({ orden: 1 })

        if (configuraciones.length == 0) {
            let a = new configuracion({
                _id: mongoose.Types.ObjectId(1),
                titulo: req.body.titulo,
                descripcion: req.body.descripcion,
                palabrasClave: req.body.palabrasClave,
                favicon: favicon,
                logo: logo,
                css: req.body.css,
                javascript: req.body.javascript,
            })

            let respuesta = await a.save()
            res.json(respuesta)
        } else {
            let respuesta = await configuracion.update({ _id: configuraciones[0]._id },
                {
                    titulo: req.body.titulo || configuraciones[0].titulo,
                    descripcion: req.body.descripcion || configuraciones[0].descripcion,
                    palabrasClave: req.body.palabrasClave || configuraciones[0].palabrasClave,
                    favicon: favicon || configuraciones[0].favicon,
                    logo: logo || configuraciones[0].logo,
                    css: req.body.css || configuraciones[0].css,
                    javascript: req.body.javascript || configuraciones[0].javascript
                })
            res.json(respuesta)
        }

    } catch (error) {
        console.error(error);
    }
})

router.delete('/:id', async function (req, res) {
    try {
        let a = await archivo.remove({ _id: req.params.id })
        res.json(a)
    } catch (error) {
        console.error(error)
    }
})

module.exports = router