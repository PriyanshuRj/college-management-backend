const Result = require("../models/result");

const csv = require('csv-parser');
const fs = require('fs');
const Course = require("../models/course");
const csvtojson = require('csvtojson');
const SemesterResult = require("../models/semesterResult");
const getResult = async (req, res,next)=>{

    console.log("reached", req.body);

    const {rollNo} = req.body;
    if(rollNo){

        const result = await Result.findOne({student : rollNo});
        console.log(result)
        if(result){
            var semesterCompleteResult = [];
            for(let semResult in result.semesterResults){
                const semRes = await SemesterResult.findById(result.semesterResults[semResult]);
                if(semRes){
                    semesterCompleteResult.push(semRes);
                }
                else console.log("Result for this semester not found");
            }
            res.status(200).json({message : "This is your result", result : result, semesterCompleteResult : semesterCompleteResult})
        }
        else {
            res.status(404).json({message : "Student Not found"});
        }
    }
    else {
        res.status(400).json({message : "Please provide a rooll Number"});
    }
    
}
const grades = [ "F", "F", "F", "F", "E","D", "C", "BC", "B", "AB", "A"]


const addResult = async (req, res, next) =>{
    // console.log(req.user);
    try {
        const {semester} = req.body;
        const { path } = req.file; // get the path to the uploaded CSV file
        var flag = 0;
       
    fs.createReadStream(path)
        .pipe(csv())
        .on('data', async (data) => {
            const {rollNo } = data;
            delete data.rollNo;
            var subjectResults = [];
            await Promise.all(Object.keys(data).map(async key =>{
                const currentSubject =  await Course.findOne({subjectCode : key});
                if(currentSubject){
                    const subject = {
                        subjectName : currentSubject.subjectName,
                        subjectCode : currentSubject.subjectCode,
                        subpoints : currentSubject.credits,
                        grade : grades[parseInt(data[key])],
                        subGP : parseInt(data[key])*currentSubject.credits
                    }        
                console.log(currentSubject, subject);
                subjectResults.push(subject);
                }
                else {
                    console.log("Subject Not found")
                }
            
            }))
            const studentResult = await Result.findOne({
                student : rollNo
            })
            console.log(studentResult)
            if(!studentResult){
                const studentRes = await Result.create({
                    student : rollNo,
                    semesterResults : []
                })
                const semesterResult = await SemesterResult.create({
                semesterNo : semester,
                subjectResult : subjectResults,
                result : studentRes.id

                })
                studentRes.semesterResults.push(semesterResult.id);
                studentRes.save();

            }
            else {
                const semesterResult = await SemesterResult.create({
                    semesterNo : semester,
                    subjectResult : subjectResults,
                    result : studentResult.id
                    })
                    studentResult.semesterResults.push(semesterResult.id);
                    studentResult.save();
            }

            
        })
        
        .on('end', () => {
            console.log("calling after all");
            console.log("closed")
            if(flag)  return res.status(404).json({message : "Subject Not Found"});
                        
            if(!flag) return res.status(201).json({semester : semester, message :" Succesfully Added Results"});
        });
       
        
    } catch(e){
        return res.status(404).json({data:"Failed to add students Result",e})
    }

}
module.exports = {getResult, addResult};