const router = require('express').Router();
const bcrypt = require('bcryptjs');
const passport = require("passport");
//load Auth Schema amd Model
const User = require('../Model/Auth');//mongoose model

/*----------------Register get routes starts here------------------*/
router.get('/register',(req,res) => {
    res.render("./auth/register")
});

/*----------------Register get routes ends here------------------*/

/*----------------Register post routes starts here------------------*/
router.post('/register', (req,res) => {
    //validation
    let errors = [];
    let {username,password,email,password2} = req.body;
  
    if(password != password2){
        errors.push({text: "password should match"});
    }
    if(password.length < 6) {
        errors.push({text: "password should have minimum 6 characters"});
    }
    if(errors.length> 0){
        
        res.render('./auth/register', {
            errors,
            username,
            email,
            password,
            password2,
            
        });
     }
     else {
         User.findOne({email}).then(user => {
             if(user){
                 req.flash("errors_msg", "This Email already in use");
                 res.redirect("/auth/register",401, {})
             }
             else{
                 //create an account with valid email adress
                 let newUser = new User({
                     username,
                     email,
                     password,
                 });
                
                 bcrypt.genSalt(10, (err,salt) => {

                    //hashing the password
                    bcrypt.hash(newUser.password, salt, (err,hash) => {
                        newUser.password= hash;

                          //saving data into database
                 newUser.save().then(user => {
                    req.flash("success_msg", "Successfully Registered ");
                    res.redirect("/auth/login",201, {});
                })
                .catch(err => console.log(err));
                    })

                 })


               
             }
         })
         .catch(err => console.log(err));
     }
    
    
});

/*----------------Register post routes ends here------------------*/

/*--------------------------login Get Routes starts here------------------*/
router.get('/login',(req,res)=> {
    res.render("./auth/login");
})
/*--------------------------login Get Routes starts here------------------*/


/*--------------------------login Post Routes starts here------------------*/
router.post('/login',(req,res,next) => {
    passport.authenticate("local",{
        successRedirect: "/student/students",
        failureRedirect: "/auth/login",
        failureFlash: true,
    })(req,res,next);
});
/*--------------------------login Post Routes starts here------------------*/

/*----------------logout----------------------*/
router.get('/logout',(req,res) => {
    req.logout();
    req.flash("success_msg","Successfully logged out");
    res.redirect("/auth/login",201, {});
})

module.exports = router;

