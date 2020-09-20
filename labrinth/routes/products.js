var express = require('express');
var router = express.Router();

let products = require('../controllers/productsController');

router.get('/', products.listar);
router.get('/detalle/:id', products.detalle);
router.get('/edit', products.editar);
router.get('/carga', products.agregar);
/*
router.get('/show/:id/:flap?',products.show);
*/
module.exports = router;
