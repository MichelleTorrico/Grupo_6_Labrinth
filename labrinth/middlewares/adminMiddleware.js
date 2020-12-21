module.exports = (req, res, next) => {
    if (req.session.user != undefined && req.session.user.admin == true) {

        next()
    } else {
        res.redirect('/')
    }
}