var mongoose = require('mongoose');

var esquemaUsuario = new mongoose.Schema({
    nombre: { type: String },
    apellido: { type: String }
});


module.exports.Usuario = mongoose.model('mdl_usuario', esquemaUsuario, 'usuarios');