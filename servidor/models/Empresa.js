const mongoose = require('mongoose');

const usuarioSchema = mongoose.Schema({
    nombreEmpresa: {
        type: String,
        required: true
    }
}, {
    collection: 'Empresa' // especificar el nombre de la colección
});

module.exports = mongoose.model('Empresa', usuarioSchema);
