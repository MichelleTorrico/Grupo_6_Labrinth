module.exports = function(req,res,next){
    if(req.cookies.userLabrinth){
        console.log(req.cookies.userLabrinth)
        req.session.user = req.cookies.userLabrinth;
        res.locals.user = req.session.user  
        next()
    }else{
        next()
    }
}