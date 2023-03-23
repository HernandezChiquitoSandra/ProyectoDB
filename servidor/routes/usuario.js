const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

//api rutas
router.post('/',usuarioController.crearUsuario);
router.post('/login', usuarioController.login)
//router.get('/', usuarioController.obtenerUsuarios);
router.put('/:id', usuarioController.verifyToken, usuarioController.actualizarUsuario);
router.get('/:id', usuarioController.verifyToken, usuarioController.obtenerUsuario);
router.delete('/:id', usuarioController.verifyToken, usuarioController.eliminarUsuarioLog);
router.get('/', usuarioController.verifyToken, usuarioController.obtenerUsuariosOrdenados);


module.exports = router;