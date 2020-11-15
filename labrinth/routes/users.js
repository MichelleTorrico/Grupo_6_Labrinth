var express = require('express');
var router = express.Router();
let users = require('../controllers/usersController')
const upImagesUsers = require('../middlewares/upImagesUsers')
const registroValidator = require('../validations/registroValidator')
const loginValidator = require('../validations/loginValidator');


router.get('/registro', users.nuevoUsuario)
router.post('/registro',upImagesUsers.any(),registroValidator,users.processNuevoUsuario);

router.get('/login', users.login)
router.post('/login',loginValidator,users.processLogin);

router.get('/profile',users.perfil);
router.put('/actPerfil/:id',upImagesUsers.any(),users.actPerfil);

router.get('/logout',users.logout);

router.delete('/delete/:id',users.delete);


module.exports = router;
