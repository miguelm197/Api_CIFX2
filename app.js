var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
// var authCtrl = require('./auth');
// var middleware = require('./middleware');


var connectionString = "mongodb://root:toor@ds125113.mlab.com:25113/cifx2";
mongoose.connect(connectionString, function (err, res) {
    if (err) throw err;
    console.log('Conectado a la Base de Datos');
});

//ESTO PERMITE RECIBIR PETICIONES FUERA DE ESTE DOMINIO
function perimitirCrossDomain(req, res, next) {
    //en vez de * se puede definir SÓLO los orígenes que permitimos
    res.header('Access-Control-Allow-Origin', '*');
    //metodos http permitidos para CORS
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(perimitirCrossDomain);

//usuario
require('./models/mdl_usuario');
var CtrlUsuario = require('./controllers/ctrl_usuario');

//colectas
require('./models/mdl_tarea');
var CtrlTarea = require('./controllers/ctrl_tarea');


// Ruteo
var router = express.Router();

router.get('/', function (req, res) {
    res.send("Que tal sabandijas!");
});

// router.route('/usuarios')
//     .get(CtrlUsuario.consultaUsuarios)
//     .post(CtrlUsuario.agregarUsuario)

router.route('/usuarios/:id')
    .get(CtrlUsuario.consultaUsuarioPorId)
    .put(CtrlUsuario.actualizarUsuarioPorId)
    .delete(CtrlUsuario.eliminarUsuarioPorId)

router.route('/tareas')
    .get(CtrlTarea.consultaTareas)
    .post(CtrlTarea.agregarTarea)

router.route('/tareas/:id')
    .get(CtrlTarea.consultaTareaPorId)
    .put(CtrlTarea.actualizarTareaPorId)
    .delete(CtrlTarea.eliminarTareaPorId)

// router.route('/comentarios/')
//     .post(CtrlColecta.agregarComentario)
//     .put(CtrlColecta.actualizarComentarioColectaPorId)
//     .delete(CtrlColecta.eliminarComentarioColectaPorId)

// router.route('/colaboradores/')
//     .post(CtrlColecta.agregarColaboradorColectaPorId)
//     .delete(CtrlColecta.eliminarColaboradorColectaPorId)

app.use(router);

// Start server
var port = process.env.PORT || 3000
app.listen(port, function () {
    console.log("Node server running");
});


