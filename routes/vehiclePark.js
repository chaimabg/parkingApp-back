var express = require('express');
var {VehiclePark} = require('../models/VehiclePark');
var {Parking} = require('../models/Parking');
var router = express.Router();


router.get('/getParking/:id',async(req , res)=>{
    try {
        const id= req.params.id;
        const vehicles = await VehiclePark.find({parking: {$in : id} });
        res.status(200).send(vehicles);
    }catch (e) {
        res.status(404).send({error : e.message})
    }

});
router.get('/getVehicle/:id',async(req , res)=>{
    try {
        const id= req.params.id;
        const vehiclePark = await VehiclePark.findOne({vehicle: id} );
        res.status(200).send(vehiclePark);
    }catch (e) {
        res.status(404).send({error : e.message})
    }

});
router.get('/getVehiclePark/:id',async(req , res)=>{
    try {
        const id= req.params.id;
        const vehiclePark = await VehiclePark.findOne({id: id} );
        res.status(200).send(vehiclePark);
    }catch (e) {
        res.status(404).send({error : e.message})
    }

});
router.post('/addVehiclePark',async (req , res)=> {
    const {parking, vehicle,nbHours,price,user,date,
        payment,entryTime,exitTime,exitChecked} = req.body;
    try{

            const newVehiclePark = new VehiclePark({
                parking :parking,
                vehicle:vehicle,
                nbHours:nbHours,
                price:price,
                user:user,
                date:date,
                payment: payment,
                entryTime:entryTime,
                exitTime:exitTime,
                exitChecked:exitChecked
            });
            const result = await newVehiclePark.save();
            res.status(200).send(result);

    }catch (e) {
        res.status(404).send({error : e.message})
    }
});
router.post('/exitVehicle',async (req , res)=> {
    const {exitTime,id} = req.body;
    try{

       const vehiclePark = await VehiclePark.findOne({_id : id});
       const parking = await Parking.findOne({_id : vehiclePark.parking});
       const nbHours = exitTime.split(':',2)[0]-vehiclePark.entryTime.split(':',2)[0];
        console.log(nbHours);
        const updatedVehiclePark = {
            exitTime:exitTime,
            exitChecked: true,
            nbHours:nbHours,
            price: nbHours * parking.price,
        };
        const result = await VehiclePark.findByIdAndUpdate({_id : id},updatedVehiclePark);
        const newVehiclePark = await VehiclePark.findOne({_id : id});
        res.status(200).send(newVehiclePark);

    }catch (e) {
        res.status(404).send({error : e.message})
    }
});
module.exports = router;
