var mongoose = require('mongoose');
const roleSchema = new mongoose.Schema({
    type : {
        type : String ,
        required : true
    }
});
const Role = mongoose.model('Role',roleSchema);
exports.Role = Role;
