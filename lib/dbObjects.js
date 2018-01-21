const connection = require('./connection');
const database = require('./database');
'use strict';

var dbObjs = {};
function addDb(user,db){
      dbObjs[user] = new database(db);
}
function connect(username, password){
  connection(username, password).then(db=>{
      username = decodeURIComponent(username);
      if(!dbObjs[username]){
        addDb(username, db);
      }
  }).catch(err=>{
       return err;
  });
}
module.exports = {
    dbObjs: dbObjs,
    addDb: addDb,
    connect:connect
};