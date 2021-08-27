var express = require('express');
var {Parking} = require('../models/Parking');
var router = express.Router();
var auth = require('../middleware/auth');

router.get('/',async(req , res)=>{
    try {
        const parkings = await Parking.find();
        res.status(200).send(parkings);
    }catch (e) {
        res.status(404).send({error : e.message})
    }

});
router.get('/getParking/:id',async(req , res)=>{
    try {
        const id= req.params.id;
        const parking = await Parking.findOne({_id : id});
        res.status(200).send(parking);
    }catch (e) {
        res.status(404).send({error : e.message})
    }

});
router.get('/getParks',auth,async(req , res)=>{
    try {
        const parkings = await Parking.find({user : {$in : req.data.user._id} });
        res.status(200).send(parkings);
    }catch (e) {
        res.status(404).send({error : e.message})
    }

});
router.post('/addParking',auth,async (req , res)=> {
    const {name, address,nbPlaces,price,city,type,
        floors,openHour,closeHour} = req.body;
    const userId =req.data.user._id;
    try{
       const parking= await Parking.findOne({name : name});
        if (parking){
            res.status(400).send({message :'This parking name  exists already!'});
        }else {
            const newParking = new Parking({
               name :name,
                address:address,
                city:city,
                type: type,
                nbPlaces : nbPlaces,
                floors: floors,
                openHour:openHour,
                closeHour:closeHour,
                price : price,
                user : userId
            });
            const result = await newParking.save();
            res.status(200).send(result);
        }
    }catch (e) {
        res.status(404).send({error : e.message})
    }
});
router.post('/update',auth,async (req,res)=>{
    const {name, address,nbPlaces,price,city,type,
        floors,openHour,closeHour,id} = req.body;
    const userId =req.data.user._id;

    try{
         const parking = await Parking.findOne({name: name});
            if (parking) {
                res.status(400).send({message: 'This parking name  exists already!'});
            } else {
                const update= {
                    name :name,
                    address:address,
                    city:city,
                    type: type,
                    nbPlaces : nbPlaces,
                    floors: floors,
                    openHour:openHour,
                    closeHour:closeHour,
                    price : price,
                    user : userId
                };
                const result = await Parking.findByIdAndUpdate({_id:id}, update);
                res.status(200).send(result);
            }

    }catch (e) {
        res.status(404).send({error : e.message})
    }

});
router.delete('/:id',async(req , res)=>{
    try {
        const id = req.params.id;
        const result = await Parking.findOneAndRemove({_id : id});
        res.status(200).send('done');
    }catch (e) {
        res.status(404).send({error : e.message})
    }

});
module.exports = router;
