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
Db.prototype.createUser = function(user, password, nickname, callback){
   
  this.db.db(config.db).addUser(user, password, {customData:{nickname:`${nickname}Hive`},roles:[{role:"read", db:config.db}]}).then(user=>{
          console.log(user);
          callback();
   }).catch(err=>{

        console.log(err);
   })
}
Db.prototype.getHiveUsers = function(hive, callback){
  this.db(config.db).command({usersInfo:1}).then(user=>{
           const members = user.users.map((member=>{
              if(member.customData.hives.indexOf(hive) > -1){
                return member;
              }
            }));
            callback(null, members);
  }).catch(err=>{
      callback(err, null);
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
    callback(null, role);
  }).catch(err=>{
    console.log(err);
    callback(err, null);
  })
}
Db.prototype.grantRole = function(username, rolename, callback){

    this.db.db(config.db).command({
      grantRolesToUser:username,
      roles:[{role:rolename, db:config.db}]
      
    }).then(role=>{
      console.log(role + " Success!");
      callback(null, role);
    }).catch(err=>{
      callback(err, null);
    })
}
Db.prototype.getBills = function(hive, callback){
    const collection = this.db.db(config.db).collection(hive);
    collection.find().toArray(function(err, docs){
      if(err){
        callback(err, null);
      }
      callback(null, docs);
    });
    
}
Db.prototype.getBill = function(name, hive, callback){
  this.db.db(config.db).collection(hive).find({name:name}).toArray((err, doc)=>{
    if(err){
      callback(err, null);
    }
    callback(null, doc);
  })
}
Db.prototype.addBillShare = function(member,share, name, hive, callback){
  this.db.db(config.db).collection(hive).
  findOneAndUpdate({name:name},{$push: 
    {bees:{name:member,share:share,paid:false}}}).then(bill=>{
      callback(null, bill);
    }).catch(err=>{
      callback(err, null);
    });
    
}
Db.prototype.createBill = function(hive, bill, callback){
  this.db.db(config.db).collection(hive).
  insertOne(bill).then(bill=>{
    callback(null, bill);
  }).catch(err=>{
    callback(err, null);
  })

}
Db.prototype.updateBillPayOne = function(hive, billname, member, callback){
      this.db.db(config.db).collection(hive)
      .updateOne({name:billname}, {$set:{"bees.$[member].paid":true}},{arrayFilters:[{member:member}]})
      .then(result=>{
        console.log(result);
        callback(null, result);
      }).catch(err=>{
        callback(err, null);
      })
}
Db.prototype.updateShares = function(hive, billname, members, callback){
      const results = members.map(member=>{
        this.db.db(config.db).collection(hive)
        .updateOne({name:billname}, {$set:{"bees.$[member].share":member.share}}, arrayFilters:[{member:member.name}])
        .then(result=>{
            return result;
        }).catch(err=>{
          callback(err, null);
        })

      });
      callback(null, results);
}
Db.prototype.addHiveUser = function(nickname, user, master, callback){
  this.db.db(config.db).command({updateUser:user,customData:{nickname:`${nickname}Hive`}})
  .then(result=>{
    let memberR = userRoles.memberRole + master;
    this.grantRole(user, memberR, function(err, role){
      if(err){
        callback(err,null);
      }
      callback(null, role);
    } ) 
    
  }).catch(err=>{
    callback(err,null);
  })
  
}


module.exports = Db;
