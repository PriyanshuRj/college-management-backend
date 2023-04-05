const passport = require("passport");
const router = require('express').Router()
const regestrationRouter = require('./RegestrationRouter');
const resultRouter = require('./ResultRouter');
const usercontroller = require("../controllers/userController");
const subjectRouter = require("./SubjectRouter");
router.get("/", (req, res, next) =>{
    res.send("Server Runing")
})

router.post('/signup',usercontroller.signup);
router.post('/login',usercontroller.login);

router.use('/result', resultRouter);
router.use('/registration', regestrationRouter);
router.use('/subjects', subjectRouter);
module.exports = router;