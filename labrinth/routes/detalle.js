var express = require('express');
var router = express.Router();

let detalle = require('../controllers/detalleController')


router.get('/', detalle.producto)

module.exports = router;