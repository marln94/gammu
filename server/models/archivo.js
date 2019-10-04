var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
        nombre: String,
        ruta: String,
        tipo: String,
        extension: String,
        shortcut: String,
        miniatura: String
    }
);

module.exports = mongoose.model('archivos', esquema);