const path = require('path');
const dbProductos = require(path.join(__dirname,'..','data','dbProductos'));
const fs = require('fs');




module.exports = {
    listar:function(req,res){
        res.render('products',{
            title: "Productos",
            css:"products.css",
            productos: dbProductos
        })
    },
    detalle:function(req,res){
        idProducto = req.params.id;
        let producto = dbProductos.filter(producto=>{
            return producto.id == idProducto
        })
        res.render('detalle',{
            title:"Detalle del Producto",
            css:"detalle.css",
            producto:producto[0]
        })
    },
    agregar:function(req,res){
        res.render('carga',{
            title: "Agregar producto",
            css:"carga.css"
        })
},

    editar:function(req,res){
        res.render('productsEdit',{
            title: "Administrar productos",
            css:"products.css",
            productos: dbProductos
        })
}}