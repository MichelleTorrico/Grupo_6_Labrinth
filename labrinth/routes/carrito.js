var express = require('express');
var router = express.Router();

let carrito = require('../controllers/carritoController')


router.get('/', carrito.producto)

module.exports = router;