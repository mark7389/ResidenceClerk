const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const connection = require('./connection');
const config = require('../config/config');

passport.use(new localStrategy(


    function(username, password, done){

        connection(username, password).then(db=>{
            username = decodeURIComponent(username);
            db.db(config.db).command({usersInfo:{user:username, db:config.db}}).then(user=>{
              db.close();
              return done(null, `${user.users[0].user}`);
            });
            
        }).catch(err=>{
            console.log(err);
            return done(null, false, {message: "unable to login"});
        })

    }

))

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


module.exports = passport;