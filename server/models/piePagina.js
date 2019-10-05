var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
        texto: String
    }
);

module.exports = mongoose.model('pies', esquema);