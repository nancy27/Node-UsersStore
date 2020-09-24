var mongoose=require('mongoose');
var UserSchema =new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true,
        default: ''
    },
    id: {
        type: Number,
        required: true,
        default: ''
    }});
    
    
   
module.exports = mongoose.model('User',UserSchema,'user');
