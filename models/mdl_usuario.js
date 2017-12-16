var mongoose = require('mongoose');

var esquemaUsuario = new mongoose.Schema({
    nombre: { type: String },
    apellido: { type: String },
    correo: { type: String },
    clave: { type: String },
    rol: { type: String }
});


module.exports.Usuario = mongoose.model('mdl_usuario', esquemaUsuario, 'usuarios');