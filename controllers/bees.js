const config = require("../lib/config");
const connection = require('../lib/connection');
var dbObjs = require("../lib/dbObjects");
var dbs = dbObjs.dbObjs;
const database = require("../lib/database");
const userRoles = require('../lib/userRoles');
module.exports = {

     createUser: function (req, res){
        console.log(req.body);
        connection(config.user, config.pwd).then(db=>{
                tempDb = new database(db);
                tempDb.getUserInfo(req.body.username, function(err, user){
                    console.log(user);
                    if(user.users.length){
                        res.status(304).json({msg:"username not valid or already exits"});
                    }
                    else{
                
                            tempDb.createUser(req.body.username, req.body.password, req.body.nickname, function(err,user){
                                
                                let col = req.body.nickname + "HIVE";
                                tempDb.createCollection(col, function(err, collection){
                                    
                                    let adminR = userRoles.hiveAdmin + req.body.username;
                                    let memberR = userRoles.memberRole + req.body.username;
                                    tempDb.createAdminRole(adminR, col, function(err, arole){
                                        
                                        tempDb.createMemberRole(memberR, col, function(err, mrole){
                                            
                                            tempDb.grantRole(req.body.username, adminR, function(err, granted){
                                                
                                                res.status(200).json({msg:"user created"})
                                                db.close();
                                            });
                                        });
                                    });
                                });
                            });
            }
            });
        }).catch(err=>{
                res.status(304).send("connection error");
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
     },
     getHiveUsers: function(req, res){
         let collection = req.params.hive;
         console.log(collection);
         if(dbs[req.user.client]){
            dbs[req.user.client].getHiveUsers(collection, function(err, users){
                if(err){
                    res.status(500).json({msg:"users not retrievied"})
                }
                console.log(users);
                res.status(200).json({roommates:users,user:req.user.client});
            })
         }else{
             res.status(500).json({msg:"database connection error"})
         }
     }

}