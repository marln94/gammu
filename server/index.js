var express = require("express");
var session = require('express-session');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');

const database = require('./modules/database');

const usuario = require('./models/usuario');

const archivosRouter = require('./routers/archivos')
const encabezadosRouter = require('./routers/encabezados')
const piesRouter = require('./routers/pies')
const paginasPrincipalesRouter = require('./routers/paginasPrincipales')

app.use(bodyParser.json({limit: '10mb', extended: true}));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true })); // support encoded bodies

const corsOptions = {
    origin: 'http://localhost:4200',
    preflightContinue: true,
    credentials: true
    // optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));
app.use(express.static("../client/dist/gammu"));
app.use(express.static("./public"));

app.use(session({ secret: "ASDFE$%#%", resave: true, saveUninitialized: true, cookie: { secure: false } }));

app.listen(3333, function () {
    console.log("Servidor levantado");
});

app.use('/api/archivos', archivosRouter)
app.use('/api/encabezados', encabezadosRouter)
app.use('/api/pies', piesRouter)
app.use('/api/paginas-principales', paginasPrincipalesRouter)

app.post("/api/login", function (req, res) {
    // console.log(req.body.correo, req.body.contrasena);


    usuario.find({ correo: req.body.correo, contrasena: req.body.contrasena })
        .then(data => {
            // console.log(data);

            if (data.length == 1) {//Significa que si encontro un usuario con las credenciales indicadas
                //Establecer las variables de sesion

                req.session.codigoUsuario = data[0]._id;
                req.session.correoUsuario = data[0].correo;
                req.session.codigoTipoUsuario = data[0].tipoUsuario;

                // req.session.save()
                // console.log('save ', req.session);

                res.send({ status: 1, mensaje: "Usuario autenticado con éxito", usuario: data[0] });
            } else {
                res.send({ status: 0, mensaje: "Credenciales inválidas" });
            }

        })
        .catch(error => {
            res.send(error);
        });
});

app.get('/api/logged', function (req, res) {
    console.log('logged ', req.session);

    if (req.session.codigoUsuario)
        res.send(true)
    else
        res.send(false);
    // res.send(true)
})

app.get('/api/logout', function (req, res) {
    console.log(req.session.codigoUsuario);

    req.session.destroy();
    console.log('sesión destruida');

    res.send(true);
});