const {check,validationResult,body} = require('express-validator');
let db = require('../database/models');
module.exports = [

    check('name')
    .isLength({
        min:5
    })
    .withMessage('El nombre del producto es obligatorio'),

    check('description')
    .isLength({
        min:10
    })
    .withMessage('La descripcion del producto es obligatoria'),

    check('price')
    .isInt({
        min:1
    }).withMessage('El producto debe tener un precio válido'),

    check('discount')
    .isInt({
        min:1
    }).withMessage('Si no posee descuento poner 0 (cero)'),

    check('categories_id')
    .isLength({
        min:1
    })
    .withMessage('La categoria del producto es obligatoria'),

    check('sections_id')
    .isLength({
        min:1
    })
    .withMessage('La sección del producto es obligatoria'),

    

    body('image')
    .custom((value,{req}) =>{
        if(req.fileValidationError){
            return false
        }else{
            return true
        }
    })
    .withMessage("Solo se permite png, jpg, jpeg, gif")

   
    

]