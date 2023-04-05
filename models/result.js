const mongoose = require('mongoose');
const resultSchema = mongoose.Schema({
    student : {
        type : String,
        required : true
    },
    semesterResults : {
        type : [mongoose.Schema.ObjectId],
        required : true
    },

});
const Result = mongoose.model("Result", resultSchema);
module.exports = Result;

