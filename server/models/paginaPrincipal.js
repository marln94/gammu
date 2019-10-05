var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
        html: String
    }
);

module.exports = mongoose.model('paginasPrincipales', esquema);