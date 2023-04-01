const mongoose = require('mongoose');


const subjectResultSchema  = mongoose.Schema({
    subjectName : {
        type : String,
        required : true
    },
    subjectCode : {
        type : String,
        required : true
    },
    subpoints : {
        type: Number,
        required : true
    },
    grade : {
        type :String,
        required : true
    }
});


const semesterResultSchema = mongoose.Schema({
    result : {
        type : mongoose.Schema.ObjectId,
        required : true
    },
    semesterNo : {
        type : Number,
        required : true
    },
    subjectResult : {
        type : [subjectResultSchema],
        required :true
    }


});
const SemesterResult = mongoose.model("SemesterResult", semesterResultSchema);
module.exports = SemesterResult;
