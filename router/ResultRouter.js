const passport = require("passport");
const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest : 'uploads/'});
const resultController = require("../controllers/resultController")

router.get("/", passport.authenticate("jwt", {session: false}), resultController.getResult);
router.post("/", passport.authenticate("jwt", {session: false}),  upload.single('file'), resultController.addResult);
module.exports = router;