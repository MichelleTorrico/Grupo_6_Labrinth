var express = require('express');
var router = express.Router();
const loginMid = require('../middlewares/loginMiddleware');
let carrito = require('../controllers/carritoController')


router.get('/',loginMid, carrito.producto)

module.exports = router;