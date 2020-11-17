const path = require('path');
const dbProductos = require(path.join(__dirname,'..','data','dbProductos'));
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
        res.render('carga',{
            title: "Agregar producto",
            css:"carga.css"
        })
},
publicar:function(req,res){
   let lastID = 1;
   dbProductos.forEach(producto=>{
       if(producto.id > lastID){
           lastID = producto.id
       }
   })
   let newProduct = {
       id:lastID +1,
       nombre: req.body.name.trim(),
       precio: Number(req.body.price),
       descuento:Number(req.body.discount),
       categoria:req.body.category.trim(),
       descripcion:req.body.description.trim(),
       imagen: req.body.image
   }
   dbProductos.push(newProduct);
   fs.writeFileSync(path.join(__dirname,"..","data","productosDataBase.json"),JSON.stringify(dbProductos),'utf-8')
   res.redirect('/products')
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

    let resultado = dbProductos.filter(producto =>{
        return producto.id == idProducto
    })

    res.render('productsShow',{
        title: "Ver / Editar Producto",
        css: 'products.css',
        productos: dbProductos,
        total: dbProductos.length,
        producto: resultado[0],
        activeDetail:activeDetail,
        activeEdit:activeEdit,
        showEdit:showEdit,
        showDetail:showDetail
    })

},
edit: function (req, res, next) {
    db.Productos.update({
        nombre : req.body.name,
        precio: req.body.price,
        descuento: req.body.discount,
        descripcion: req.body.description,
        categories_id: req.body.category,
        imagen: (req.files[0]) ? req.files[0].filename : req.body.image
    },
        {
            where: {
                id: req.params.id
            }
        })

        .then(() => {
            res.redirect('/products/admin')
       })
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