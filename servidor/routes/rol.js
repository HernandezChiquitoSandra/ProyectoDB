const express = require('express');
const router = express.Router();
const rolController = require('../controllers/rolController');

//api rutas
router.get('/', rolController.obtenerRoles);


module.exports = router;