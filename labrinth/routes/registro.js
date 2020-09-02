var express = require('express');
var router = express.Router();

let registro = require('../controllers/registroController')


router.get('/', registro.nuevoUsuario)

module.exports = router;