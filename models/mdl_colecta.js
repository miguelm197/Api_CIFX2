var mongoose = require('mongoose');

var esquemaColecta = new mongoose.Schema({
    nombre: { type: String },
    descripcion: { type: String },
    monObjetivo: { type: String },
    usuarios: [
        {
            usuario: { type: String },
            rol: { type: String }
        }
    ],
    montos: [
        {
            usuario: { type: String },
            monto: { type: Number }
        }
    ],
    comentarios: [
        {
            comentario: { type: String },
            usuario: { type: String },
            fecha: { type: Date }
        }
    ]
});


module.exports.Colecta = mongoose.model('mdl_colecta', esquemaColecta, 'colectas');