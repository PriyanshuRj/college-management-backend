const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    subjectCode : {
        type : String,
        required : true
    },
    subjectName : {
        type : String,
        required : true
    },
    
    lectures : {
        type : Number,
        required : true
    },
    tutorial : {
        type : Number,
        required : true
    },
    practical : {
        type : Number,
        required : true
    },
    credits : {
        type : Number,
        required : true
    },
    semester : {
        type : Number,
        required : false
    }
})

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;