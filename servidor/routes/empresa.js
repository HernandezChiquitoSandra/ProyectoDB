const express = require('express');
const router = express.Router();
const empresaController = require('../controllers/empresaController');

//api rutas
router.get('/', empresaController.obtenerEmpresas);


module.exports = router;