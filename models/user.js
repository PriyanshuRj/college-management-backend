const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    mobileno : {
        type : String,
        required : true
    },
    rollNo : {
        type :String,
        required : true,
        default : "20bcs001"
    },
    verified : {
        type : Boolean,
        default : false
    }
})

const User = mongoose.model("User",userSchema);
module.exports = User;