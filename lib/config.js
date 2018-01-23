let config;
if(process.env.db && process.env.user && process.env.pwd && process.env.url){
  conifg = {
    db:process.env.db,
    user:process.env.user,
    pwd: process.env.pwd,
    url: process.env.url
  }
  
}else{
  config = require("../config/config");
}

module.exports = config;