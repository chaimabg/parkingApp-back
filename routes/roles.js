var express = require("express");
var router = express.Router();
var {Role} = require("../models/Role");

router.post('/addRole',async (req,res)=>{
    try{
        const role = new Role({
            type : req.body.type
        });
        const result= await role.save();
        res.status(200).send(result);
    }catch (e) {
     res.status(404).send({error : e})  ;
    }
});
module.exports=router;
