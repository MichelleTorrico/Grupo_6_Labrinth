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
        res.render('productsAdmin',{
            title: "Administrar productos",
            css:"products.css",
            productos: dbProductos
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
editar:function(req,res){

    let idProducto = req.body.id;

    dbProductos.forEach(producto =>{
        if(producto.id == idProducto){
            producto.id = Number(req.body.id),
            producto.nombre = req.body.name.trim(),
            producto.precio = Number(req.body.price),
            producto.descuento = Number(req.body.discount),
            producto.categoria = req.body.category.trim(),
            producto.descripcion = req.body.description.trim(),
            producto.imagen = producto.imagen
        }
    })
    fs.writeFileSync(path.join(__dirname,'../data/productosDataBase.json'),JSON.stringify(dbProductos),'utf-8');
    res.redirect('/products/show/'+ idProducto + '/show')
},
eliminar:function(req,res){
    let idProducto = req.params.id;
    dbProductos.forEach(producto =>{
        if(producto.id == idProducto){
            var aEliminar = dbProductos.indexOf(producto)
            dbProductos.splice(aEliminar,1)
        }
    })
    fs.writeFileSync(path.join(__dirname,'../data/productosDataBase.json'),JSON.stringify(dbProductos))
    res.redirect('/products/admin')
}

}