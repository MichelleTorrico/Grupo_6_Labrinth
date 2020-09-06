module.exports = {
    nuevoUsuario: (req, res) => {
        
        res.render('registro' , {
            title : 'Registrarse',
            css: 'registro.css'
        })
    }
}