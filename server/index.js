var express = require("express");
var app = express();

app.use(express.static("../client/dist/gammu"));

app.listen(3333, function(){
    console.log("Servidor levantado");
});