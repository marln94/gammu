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
const upload = multer({ storage: storage })

router.get('/', async function (req, res) {
    try {
        let posts = await post.find().sort({ orden: 1 })
        res.json(posts)
    } catch (error) {
        console.error(error);
    }
})

router.get('/:id', async function (req, res) {
    try {
        let p = await post.find({ _id: req.params.id })
        res.json(p)
    } catch (error) {
        console.error(error);
    }
})

router.post('/', upload.single('imagen'), async function (req, res) {
    try {
        let ruta
        if (req.file) {
            ruta = 'http://localhost:3333/' + req.file.path.substring(6)
        }
        let id = mongoose.Types.ObjectId()
        let shortcut = JSON.stringify({ tipo: 'entrada', id: id })
        let a = new post({
            _id: id,
            html: req.body.html,
            titulo: req.body.titulo,
            imagen: ruta,
            categoria: req.body.categoria,
            permiteComentarios: req.body.permiteComentarios,
            fecha: new Date(),
            shortcut: shortcut
        })

        let respuesta = await a.save()
        res.json(respuesta)

    } catch (error) {
        console.error(error);
    }
})

router.post('/:id/comentarios', async function (req, res) {
    try {
        let a = await post.update({
            _id: req.params.id
        }, {
            $push: {
                comentarios: {
                    _id: mongoose.Types.ObjectId(),
                    usuario: req.body.usuario,
                    texto: req.body.texto,
                    fecha: new Date()
                }
            }
        })
        res.json(a)
    } catch (error) {
        console.error(error)
    }
})

router.get('/todos/comentarios', async function (req, res) {
    try {
        let a = await post.aggregate(
            [{
                $unwind: {
                    path: '$comentarios'
                }
            }, {
                $project: {
                    "comentarios._id": 1,
                    "comentarios.texto": 1,
                    "comentarios.fecha": 1,
                    "comentarios.usuario.nombre": 1,
                    "comentarios.usuario.apellido": 1,
                    titulo:1,
                    _id: 0
                }
            }]
        )
        res.json(a)
    } catch (error) {
        console.error(error)
    }
})

router.put('/:id', upload.single('imagen'), async function (req, res) {
    try {
        let ruta
        if (req.file) {
            ruta = 'http://localhost:3333/' + req.file.path.substring(6)
        }
        let doc = {
            html: req.body.html,
            titulo: req.body.titulo,
            categoria: req.body.categoria,
            permiteComentarios: req.body.permiteComentarios,
            fecha: new Date()
        }
        if (ruta) doc.imagen = ruta
        let respuesta = await post.update({ _id: req.params.id }, doc)

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