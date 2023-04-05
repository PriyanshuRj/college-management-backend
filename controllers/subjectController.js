const Course = require("../models/course");
const fs = require('fs');
const csv = require('csv-parser');


const addSubject = (req,res,next) =>{
    try {
        const { path } = req.file; // get the path to the uploaded CSV file
        var flag = 0;
       
    fs.createReadStream(path)
        .pipe(csv())
        .on('data', async (data) => {
            console.log(data)

            const newCourse = await Course.create({
                subjectCode : data.subjectCode,
                subjectName : data.subjectName,
                lectures : data.lectures,
                tutorial : data.tutorial,
                practical : data.practical,
                credits : data.credits

            })
            console.log("Subject Added");
        })
        
        .on('end', () => {
            if(flag)  return res.status(404).json({message : "Subject Not Found"});
                        
            if(!flag) return res.status(201).json({message :" Succesfully Added Results"});
        });
    } catch (e) {
        res.status(400).json({error :e})
    }   
}

const getSubject = async (req, res, next) =>{
    try{
        const subjects = await Course.find({});
        res.status(201).json({message : "Here are the subjects", subjects : subjects});
    }
    catch (e) {
        res.status(404).json({message :"Error in fetching the subjects"})
    }
}
module.exports = {addSubject, getSubject};