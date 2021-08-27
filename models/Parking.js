var mongoose = require('mongoose');
const parkingSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    address : {
        type : String,
        required : true,
    },
    city : {
        type : String,
        required : true,
    },
   type : {
        type : String,
        required : true,
    },
    nbPlaces : {
        type : Number,
        required : true
    },
    price : {
        type : Number,
        required : true,
    },
    floors : {
        type : Number,
        required : true,
    },
    openHour : {
        type : String,
        required : false,
    },
    closeHour : {
        type : String,
        required : false,
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required : true,
    }
});
const Parking = mongoose.model('Parking',parkingSchema);
exports.Parking = Parking;
