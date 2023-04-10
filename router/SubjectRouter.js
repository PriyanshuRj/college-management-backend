const passport = require("passport");
const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest : 'uploads/'});
const resultController = require("../controllers/resultController")
const subjectRouter = require("../controllers/subjectController");
router.get("/", subjectRouter.getSubject);
router.post("/", passport.authenticate("jwt", {session: false}),  upload.single('file'), subjectRouter.addSubject);
module.exports = router;