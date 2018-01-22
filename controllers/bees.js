const config = require("../config/config");
const passport = require('../lib/passport');
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
    
     addUser: function(req, res){

           

     },
     findUser: function(req, res){
         console.log(req.user);
         console.log(dbs[req.user])
         console.log(req.params.name)
            dbs[req.user].getBills(req.params.name, function(err, bills){
                if(err){
                    res.status(404);
                }
                res.status(200).json(bills);
            })
     }

}