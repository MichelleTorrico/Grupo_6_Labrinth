var express = require('express');
var router = express.Router();
let users = require('../controllers/usersController')


router.get('/registro', users.nuevoUsuario)
router.get('/login', users.login)

module.exports = router;
