var dbObjs = require("../lib/dbObjects");
var dbs = dbObjs.dbObjs;
const bill = require("../lib/bill");
module.exports = {

    createBill: function(req, res){
      console.log(req.body);
      if(dbs[req.user.client]){
        const c = new bill(req.body.billname, req.body.billcategory, req.body.billvalue, 
          req.body.billdate, req.body.bees);
        dbs[req.user.client].createBill(req.body.hive, c, function(err, result){
          if(err){
            res.status(500).json({msg:"bill not created"});
          }
          res.status(200).json({msg:"bill created",
                                bill:result});
        })
      }
    },
    updateShares: function(req, res){
      if(dbs[req.user.client]){
        dbs[req.user.client].updateShares(req.body.hive, req.body.billname, req.body.billmembers, function(err, result){
          if(err){
            res.status(500).json({msg:"unable to update"});
          }
          res.status(200).json(result);
        })
      }
    },
    addBillMember: function(req,res){
      if(dbs[req.user.client]){
        dbs[req.user.client].addBillShare(req.body.hive, req.body.member, function(err,bill){
          if(err){
            res.status(500).json({msg:"unable to add member"})
          }
          res.status(200).json({msg:"member share created"});
        })
      }
    },
    findBills:function(req,res){
      console.log(req.params.hive);
      if(dbs[req.user.client]){
        dbs[req.user.client].getBills(req.params.hive,function(err,doc){
          if(err){
            res.status(500).json({msg:"can't retrieve bills"});
          }
          console.log("controller")
          res.status(200).json(doc);
        })
      }
    },
    findBill:function(req, res){
      if(dbs[req.user.client]){
        dbs[req.user.client].getBill(req.params.name,req.params.hive,function(err,doc){
          if(err){
            res.status(500).json({msg:"can't retrieve bill"});
          }
          res.status(200).json(doc);
        })
      }
    },
    updatePaid:function(req, res){
      console.log(req.body);
      if(dbs[req.user.client]){
        dbs[req.user.client].updateBillPayOne(req.body.hive,req.body.billname,req.body.member,function(err, bill){
            if(err){
              res.status(500).json({msg:"can't update bill"});
            }
            res.status(200).json({msg:"bill updated"});
        })
      }
    },

}