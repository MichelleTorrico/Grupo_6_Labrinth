module.exports = {
    producto: (req, res) => {
        
        res.render('detalle' , {
            title : 'Detalle Producto',
            css: 'detalle.css'
        })
    }
}