const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');

const {validationResult} = require('express-validator');
const dbUsers = require(path.join(__dirname,'..','data','dbUsers.js'))

module.exports = {
    nuevoUsuario: (req, res) => {
        
        res.render('registro' , {
            title : 'Registrarse',
            css: 'registro.css'
        })
    },
    processNuevoUsuario:function(req,res){
        //res.send(req.body)
        //res.send(req.files)
        let errors = validationResult(req);
        let lastID = 0;
        if(dbUsers.length != 0){
            dbUsers.forEach(user => {
                if(user.id > lastID){
                    lastID = user.id
                }
            })
        }
        if(errors.isEmpty()){
            let newUser = {
                id: lastID + 1,
                nombreCompleto: req.body.nombreCompleto.trim(),
                email: req.body.email.trim(),
                avatar: (req.files[0])?req.files[0].filename:"default.png",
                password:bcrypt.hashSync(req.body.pass,10),
                rol:"user"
            }
            dbUsers.push(newUser);
            fs.writeFileSync(path.join(__dirname,'..','data','dbUsers.json'),JSON.stringify(dbUsers),'utf-8')
    
            return res.redirect('/users/login')
        }else{
            res.render('registro',{
                title:"Registrarse",
                css:"registro.css",
                errors:errors.mapped(),
                old:req.body
            })
        }
       
    },
    login: (req, res) => {
        
        res.render('login' , {
            title : 'Iniciar sesión',
            css: 'registro.css'
        })
    },
    processLogin:function(req,res){
        let errors = validationResult(req);
        if(errors.isEmpty()){
            dbUsers.forEach(user => {
                if(user.email == req.body.email && bcrypt.compareSync(req.body.pass, user.password)){
                    req.session.user = {
                        id: user.id,
                        nombreCompleto: user.nombreCompleto,
                        email: user.email,
                        avatar:user.avatar
                    }
                }
            })
            if(req.body.recordar){
                res.cookie('userLabrinth',req.session.user,{maxAge:1000*60*60})
            }
            //res.locals.user = req.session.user
            //console.log(res.locals.user)
            res.redirect('/')
        }else{
            res.render('login',{
                title: "Iniciar sesión",
                css:"registro.css",
                errors:errors.mapped(),
                old:req.body
            })
        }
    },
    logout:function(req,res){
        req.session.destroy()
        if(req.cookies.userLabrinth){
            res.cookie('userLabrinth',' ',{maxAge:-1});
        }
        return res.redirect('/')
    }
}