var mongoose = require('mongoose');

var SCH_Tarea = require('../models/mdl_tarea').Tarea;


//GET - Retorna todas las tareas de la Base de Datos
exports.consultaTareas = function (req, res) {
    SCH_Tarea.find(function (err, tareas) {
        if (err) res.send(500, err.message);
        console.log('GET /tareas');
        res.status(200).jsonp(tareas);
    });
};

//GET - Retorna una tarea con id
exports.consultaTareaPorId = function (req, res) {
    SCH_Tarea.findById(req.params.id, function (err, tarea) {
        if (err) res.send(500, err.message);
        console.log('GET /tarea/' + req.params.id);
        res.status(200).jsonp(tarea);
    });
};

//POST - Agrega una nueva tarea en la Base de Datos
exports.agregarTarea = function (req, res) {
    console.log('POST');
    console.log(req.body);

    var tarea = new SCH_Tarea({
        resumen: req.body.resumen,
        descripcion: req.body.descripcion,
        estado: req.body.estado,
        usuarioEncargado: req.body.usuarioEncargado,
        tipo: req.body.tipo
    });
    tarea.save(function (err, tarea) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(tarea);
    });
};

//PUT - Actualizar una tarea por id en la Base de Datos
exports.actualizarTareaPorId = function (req, res) {

    SCH_Tarea.findById(req.params.id, function (err, tarea) {

        tarea.resumen = req.body.resumen;
        tarea.descripcion = req.body.descripcion;
        tarea.estado = req.body.estado;
        tarea.usuarioEncargado = req.body.usuarioEncargado;
        tarea.tipo = req.body.tipo;

        tarea.save(function (err) {
            if (err) return res.send(500, err.message);
            console.log('PUT Se modificó una tarea');
            console.log(req.body);
            res.status(200).jsonp(tarea);
        });
    });
};

//DELETE - Eliminar una tarea por id de la Base de Datos
exports.eliminarTareaPorId = function (req, res) {
    SCH_Tarea.findById(req.params.id, function (err, tarea) {
        tarea.remove(function (err) {
            if (err) return res.send(500, err.message);
            var mensaje = { status: "Ok" }
            console.log('DELETE Se eliminó una tarea');
            console.log(tarea);
            res.status(200).jsonp(mensaje);
        })
    });
};






// //POST - Agrega un nuevo comentario en la colecta 
// exports.agregarComentario = function (req, res) {

//     var idColecta = req.body.idColecta;
//     var idUsuario = req.body.idUsuario;
//     var comentario = req.body.comentario;
//     var fecha = new Date();

//     SCH_Colecta.findById(idColecta, function (err, colecta) {
//         console.log(colecta)
//         colecta.comentarios.push(
//             {
//                 "usuario": idUsuario,
//                 "fecha": fecha,
//                 "comentario": comentario
//             }
//         )

//         colecta.save(function (err) {
//             if (err) return res.send(500, err.message);
//             console.log('Se agregó un comentario');
//             console.log(req.body);
//             res.status(200).jsonp(colecta.comentarios);
//         });
//     });
// };

// //PUT - Actualizar un comentario de una colecta por id en la Base de Datos
// exports.actualizarComentarioColectaPorId = function (req, res) {

//     var idColecta = req.body.idColecta;
//     var idComentario = req.body.idComentario;
//     var comentario = req.body.comentario;
//     var fecha = new Date();


//     SCH_Colecta.findById(idColecta, function (err, colecta) {
//         var cant = colecta.comentarios.length;
//         var index = 0;
//         for (var i = 0; i < cant; i++) {
//             if (colecta.comentarios[i].id == idComentario) {
//                 colecta.comentarios[i].comentario = comentario;
//                 colecta.comentarios[i].fecha = fecha;
//                 index = i;
//                 break;
//             }
//         }

//         colecta.save(function (err) {
//             if (err) return res.send(500, err.message);
//             console.log('PUT Se modificó un comentario');
//             console.log(colecta.comentarios[index]);
//             res.status(200).jsonp(colecta.comentarios[index]);
//         });
//     });
// };


// //DELETE - Eliminar un comentario de colecta por id de la Base de Datos
// exports.eliminarComentarioColectaPorId = function (req, res) {
//     var idColecta = req.body.idColecta;
//     var idComentario = req.body.idComentario;

//     SCH_Colecta.findById(idColecta, function (err, colecta) {
//         var cant = colecta.comentarios.length;
//         var index = 0;

//         for (var i = 0; i < cant; i++) {
//             if (colecta.comentarios[i].id == idComentario) {
//                 colecta.comentarios.splice(i, 1)
//                 index = i;
//                 break;
//             }
//         }

//         colecta.save(function (err) {
//             if (err) return res.send(500, err.message);
//             var mensaje = { status: "Ok" }
//             console.log('DELETE Se eliminó una colecta');
//             console.log(colecta.comentarios[index]);
//             res.status(200).jsonp(mensaje);
//         });
//     });
// };




// //POST - Asocia un usuario a una colecta por ID
// exports.agregarColaboradorColectaPorId = function (req, res) {

//     var idColecta = req.body.idColecta;
//     var idUsuario = req.body.idUsuario;

//     SCH_Colecta.findById(idColecta, function (err, colecta) {
//         var objeto = {
//             "usuario": idUsuario,
//             "rol": "colaborador",
//             "monto": 0
//         }
//         colecta.usuarios.push(objeto)

//         colecta.save(function (err) {
//             if (err) return res.send(500, err.message);
//             console.log('Se agregó un usuario a la colecta');
//             console.log(objeto);
//             res.status(200).jsonp(objeto);
//         });
//     });
// };


// //DELETE - Eliminar un colaborador de colecta por id de la Base de Datos
// exports.eliminarColaboradorColectaPorId = function (req, res) {
//     var idColecta = req.body.idColecta;
//     var idUsuario = req.body.idUsuario;

//     SCH_Colecta.findById(idColecta, function (err, colecta) {
//         var cant = colecta.usuarios.length;
//         var index = 0;

//         for (var i = 0; i < cant; i++) {
//             if (colecta.usuarios[i].usuario == idUsuario) {
//                 colecta.usuarios.splice(i, 1)
//                 index = i;
//                 break;
//             }
//         }

//         colecta.save(function (err) {
//             if (err) return res.send(500, err.message);
//             var mensaje = { status: "Ok" }
//             console.log('DELETE Se eliminó un colaborador de la colecta');
//             console.log(colecta.usuarios);
//             res.status(200).jsonp(mensaje);
//         });
//     });
// };