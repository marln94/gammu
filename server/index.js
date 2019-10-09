const express = require("express");
const session = require('express-session');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const database = require('./modules/database');

const usuarioModel = require('./models/usuario');

const archivosRouter = require('./routers/archivos')
const encabezadosRouter = require('./routers/encabezados')
const piesRouter = require('./routers/pies')
const paginasPrincipalesRouter = require('./routers/paginasPrincipales')
const configuracionesRouter = require('./routers/configuraciones')
const paginasRouter = require('./routers/paginas')
const categoriasRouter = require('./routers/categorias')
const postsRouter = require('./routers/posts')
const menusRouter = require('./routers/menus')
const usuariosRouter = require('./routers/usuarios')

const usuario = require('./models/usuario')

app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true })); // support encoded bodies

const corsOptions = {
    origin: 'http://localhost:4444',
    preflightContinue: true,
    credentials: true
    // optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));
// app.use(express.static("../client/dist/gammu"));
app.use(express.static("./public"));

app.use(session({ secret: "ASDFE$%#%", resave: true, saveUninitialized: true, cookie: { secure: false } }));

app.listen(3333, async function () {
    let usuarios = await usuarioModel.find()
    
    if (usuarios.length == 0) {
        database.conexion().collection('usuarios').insertOne({
            nombre: 'Admin',
            apellido: '',
            correo: 'admin@admin.com',
            contrasena: await bcrypt.hash('admin', 10),
            tipoUsuario: 'admin'
        })
    }
    console.log("Servidor levantado");
});

app.use('/api/archivos', archivosRouter)
app.use('/api/encabezados', encabezadosRouter)
app.use('/api/pies', piesRouter)
app.use('/api/paginas-principales', paginasPrincipalesRouter)
app.use('/api/configuraciones', configuracionesRouter)
app.use('/api/paginas', paginasRouter)
app.use('/api/categorias', categoriasRouter)
app.use('/api/posts', postsRouter)
app.use('/api/menus', menusRouter)
app.use('/api/usuarios', usuariosRouter)

app.post("/api/login", async function (req, res) {
    try {
        let data = await usuario.find({
            correo: req.body.correo,
            // contrasena: await bcrypt(req.body.contrasena)
        })

        if (data.length == 1) {
            if (await bcrypt.compare(req.body.contrasena, data[0].contrasena)) {
                req.session.codigoUsuario = data[0]._id;
                req.session.correoUsuario = data[0].correo;
                req.session.tipoUsuario = data[0].tipoUsuario;

                res.send({ status: 1, mensaje: "Usuario autenticado con éxito", usuario: data[0] });
            } else {
                res.send({ status: 0, mensaje: "Credenciales inválidas" });
            }
        } else {
            res.send({ status: 0, mensaje: "Credenciales inválidas" });
        }
    } catch (error) {
        console.error(error);
    }
});

app.get('/api/logged', function (req, res) {
    if (req.session.codigoUsuario)
        res.send(true)
    else
        res.send(false);
})

app.get('/api/usuariosesion', async function (req, res) {
    if (req.session.codigoUsuario) {
        let data = await usuario.findById(req.session.codigoUsuario, { _id: 1, nombre: 1, apellido: 1, tipoUsuario: 1 })
        res.json(data)
    }
    else
        res.send(false);
})

app.get('/api/logout', function (req, res) {
    req.session.destroy();
    res.send(true);
});