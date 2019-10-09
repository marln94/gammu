const express = require("express");
const compression = require('compression')
const path = require('path')
const app = express();

app.use(compression())

const carpetaDist = './dist/gammu'

app.use(express.static(carpetaDist));

app.get('/', function(req, res) {
    res.sendFile(path.resolve(carpetaDist + '/index.html'))
})
app.get('/*', function(req, res) {
    res.sendFile(path.resolve(carpetaDist + '/index.html'))
})

app.listen(4444, function () {
    console.log("Servidor levantado");
});