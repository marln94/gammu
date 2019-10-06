var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
        html: String,
        tipo: String,
        titulo: String,
        tituloMenu: String,
        descripcion: String,
        palabrasClave: Array,
        estado: String,
        url: String,
        encabezado: Boolean,
        pie: Boolean,
        menu: Boolean
    }
);

module.exports = mongoose.model('paginas', esquema);