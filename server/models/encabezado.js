var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
        texto: String,
        imagen: String
    }
);

module.exports = mongoose.model('encabezados', esquema);