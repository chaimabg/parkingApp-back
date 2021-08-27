var mongoose = require('mongoose');
const vehicleParkSchema = new mongoose.Schema({
    parking: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Parking',
        required : true,
    },
    vehicle : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
        required : true,
    },
    price : {
        type : Number,
        required : false,
    },
    nbHours : {
        type : Number,
        required : false,
    },
    entryTime : {
        type : String,
        required : true,
    },
    exitTime : {
        type : String,
        required : false,
    },
    payment : {
        type : String,
        required : false,
    },
    date : {
        type : String,
        required : true,
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required : true,
    },
    exitChecked : {
        type : Boolean,
        required : true,
    },

});
const VehiclePark = mongoose.model('VehiclePark',vehicleParkSchema);
exports.VehiclePark = VehiclePark;
