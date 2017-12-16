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

//GET - Retorna un usuario con id
exports.consultaUsuarioPorId = function (req, res) {
    SCH_Usuario.findById(req.params.id, function (err, usuario) {
        if (err) res.send(500, err.message);
        console.log('GET /usuarios/' + req.params.id);
        res.status(200).jsonp(usuario);
    });
};

//POST - Agrega una nueva tarea en la Base de Datos
exports.agregarUsuario = function (req, res) {
    console.log('POST');
    console.log(req.body);

    var usuario = new SCH_Usuario({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        correo: req.body.correo,
        clave: req.body.clave,
        rol: req.body.rol
    });
    usuario.save(function (err, tarea) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(usuario);
    });
};

//PUT - Actualizar un usuario por id en la Base de Datos
exports.actualizarUsuarioPorId = function (req, res) {

    var password = req.body.clave;
    bcrypt.hash(password, 12).then(function (claveHasheada) {

        SCH_Usuario.findById(req.params.id, function (err, usuario) {
            usuario.nombre = req.body.nombre;
            usuario.apellido = req.body.apellido;
            usuario.correo = req.body.correo;
            usuario.clave = req.body.clave;
            usuario.rol = req.body.rol;

            usuario.save(function (err) {
                if (err) return res.send(500, err.message);
                console.log('PUT Se modificó un usuario');
                console.log(req.body);
                res.status(200).jsonp(usuario);
            });
        });
    });
};

//DELETE - Eliminar un usuario por id de la Base de Datos
exports.eliminarUsuarioPorId = function (req, res) {
    SCH_Usuario.findById(req.params.id, function (err, usuario) {
        usuario.remove(function (err) {
            if (err) return res.send(500, err.message);
            var mensaje = { status: "Ok" }
            console.log('DELETE Se eliminó un usuario');
            console.log(usuario);
            res.status(200).jsonp(mensaje);
        })
    });
};

