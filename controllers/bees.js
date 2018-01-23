const config = require("../lib/config");
const connection = require('../lib/connection');
var dbObjs = require("../lib/dbObjects");
var dbs = dbObjs.dbObjs;
const database = require("../lib/database");
const userRoles = require('../lib/userRoles');
module.exports = {

     createUser: function (req, res){

             connection(config.user, config.pwd).then(db=>{
                tempDb = new database(db);
                tempDb.createUser(req.body.username, req.body.password, req.body.nickname, function(){
                    let col = req.body.nickname + "HIVE";
                    tempDb.createCollection(col, function(){
                        let adminR = userRoles.hiveAdmin + req.body.username;
                        let memberR = userRoles.memberRole + req.body.username;
                        tempDb.createAdminRole(adminR, col, function(){
                            tempDb.createMemberRole(memberR, col, function(){
                                tempDb.grantRole(req.body.username, adminR, function(){
                                    res.status(200).json({msg:"user created"})
                                    db.close();
                                });
                            });
                        });
                    });
                });
            }).catch(err=>{
                    console.log(err);
            });
    },

    login: function(req, res){
            if(req.user){
                dbObjs.connect(req.body.username, req.body.password);
                res.json({msg:"login successful"})
            }else{
                res.status(401).json({msg:"not logged in"});
            }
     },
     findUser: function(req, res){
         console.log(req.user.client);
         if(dbs[req.user.client]){
             dbs[req.user.client].getUserInfo(req.params.name, function(err, user){
                 if(err){
                     res.status(404).json({msg:"user not found"})
                 }
                 res.status(200).json(user.users[0]);
             })
         }
     },
     grantAccess: function(req, res){
        let collection = req.user.hives[0];
         if(dbs[req.user.client]){
             dbs[req.user.client].addHiveUser(collection, req.params.name, function(err, result){
                 if(err){
                     res.status(403).json({msg:"unable to grant access"});
                 }
                 res.status(200).json({msg:"access granted"});
             } )
         }
     }

}