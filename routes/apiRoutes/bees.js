const beesController = require("../../controllers").bees;
const passport = require('../../lib/passport');
var db = require("../../lib/dbObjects").dbObjs;
const router = require("express").Router();
router.use("/login", passport.authenticate('local'))
router.route("/create").post(beesController.createUser);     
router.route("/login").post(beesController.login);
router.route("/find/:name").get(beesController.findUser);
router.route("/isAuth").get(function(req, res){
    console.log(req.user);
          if(db[req.user]){
              res.json({msg:true})
          }else{
              res.json({msg:false});
          }
      });

module.exports = router;