module.exports = {
    nuevoUsuario: (req, res) => {
        
        res.render('registro' , {
            title : 'Registrarse',
            css: 'registro.css'
        })
    },
    login: (req, res) => {
        
        res.render('login' , {
            title : 'Iniciar sesión',
            css: 'registro.css'
        })
    }
}