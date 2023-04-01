const Result = require("../models/result");
const csv = require('csv-parser');
const fs = require('fs');
const Course = require("../models/course");
const SemesterResult = require("../models/semesterResult");
const getResult = (req, res,next)=>{

    console.log("reached", req.user);
    res.status(200).json({message : "This is your result"})
}

const addResult = async (req, res, next) =>{
    console.log(req.user);
    try {
        const {semester} = req.body;
        const { path } = req.file; // get the path to the uploaded CSV file

    fs.createReadStream(path)
        .pipe(csv())
        .on('data', (data) => {
            // var obj = data;
            // const {rollNo } = data;
            delete data.Address;
            console.log(data);
        // const { name, email } = data; // assuming your CSV has columns for name and email
        // const newUser = new User({ name, email });
        // newUser.save(); // save the new user to the database
        })
        .on('end', () => {
        // res.send('Users added successfully!');
        console.log("closed")
        });
        console.log("here")
        return res.status(201).json({semester : semester, message :" Succesfully Added Results"});
    } catch(e){
        return res.status(404).json({data:"Failed to add students Result",e})
    }

}
module.exports = {getResult, addResult};