var mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : false,
        default : "",
    },
    lastName : {
        type : String,
        required : false,
        default : "",
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true,
    },
    role : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required : true,
    }
});
const User = mongoose.model('User',userSchema);
exports.User = User;
