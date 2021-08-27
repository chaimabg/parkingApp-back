var {Vehicle} = require('../models/Vehicle');
var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');

router.get('/',auth,async(req , res)=>{
    try {
        const vehicles = await Vehicle.find({user : {$in : req.data.user._id} });
        res.status(200).send(vehicles);
    }catch (e) {
        res.status(404).send({error : e.message})
    }

});
router.post('/addVehicle',async (req , res)=> {
    const {brand, registration,color,wheels,userId} = req.body;
    try{
        const vehicle= await  Vehicle.findOne({registration : registration});
        if (vehicle){
            res.status(400).send({message :'This vehicle registration exists already!'});
        }else {
           const newVehicle = new Vehicle({
              brand : brand,
              registration:registration,
              color: color,
               wheels: wheels,
              user: userId
           });
           const result = await newVehicle.save();
            res.status(200).send(result);
        }
    }catch (e) {
        res.status(404).send({error : e.message})
    }
});
router.delete('/:id', async (req,res)=>{
    try{
        const id = req.params.id;
        const result = await Vehicle.findOneAndRemove({_id : id});
        res.status(200).send('done');
    }catch (error) {
        res.status(404).send({error : error.message})
    }
});
module.exports = router;
