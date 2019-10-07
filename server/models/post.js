var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
        html: String,
        titulo: String,
        imagen: String,
        categoria: String,
        permiteComentarios: Boolean,
        fecha: Date,
        comentarios: Array,
        shortcut: String
    }
);

module.exports = mongoose.model('posts', esquema);