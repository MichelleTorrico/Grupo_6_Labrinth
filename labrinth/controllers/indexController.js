const path = require('path');
const dbProductos = require(path.join(__dirname,'..','data','dbProductos'));
const db = require('../database/models');


module.exports = {
    home: (req, res) => {


        db.Productos.findAll({ include : [
            {
                association : 'seccion'
            },
            {
                association : 'categoria'
            }
        ]
    }) 
    .then(productos => {

        let ofertas = productos.filter(producto=>{
            return producto.seccion.nombre == "ofertas"
        })

        let tendencias = productos.filter(producto=>{
            return producto.seccion.nombre == "tendencias"
        })

        res.render('index' , {
            title : 'Labrinth',
            css: 'index.css',
            ofertas: ofertas,
            tendencias: tendencias
        })


   
})


        /*let ofertas = dbProductos.filter(producto=>{
            return producto.seccion == "ofertas"
        })
        
        let tendencias = dbProductos.filter(producto=>{
            return producto.seccion == "tendencias"
        })
        
        res.render('index' , {
            title : 'Labrinth',
            css: 'index.css',
            ofertas: ofertas,
            tendencias: tendencias
        })*/
    }
}