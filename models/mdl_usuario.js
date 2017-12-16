exports = module.exports = function (app, mongoose) {

    var esquemaUsuario = new mongoose.Schema({
        nombre:   { type: String },
        apellido: { type: String }
    });

    mongoose.model('mdl_usuario', esquemaUsuario, 'usuario');
    //                 /              |            \
    //                /               |             \
    //      Nombre de referencia      |              |
    //                      esquema exportado        |
    //                                       documento de la bd
};