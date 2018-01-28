const express = require("express");
const app = express();
const path = require("path");
const bodyParser =  require("body-parser");
const PORT = process.env.PORT || 3001;
const routes = require('./routes');
const session = require("express-session");
const passport = require('./lib/passport');

const cookieParser = require('cookie-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static("./client/build"));


      
app.set('trust proxy', 1);
app.use(session({name: "myCookie",
                 secret: "beesnees",
                 proxy:true,
                 resave: true, 
                 saveUninitialized: true, 
                 cookie:{
                              expires:new Date(Date.now()+14400000),
                              maxAge:12800000
                        },
                             
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);
      
      
app.listen(PORT, function(){
            console.log("listening...");
});



