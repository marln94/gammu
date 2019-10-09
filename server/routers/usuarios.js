const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const usuario = require('../models/usuario');

router.get('/', async function (req, res) {
    try {
        let usuarios = await usuario.find({},{nombre: 1, apellido: 1, tipoUsuario: 1, correo: 1}).sort({ orden: 1 })
        res.json(usuarios)
    } catch (error) {
        console.error(error);
    }
})

router.get('/:id', function (req, res) {

})

router.post('/', async function (req, res) {
    try {
        let a = new usuario({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            correo: req.body.correo,
            contrasena: await bcrypt.hash(req.body.contrasena, 10),
            tipoUsuario: req.body.tipoUsuario
        })

        let respuesta = await a.save()
        res.json(a)

    } catch (error) {
        console.error(error);
    }
})

router.delete('/:id', async function (req, res) {
    try {
        let a = await usuario.remove({
            _id: req.params.id
        })
        res.json(a)
    } catch (error) {
        console.error(error);
    }
})

module.exports = router