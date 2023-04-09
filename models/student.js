const mongoose = require('mongoose');
const stundentSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true
    },
    fatherName : {
        type : String,
        required : true
    },
    motherName : {
        type : String,
        required :true
    },
    bloodGroup : {
        type : String,
        required :false
    },
    rollNo : {
        type : String,
        required :true
    },
    programme : {
        type : String,
        required : true
    },
    Address : {
        type : String,
        required : true
    },
    permanetAddress : {
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
})

const Student = mongoose.model("User",stundentSchema);
module.exports = Student;