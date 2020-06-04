const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

//load a schema model
const User = require('../Model/Auth');


module.exports = (passport) => {
    passport.use(new localStrategy({usernameField:"email"},(email,password,done) => {
      User.findOne({email:email}).then(user => {
          if(!user){
              return done(null, false,
                 {message:'No email found register first register and then login '});
          }
          //match password or valid password
           bcrypt.compare(password, user.password, (err, isMatch) => {
               if(err) throw err;
               if(isMatch) {
                   return done(null, user, {message: 'Login successfull'});
               }else {
                   return done(null, false, {message: "password is not match"});
               }
           });

      })
      .catch(err => console.log(err));
    }));
    passport.serializeUser(function(user,done){
        done(null,user.id);
    });
    passport.deserializeUser(function(id,done){
        User.findById(id,function(err,user){
            done(err,user);
        })
        
    })
};