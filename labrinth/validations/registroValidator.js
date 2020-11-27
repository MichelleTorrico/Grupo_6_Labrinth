const {check,validationResult,body} = require('express-validator');

const dbUsers = require('../data/dbUsers.json')

let db = require('../database/models');

module.exports = [
    
   check('nombreCompleto')
    .isLength({
        min:1
    })
    .withMessage("Debes ingresar tu nombre"),


    check('email')
    .isEmail()
    .withMessage("Debes ingresar un email válido"),

    body('email')
    .custom(function(value){
        return db.Usuarios.findOne({
            where : {
                email : value
            }
        })
        .then(user => {
            if(user){
                return Promise.reject('Este mail ya está ingresado en nuestros registros')
            }
        })
     }),

    check('pass')
    .isLength({
        min:6,
        max:12
    })
    .withMessage("Debes ingresar una contraseña entre 6 y 12 caracteres"),

    body('pass2')
    .custom((value,{req}) => {
        if(value != req.body.pass){
            return false
        }
        return true
    })
    .withMessage("Las constraseñas no coiciden"),


    body('avatar')
    .custom((value,{req}) =>{
        if(req.fileValidationError){
            return false
        }else{
            return true
        }
    })
    .withMessage("Solo se permite png, jpg, jpeg, gif"),

   
]