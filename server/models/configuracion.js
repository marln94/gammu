var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
        titulo: String,
        descripcion: String,
        palabrasClave: Array,
        favicon: String,
        logo: String,
        css: String,
        javascript: String
    }
);

module.exports = mongoose.model('configuraciones', esquema);