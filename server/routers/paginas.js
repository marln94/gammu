const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const pagina = require('../models/pagina');

router.get('/', async function (req, res) {
    try {
        let filtro = {}
        if (req.query.estado) {
            filtro['estado'] = req.query.estado
        }
        let paginas = await pagina.find(filtro).sort({ orden: 1 })
        res.json(paginas)
    } catch (error) {
        console.error(error);
    }
})

router.get('/:id', async function (req, res) {
    try {
        let pag = await pagina.find({
            _id: req.params.id
        })
        res.json(pag)
    } catch (error) {
        console.error(error);
    }
})

router.put('/toggle/:id', async function (req, res) {
    try {
        let pag = await pagina.update({
            _id: req.params.id
        }, {
            estado: req.body.estado == 'activa' ? 'inactiva' : 'activa'
        })
        res.json(pag)
    } catch (error) {
        console.error(error);
    }
})

router.get('/url/:url', async function (req, res) {
    try {
        let pag = await pagina.aggregate([
            {
                $match: {
                    url: req.params.url,
                    estado: 'activa'
                }
            },
            {
                $lookup: {
                    from: 'posts',
                    localField: 'categoria',
                    foreignField: 'categoria',
                    as: 'posts'
                }
            }
        ])
        res.json(pag)
    } catch (error) {
        console.error(error);
    }
})

router.post('/', async function (req, res) {
    try {
        let a = new pagina({
            html: req.body.html,
            tipo: req.body.tipo,
            titulo: req.body.titulo,
            tituloMenu: req.body.tituloMenu,
            descripcion: req.body.descripcion,
            palabrasClave: req.body.palabrasClave,
            estado: 'activa',
            url: req.body.url,
            encabezado: req.body.encabezado,
            pie: req.body.pie,
            menu: req.body.menu,
            categoria: req.body.categoria
        })

        let respuesta = await a.save()
        res.json(respuesta)

    } catch (error) {
        console.error(error);
    }
})

router.put('/:id', async function (req, res) {
    try {
        let a = await pagina.update({_id: req.params.id}, {
            html: req.body.html,
            tipo: req.body.tipo,
            titulo: req.body.titulo,
            tituloMenu: req.body.tituloMenu,
            descripcion: req.body.descripcion,
            palabrasClave: req.body.palabrasClave,
            estado: 'activa',
            url: req.body.url,
            encabezado: req.body.encabezado,
            pie: req.body.pie,
            menu: req.body.menu,
            categoria: req.body.categoria
        })
        res.json(a)
    } catch (error) {
        console.error(error);
    }
})

router.delete('/:id', async function (req, res) {
})

module.exports = router