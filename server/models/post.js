var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
        html: String,
        titulo: String,
        imagen: String,
        categoria: String,
        permiteComentarios: Boolean,
        fecha: Date
    }
);

module.exports = mongoose.model('posts', esquema);