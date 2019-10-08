var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
        nombre: String,
        paginas: Array,
        enlaces: Array
    }
);

module.exports = mongoose.model('menus', esquema);