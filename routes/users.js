var {User} = require("../models/User");
var {Role} = require("../models/Role");
var bcrypt = require("bcrypt");
var express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken");
var auth = require('../middleware/auth');

router.get('/getUser',auth,async(req , res)=>{
    res.status(200).send(req.data.user);
});
router.get('/getRole',auth,async(req , res)=>{
    try {
        const roleId =req.data.user.role;
        const role = await Role.findOne({_id: roleId});
        res.status(200).send({role : role.type});
    }catch (e) {
        res.status(404).send({error : e.message})
    }
});
router.post('/signin',async (req , res)=>{
    const { email , password} = req.body;
    try {
      const user = await User.findOne({email : email});
      if ( user){
          if (await bcrypt.compare(password, user.password)){
             jwt.sign({user : user}, 'userKey', (err,token)=>{
                 res.status(200).send({'token' : token});
             });

          }else {
              res.status(400).send({message : 'Password Incorrect !'})

          }
      }else {
          res.status(400).send({message : 'User not found !'})
      }
  }catch (e) {
        res.status(404).send({error : e.message});
  }
});

router.post('/signup',async (req,res)=>{
  try {

   const {firstName , lastName, email , password , role}= req.body;

   const existUser = await User.findOne({email : email});
    if ( existUser ){
      res.status(400).send({message :'This email already exists, please try another one!'});
    }else {
        const encryptedPassword = await bcrypt.hash(password, 10);
        const roleId = await Role.findOne({type : role});
        const newUser = new User({
            firstName : firstName,
            lastName : lastName,
            email : email,
            password: encryptedPassword,
            role: roleId._id,
        });

        const result = await newUser.save();
        res.status(200).send(result);
    }

  }catch(error){
      res.status(404).send({error : error.message});
  }
});

router.get('/',async (req,res)=>{
  try {
      const users = await User.find();
      res.status(200).send(users);
  }catch(error){
      res.status(404).send({error : error.message})
  }
});

router.delete('/delete', async (req,res)=>{
    try{
        const id = req.body._id;
        const result = await User.findOneAndRemove({_id : id});
        res.status(200).send('done');
    }catch (error) {
        res.status(404).send({error : error.message})
    }
});
module.exports = router;
