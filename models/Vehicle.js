var mongoose = require('mongoose');
const vehicleSchema = new mongoose.Schema({
    brand : {
        type : String,
        required : true,
    },
    registration : {
        type : String,
        required : true,
    },
    color : {
        type : String,
        required : true
    },
    wheels : {
        type : Number,
        required : true,
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required : true,
    }
});
const Vehicle = mongoose.model('Vehicle',vehicleSchema);
exports.Vehicle = Vehicle;
