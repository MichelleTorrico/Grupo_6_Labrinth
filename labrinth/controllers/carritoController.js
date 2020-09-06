module.exports = {
    producto: (req, res) => {
        
        res.render('carrito' , {
            title : 'Carrito de compras',
            css: 'carrito.css'
        })
    }
}