var mongoose = require('mongoose');

var SCH_Usuario = require('../models/mdl_usuario').Usuario;


//GET - Retorna todas las Tareas de la Base de Datos
exports.consultaUsuarios = function (req, res) {
    SCH_Usuario.find(function (err, usuarios) {
        if (err) res.send(500, err.message);
        console.log('GET /usuarios');
        res.status(200).jsonp(usuarios);
    });
};


//POST - Agrega una nueva tarea en la Base de Datos
exports.agregarUsuario = function (req, res) {
    console.log('POST');
    console.log(req.body);

    var usuario = new SCH_Usuario({
        nombre: req.body.nombre,
        apellido: req.body.apellido
    });
    usuario.save(function (err, tarea) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(usuario);
    });
};



// //DELETE - Eliminar una tarea de la Base de Datos
// exports.eliminarTarea = function (req, res) {
//     SCH_Tarea.findById(req.params.id, function (err, tarea) {
//         tarea.remove(function (err) {
//             if (err) return res.send(500, err.message);
//             res.status(200);
//         })
//     });
// };
