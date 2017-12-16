var mongoose = require('mongoose');

var SCH_Colecta = require('../models/mdl_colecta').Colecta;


//GET - Retorna todas las colectas de la Base de Datos
exports.consultaColectas = function (req, res) {
    SCH_Colecta.find(function (err, colectas) {
        if (err) res.send(500, err.message);
        console.log('GET /colectas');
        res.status(200).jsonp(colectas);
    });
};

//GET - Retorna una colecta con id
exports.consultaColectaPorId = function (req, res) {
    SCH_Colecta.findById(req.params.id, function (err, colecta) {
        if (err) res.send(500, err.message);
        console.log('GET /colectas/' + req.params.id);
        res.status(200).jsonp(colecta);
    });
};

//POST - Agrega una nueva colecta en la Base de Datos
exports.agregarColecta = function (req, res) {
    console.log('POST');
    console.log(req.body);

    var colecta = new SCH_Colecta({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        monObjetivo: req.body.monObjetivo,
        usuarios: req.body.yo
    });
    colecta.save(function (err, tarea) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(colecta);
    });
};

//PUT - Actualizar una colecta por id en la Base de Datos
exports.actualizarColectaPorId = function (req, res) {

    var password = req.body.clave;

    SCH_Colecta.findById(req.params.id, function (err, colecta) {
        colecta.nombre = req.body.nombre;
        colecta.descripcion = req.body.descripcion;
        colecta.monObjetivo = req.body.monObjetivo;
        colecta.usuarios = req.body.usuarios;

        colecta.save(function (err) {
            if (err) return res.send(500, err.message);
            console.log('PUT Se modificó una colecta');
            console.log(req.body);
            res.status(200).jsonp(colecta);
        });
    });
};

//DELETE - Eliminar una colecta por id de la Base de Datos
exports.eliminarColectaPorId = function (req, res) {
    SCH_Colecta.findById(req.params.id, function (err, colecta) {
        colecta.remove(function (err) {
            if (err) return res.send(500, err.message);
            var mensaje = { status: "Ok" }
            console.log('DELETE Se eliminó una colecta');
            console.log(colecta);
            res.status(200).jsonp(mensaje);
        })
    });
};