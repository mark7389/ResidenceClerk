let config;
if(process.env.db && process.env.user && process.env.pwd){
  conifg = {
    db:process.env.db,
    user:process.env.user,
    pwd: process.env.pwd
  }
  
}else{
  config = require("../config/config");
}

module.exports = config;