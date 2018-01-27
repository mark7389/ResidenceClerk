const beesController = require("../../controllers").bees;
const passport = require('../../lib/passport');
var db = require("../../lib/dbObjects").dbObjs;
const router = require("express").Router();
router.use("/login", passport.authenticate('local'));
router.route("/create").post(beesController.createUser);     
router.route("/login").post(beesController.login);
router.route("/find/:name").get(beesController.findUser);
router.route("/grant/:name").get(beesController.grantAccess);
router.route("/getHives").get(function(req, res){
    if(req.user){
        res.json({hives:req.user.hives});
    }
})
router.route("/roommates/:hive").get(beesController.getHiveUsers);
router.route("/isAuth").get(function(req, res){
        if(req.user){
          if(db[req.user.client]){
              res.status(200).json({msg:true})
          }else{
              res.status(304).json({msg:false});
          }
        }
        else{
            res.redirect("/");
        }
});

module.exports = router;