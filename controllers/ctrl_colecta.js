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
        usuarios: [
            {
                "usuario": req.body.yo,
                "rol": "admin"
            }
        ]
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






//POST - Agrega un nuevo comentario en la colecta 
exports.agregarComentario = function (req, res) {

    var idColecta = req.body.idColecta;
    var idUsuario = req.body.idUsuario;
    var comentario = req.body.comentario;
    var fecha = new Date();

    SCH_Colecta.findById(idColecta, function (err, colecta) {
        console.log(colecta)
        colecta.comentarios.push(
            {
                "usuario": idUsuario,
                "fecha": fecha,
                "comentario": comentario
            }
        )

        colecta.save(function (err) {
            if (err) return res.send(500, err.message);
            console.log('Se agregó un comentario');
            console.log(req.body);
            res.status(200).jsonp(colecta.comentarios);
        });
    });
};

//PUT - Actualizar un comentario de una colecta por id en la Base de Datos
exports.actualizarComentarioColectaPorId = function (req, res) {

    var idColecta = req.body.idColecta;
    var idComentario = req.body.idComentario;
    var comentario = req.body.comentario;
    var fecha = new Date();


    SCH_Colecta.findById(idColecta, function (err, colecta) {
        var cant = colecta.comentarios.length;
        var index = 0;
        for (var i = 0; i < cant; i++) {
            if (colecta.comentarios[i].id == idComentario) {
                colecta.comentarios[i].comentario = comentario;
                colecta.comentarios[i].fecha = fecha;
                index = i;
                break;
            }
        }

        colecta.save(function (err) {
            if (err) return res.send(500, err.message);
            console.log('PUT Se modificó un comentario');
            console.log(colecta.comentarios[index]);
            res.status(200).jsonp(colecta.comentarios[index]);
        });
    });
};


//DELETE - Eliminar un comentario de colecta por id de la Base de Datos
exports.eliminarComentarioColectaPorId = function (req, res) {
    var idColecta = req.body.idColecta;
    var idComentario = req.body.idComentario;

    SCH_Colecta.findById(idColecta, function (err, colecta) {
        var cant = colecta.comentarios.length;
        var index = 0;

        for (var i = 0; i < cant; i++) {
            if (colecta.comentarios[i].id == idComentario) {
                colecta.comentarios.splice(i, 1)
                index = i;
                break;
            }
        }

        colecta.save(function (err) {
            if (err) return res.send(500, err.message);
            var mensaje = { status: "Ok" }
            console.log('DELETE Se eliminó una colecta');
            console.log(colecta.comentarios[index]);
            res.status(200).jsonp(mensaje);
        });
    });
};




//POST - Asocia un usuario a una colecta por ID
exports.agregarColaboradorColectaPorId = function (req, res) {

    var idColecta = req.body.idColecta;
    var idUsuario = req.body.idUsuario;

    SCH_Colecta.findById(idColecta, function (err, colecta) {
        var objeto = {
            "usuario": idUsuario,
            "rol": "colaborador",
            "monto": 0
        }
        colecta.usuarios.push(objeto)

        colecta.save(function (err) {
            if (err) return res.send(500, err.message);
            console.log('Se agregó un usuario a la colecta');
            console.log(objeto);
            res.status(200).jsonp(objeto);
        });
    });
};


//DELETE - Eliminar un colaborador de colecta por id de la Base de Datos
exports.eliminarColaboradorColectaPorId = function (req, res) {
    var idColecta = req.body.idColecta;
    var idUsuario = req.body.idUsuario;

    SCH_Colecta.findById(idColecta, function (err, colecta) {
        var cant = colecta.usuarios.length;
        var index = 0;

        for (var i = 0; i < cant; i++) {
            if (colecta.usuarios[i].usuario == idUsuario) {
                colecta.usuarios.splice(i, 1)
                index = i;
                break;
            }
        }

        colecta.save(function (err) {
            if (err) return res.send(500, err.message);
            var mensaje = { status: "Ok" }
            console.log('DELETE Se eliminó un colaborador de la colecta');
            console.log(colecta.usuarios);
            res.status(200).jsonp(mensaje);
        });
    });
};