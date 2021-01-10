var express = require('express');
var router = express.Router();
const adminMid = require('../middlewares/adminMiddleware');
let products = require('../controllers/productsController');
const cargaValidator = require('../validations/cargaValidator');

router.get('/', products.listar);
router.get('/detalle/:id', products.detalle);
router.get('/categorias/:id', products.categoria);
router.post('/buscar',products.buscar)


router.get('/admin',adminMid, products.administrar);
router.put('/edit/:id',adminMid,products.edit)
router.delete('/delete/:id',adminMid,products.eliminar)

router.get('/carga',adminMid, products.agregar);
router.post('/carga',cargaValidator, adminMid,products.publicar);
router.get('/show/:id/:flap?',adminMid,products.show);

module.exports = router;
