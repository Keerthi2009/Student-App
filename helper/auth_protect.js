module.exports = {
    ensureAuthenticated: (req,res,next) => {
        if(req.isAuthenticated()) {
            return next();
        } else{
            req.flash('errors_msg', 'you are not Authorized make sure valid user or not');
            res.redirect("/auth/login",401,{});
        }
    },
};