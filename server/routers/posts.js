const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const post = require('../models/post');
const multer = require('multer')
const storage = multer.diskStorage({
    destination: './public/uploads',
	filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
	}
})
const upload = multer({storage: storage})

router.get('/', async function (req, res) {
    try {
        let posts = await post.find().sort({ orden: 1 })
        res.json(posts)
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
        let a = new post({
            html: req.body.html,
            titulo: req.body.titulo,
            imagen: ruta,
            categoria: req.body.categoria,
            permiteComentarios: req.body.permiteComentarios,
            fecha: new Date()
        })

        let respuesta = await a.save()
        res.json(respuesta)

    } catch (error) {
        console.error(error);
    }
})

router.delete('/:id', async function (req, res) {
    try {
        let a = await post.remove({
            _id: req.params.id
        })
        res.json(a)
    } catch (error) {
        console.error(error);
    }
})

module.exports = router