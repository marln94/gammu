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
const upload = multer({storage: storage})

const archivo = require('../models/archivo');

router.get('/', async function(req, res) {
    try {
        let archivos = await archivo.find().sort({orden: 1})
        res.json(archivos)
    } catch (error) {
        console.error(error);
    }
})

router.get('/galeria', async function(req, res) {
    try {
        let ids = req.query.ids
        let archivos = await archivo.find({
            _id: {
                $in: ids
            }
        }).sort({orden: 1})
        res.json(archivos)
    } catch (error) {
        console.error(error);
    }
})

router.get('/:id', async function(req, res) {
    try {
        let a = await archivo.find({
            _id: req.params.id
        })
        res.json(a)
    } catch (error) {
        console.error(error);
    }
})

router.post('/', upload.single('archivo'), async function(req, res) {
    try {
        let id = mongoose.Types.ObjectId()
        let shortcut
        if (req.file.mimetype.includes('image')) {
            shortcut = JSON.stringify({tipo: 'imagen', id: id})
        } else {
            shortcut = JSON.stringify({tipo: 'enlace', id: id})
        }

        let ruta = 'http://localhost:3333/' + req.file.path.substring(6)
        let a = new archivo({
            _id: id,
            nombre: req.file.originalname,
            ruta: ruta,
            tipo: req.file.mimetype,
            extension: req.file.originalname.split('.').pop(),
            shortcut: shortcut,
            miniatura: req.file.mimetype.includes('image') ? ruta : null
        })

        let respuesta = await a.save()
        res.json(respuesta)
    } catch (error) {
        console.error(error);
    }
})

router.delete('/:id', async function(req, res) {
    try {
        let a = await archivo.remove({_id: req.params.id})
        res.json(a)
    } catch (error) {
        console.error(error)
    }
})

module.exports = router