const path = require('path');
const dbProductos = require(path.join(__dirname,'..','data','dbProductos'));


module.exports = {
    home: (req, res) => {

        let ofertas = dbProductos.filter(producto=>{
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
        })
    }
}