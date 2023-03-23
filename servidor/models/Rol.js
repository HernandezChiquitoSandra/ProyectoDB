const mongoose = require('mongoose');

const usuarioSchema = mongoose.Schema({
    tipoRol: {
        type: String,
        required: true
    }
}, {
    collection: 'Rol' // especificar el nombre de la colección
});

module.exports = mongoose.model('Rol', usuarioSchema);
