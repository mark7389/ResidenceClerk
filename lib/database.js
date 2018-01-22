const config = require('../config/config');
const userRoles = require("./userRoles");
const Db = function(db){

    this.db = db;
    this.user = db.s.options.user;
  
}
Db.prototype.getUserInfo = function(user, callback){
    this.db.db(config.db).command({usersInfo:{user:user, db:config.db}}).then(user=>{
          console.log(user);
          callback(null,user);
    }).catch(err=>{
      console.log(err);
      callback(err, null);
    })
}
Db.prototype.createUser = function(user, password, callback){
   
  this.db.db(config.db).addUser(user, password, {roles:[{role:"read", db:config.db}]}).then(user=>{
          console.log(user);
          callback();
   }).catch(err=>{

        console.log(err);
   })
}
Db.prototype.createCollection = function(collection, callback){
  this.db.db(config.db).createCollection(collection).then(col=>{
    console.log("col created");
    callback();
  }).catch(err=>{
    console.log(err);
  })
}
Db.prototype.createAdminRole = function(rolename, collection, callback){

      this.db.db(config.db).command({
        createRole:rolename,
        roles:[],   
        privileges:[{
          resource: {db:config.db, collection:""},
          actions:["viewUser", "changeCustomData", "grantRole"]
          },{resource:{db:config.db, collection:collection}, 
                       actions:["find","insert","update","remove"]}]
      }).then(role=>{
        console.log("role created " + role);
        callback();
      }).catch(err=>{
        console.log(err);
      })
   
}
Db.prototype.createMemberRole = function(rolename, collection, callback) {

  this.db.db(config.db).command({
    createRole:rolename,
    roles:[], 
    privileges:[{
      resource: {db:config.db, collection:collection},
      actions:["find", "update", "insert", "remove", "viewUser"]
      }]
  }).then(role=>{
    console.log(role + " is created");
    callback();
  }).catch(err=>{
    console.log(err);
  })
}
Db.prototype.grantRole = function(username, rolename, collection, callback){

    this.db.db(config.db).command({
      grantRolesToUser:username,
      roles:[{role:rolename, db:config.db}]
      
    }).then(role=>{
      console.log(role + " Success!");
      callback();
    }).catch(err=>{
      console.log(err);
    })
}
module.exports = Db;
