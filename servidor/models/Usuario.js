const mongoose = require('mongoose');

const usuarioSchema = mongoose.Schema({
    nombreUsuario: {
        type: String,
        required: true
    },
    apePaterno: {
        type: String,
        required: true
    },
    apeMaterno: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    edad: {
        type: Number,
        required: true
    },
    genero: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        required: true
    },
    empresa: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        default: 1
    },
    contrasena: {
        type: String
    }
}, {
    collection: 'Usuario' // especificar el nombre de la colección
});

module.exports = mongoose.model('Usuario', usuarioSchema);
