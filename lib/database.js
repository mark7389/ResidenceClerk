const config = require('./config');
const userRoles = require("./userRoles");
const Db = function(db){

    this.db = db;
    this.user = db.s.options.user;
  
}
// Db.prototype.updateCustomData = function(user,array,)
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
   
  this.db.db(config.db).addUser(user, password, {customData:{hives:[`${nickname}HIVE`]},roles:[{role:"read", db:config.db}]}).then(user=>{
          console.log(user);
          callback(null, user);
   }).catch(err=>{
        callback(err,null);
        console.log(err);
   })
}
Db.prototype.getHiveUsers = function(hive, callback){
  this.db.db(config.db).command({usersInfo:1}).then(user=>{
           const members = user.users.map((member=>{
              if(hive in member.customData){
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
        console.log("role created " +"\n"+ JSON.stringify(role));
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
      actions:["find","insert","update"]
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
      console.log(JSON.stringify(role) + "\n Success!");
      callback(null, role);
    }).catch(err=>{
      console.log(err);
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
Db.prototype.addBillShare = function(hive,memberObj, callback){
  this.db.db(config.db).collection(hive).
  findOneAndUpdate({name:name},{$push: 
    {bees:{member:member.name,share:member.share,paid:member.paid}}}).then(bill=>{
      callback(null, bill);
    }).catch(err=>{
      callback(err, null);
    });
    
}
Db.prototype.createBill = function(hive, bill, callback){
  console.log(hive);
  console.log(bill);
  this.db.db(config.db).collection(hive).
  save(bill).then(bill=>{
    callback(null, bill);
  }).catch(err=>{
    console.log(err);
    callback(err, null);
  })

}
Db.prototype.updateBillPayOne = function(hive, billname, member, callback){
      this.db.db(config.db).collection(hive)
      .updateOne({name:billname,"bees.name":member.name }, {$set:{"bees.$.paid":member.paid}})
      .then(result=>{
        console.log(result);
        callback(null, result);
      }).catch(err=>{
        callback(err, null);
      })
}
Db.prototype.updateShares = function(hive, billname, members, callback){
        
        const collection = this.db.db(config.db).collection(hive);
        members.map((member,i)=>{
            this.updateHelper(collection, billname, member, function(err, doc){
              if(err){
                callback(err, null);
              }
              if(i === members.length-1){
                
                return;
              }
              return;
            })
        })
        callback(null, "set");
}
Db.prototype.updateHelper = function(col, billname, member, callback){
  col.updateOne({name:billname,"bees.name":member.name},{$set:{"bees.$.share":member.share}}).then(doc=>{
    callback(null, doc.result.n);
  }).catch(err=>{
    console.log(err);
    callback(err, null);
  })
}
Db.prototype.addHiveUser = function(hive, user,  callback){
      let membR = userRoles.memberRole + this.user;
      this.getUserInfo(user,(err,result)=>{
        let hiveArray = this.setHives(result.users[0].customData.hives,hive);
        this.db.db(config.db).command({updateUser:user,customData:{hives:hiveArray}}).then(action=>{
            console.log(action);
            this.grantRole(user,membR,(err, role)=>{
                  if(err){
                    callback(err,null);
                  }
                  callback(null,[action,role]);
            })
        }).catch(err=>{
            console.log(err);
            callback(err,null);
        })
      })

  
}
Db.prototype.setHives = function(array,hive){
          array.push(hive);
          return array;
}

module.exports = Db;
