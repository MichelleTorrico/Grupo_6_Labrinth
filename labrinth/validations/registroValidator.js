const {check,validationResult,body} = require('express-validator');

const dbUsers = require('../data/dbUsers.json')

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
        for(let i = 0; i<dbUsers.length;i++){
            if(dbUsers[i].email == value){
                return false
            }
        }
        return true
    })
    .withMessage("Este mail ya está registrado"),

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
    .withMessage("Las contraseñas no coinciden"),

    
]