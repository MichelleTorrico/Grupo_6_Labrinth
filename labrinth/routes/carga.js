var express = require('express');
var router = express.Router();

let carga= require('../controllers/cargaController')


router.get('/', carga.producto)

module.exports = router;