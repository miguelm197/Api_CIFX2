var mongoose = require('mongoose');

var esquemaTarea = new mongoose.Schema({
    resumen: { type: String },
    descripcion: { type: String },
    estado: { type: String },
    usuarioEncargado: { type: String },
    tipo: { type: String },
    comentarios: [
        {
            comentario: { type: String },
            usuario: { type: String },
            fecha: { type: Date }
        }
    ]
});


module.exports.Tarea = mongoose.model('mdl_tarea', esquemaTarea, 'tareas');