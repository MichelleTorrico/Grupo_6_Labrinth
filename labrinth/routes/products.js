var express = require('express');
var router = express.Router();

let products = require('../controllers/productsController');

router.get('/', products.listar);
router.get('/detalle/:id', products.detalle);

router.get('/admin', products.administrar);
router.put('/edit/:id',products.edit)
router.delete('/delete/:id',products.eliminar)

router.get('/carga', products.agregar);
router.post('/carga',products.publicar);
router.get('/show/:id/:flap?',products.show);

module.exports = router;
