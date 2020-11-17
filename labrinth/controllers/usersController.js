const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');

const {validationResult} = require('express-validator');
const dbUsers = require(path.join(__dirname,'..','data','dbUsers.js'))
const db = require('../database/models');


module.exports = {
    nuevoUsuario: (req, res) => {
        
        res.render('registro' , {
            title : 'Registrarse',
            css: 'registro.css'
        })
    },
    processNuevoUsuario:function(req,res){
        let errors = validationResult(req);
        
        if(errors.isEmpty()){

            db.Usuarios.create({
                nombre_completo: req.body.nombreCompleto.trim(),
                email: req.body.email.trim(),
		        avatar: (req.files[0])?req.files[0].filename:"default.png",
                password:bcrypt.hashSync(req.body.pass,10),
                rol:"user"
            })
            .then(usuario => {
                //console.log(usuario)
                return res.redirect('/users/login')
            })
            .catch(err => {
                res.send(err)
            })
    
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

            db.Usuarios.findOne({
                where : {
                    email : req.body.email
                }
            })
            .then( user => {
                req.session.user = {
                    id: user.id,
                        nombreCompleto: user.nombreCompleto,
                        email: user.email,
                        avatar:user.avatar,
			            rol:user.rol
                }
                 if(req.body.recordar){
                res.cookie('userLabrinth',req.session.user,{maxAge:1000*60*60})
                }
                res.locals.user = req.session.user
                return res.redirect('/')
            })
            .catch( err => {
                res.send(err)
            })
           
        }else{
            res.render('login',{
                title: "Iniciar sesión",
                css:"registro.css",
                errors:errors.mapped(),
                old:req.body
            })
        }
    },


    perfil:function(req,res){
        db.Usuarios.findByPk(req.session.user.id)
        .then(user => {
            res.render('perfilUsuario',{
                title:"Perfil de usuario",
                css: "profile.css",
                usuario : user
            })
        })
        .catch( error => {
            res.send(error)
        })
    },
    actPerfil:function(req,res){
        db.Usuarios.update({
                nombreCompleto: req.body.nombreCompleto,
                email: req.body.email,
                avatar:(req.files[0])?req.files[0].filename:req.session.user.avatar
                
            },
            {
                where : {
                    id : req.params.id
                }
        })
        .then( result => {
            console.log(result)
            return res.redirect('/users/perfil')
        })
        .catch( err => {
            res.send(err)
        })
    },
    delete: function(req,res){
       
        db.Usuarios.destroy({
            where : {
                id : req.params.id
            }
        })
        .then( result => {
            console.log(result)
            
            req.session.destroy();
            if(req.cookies.userLabrinth){ //chequeo que la cookie exista
                res.cookie('userLabrinth','',{maxAge:-1}); //borro la cookie
            }
            return res.redirect('/')
            
        })
        .catch( error => {
            res.send(error)
        })
    },
    logout:function(req,res){
        req.session.destroy()
        if(req.cookies.userLabrinth){
            res.cookie('userLabrinth',' ',{maxAge:-1});
        }
        return res.redirect('/')
    }
}