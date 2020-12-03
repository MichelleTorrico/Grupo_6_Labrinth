const path = require('path');
const fs = require('fs');

const {validationResult} = require('express-validator');
const db = require('../database/models');




module.exports = {
    listar:function(req,res){
        db.Productos.findAll()
        .then(result => {
            res.render('products', {
                title: "Productos",
                productos: result,
                css:'products.css'
            })
        })
    },
    detalle:function(req,res){
        db.Productos.findOne({
            where : {
                id: req.params.id
            },
            include : [
                {
                    association: 'categoria'
                }
            ]
        })
       
        .then(function(producto){


            db.Productos.findAll({
                where: {categories_id: producto.categories_id}
            })

            .then(function(productos){

        res.render('detalle',{
            title:"Detalle del Producto",
            css:"detalle.css",
            producto:producto,
            productos: productos
           
            })
        
        })
    })
    


    },
    agregar:function(req,res){
        let categoria = db.Categorias.findAll()
        let seccion = db.Secciones.findAll()
        
         Promise.all([ categoria, seccion])
               .then(([ categoria, seccion]) =>{
            res.render('carga', 
                    {title : 'Agregar producto',
                    css: "carga.css",
                    categoria : categoria,
                    seccion: seccion,
                    script: 'carga.js'
                   })
                })
},
publicar:function(req,res){
    let errors = validationResult(req);

    if(errors.isEmpty()){
        db.Productos.create({
            nombre: req.body.name.trim(),
           precio: Number(req.body.price),
           descuento:Number(req.body.discount),
           categories_id:req.body.categories_id.trim(),
           sections_id: req.body.sections_id.trim(),
          descripcion:req.body.description.trim(),
           imagen: req.body.image
        })
        
        .then(()=>{
            return res.redirect('/products/admin')
        })
        .catch(error =>{
            res.send(error)
        })
    }
},

    administrar:function(req,res){
        db.Productos.findAll()
        .then(result => {
            res.render('productsAdmin', {
                title: "Administrar productos",
                productos: result,
                css:'products.css'
            })
        })
},
show:function(req,res){
    let idProducto = req.params.id;
    
    let flap = req.params.flap;
    let activeDetail;
    let activeEdit;
    let showDetail;
    let showEdit;

    if(flap == "show"){
        activeDetail = "active";
        showDetail = "show";
    }else{
        activeEdit = "active";
        showEdit = "show";
    }

    // //let posicion = productos.filter(producto =>{
    //     return producto.id == idProducto
    // })//
    

   let producto = db.Productos.findByPk(idProducto,{
        include: [
            {
                association : 'categoria'
            }
        ]
    })

    let minimo = db.Productos.min('id')
    let maximo = db.Productos.max('id')

    let categoria = db.Categorias.findAll()
    let seccion = db.Secciones.findAll()

    let productos = db.Productos.findAll({
        include: [
            {
                association : 'categoria'
            }
        ]
    })


    
    Promise.all([ producto, productos, minimo, maximo, categoria, seccion])
       .then(([ producto, productos, minimo ,maximo, categoria, seccion]) =>{
        console.log(minimo+" -- "+ producto.id+" -- "+ maximo)

let posicion 
    for (let i = 0; i< productos.length; i ++){
        console.log (i)
        if (productos [i].id==idProducto){
            posicion=i
            break
        }
    }
    res.render('productsShow',{
        title: "Ver / Editar Producto",
        css: 'products.css',
        posicion: posicion,
        productos: productos,
        producto: producto,
        activeDetail:activeDetail,
        activeEdit:activeEdit,
        showEdit:showEdit,
        showDetail:showDetail,
        categoria : categoria,
        seccion: seccion,
        minimo: minimo,
        maximo: maximo
    })
    

    })
    
},
edit: function (req, res) {
    let producto = db.Productos.findAll()
    let errors = validationResult(req);

    if(errors.isEmpty()){
        db.Productos.update({
            nombre: req.body.name,
           precio: req.body.price,
           descuento:req.body.discount,
           categories_id:req.body.categories_id,
           sections_id: req.body.sections_id,
          descripcion:req.body.description,
           imagen: producto.image
    },
        {
            where: {
                id: req.params.id
            }
        })

        .then(() => {
            res.redirect('/products/admin')
       })
    }
},
eliminar: function (req, res) {
    db.Productos.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(() => {
        res.redirect('/products/admin')
    })
    .catch(errores => {
        res.send(errores)
    })
},
};