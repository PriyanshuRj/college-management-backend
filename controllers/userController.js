const User = require("../models/user");
const Otp = require("../models/otp");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createStudents = async function (req, res, next) {
  try {
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    console.log("this is body", req.body);
    const { username, password, mobileNo, email } = req.body;
    if (username && password && mobileNo && email) {
      const foundUsers = await User.find({ email: email });
      console.log(foundUsers);
      if (foundUsers.length > 0) {
        res.status(201).json({ message: "User with this email exists" });
      } else {
        const saltRounds = bcrypt.genSaltSync(10);
        const encryptedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = await User.create({
          email: email,
          name: username,
          password: encryptedPassword,
          mobileno: mobileNo,
        });
        res
          .status(201)
          .json({ message: "User Created Successfully", user: newUser });
      }
    } else {
      res.status(204).json({ message: "Fill complete details" });
    }
  } catch (error) {
    console.error("The error is", error);
  }
}
const signup = async function (req, res, next) {
  try {
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    console.log("this is body", req.body);
    const { username, password, mobileNo, email } = req.body;
    if (username && password && mobileNo && email) {
      const foundUsers = await User.find({ email: email });
      console.log(foundUsers);
      if (foundUsers.length > 0) {
        res.status(201).json({ message: "User with this email exists" });
      } else {
        const saltRounds = bcrypt.genSaltSync(10);
        const encryptedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = await User.create({
          email: email,
          name: username,
          password: encryptedPassword,
          mobileno: mobileNo,
        });
        res
          .status(201)
          .json({ message: "User Created Successfully", user: newUser });
      }
    } else {
      res.status(204).json({ message: "Fill complete details" });
    }
  } catch (error) {
    console.error("The error is", error);
  }
};

const login = async function (req, res, next) {
  console.log("This is request body : ", req.body);
  const { email, password } = req.body;
  const foundUser = await User.findOne({ email: email });
  if (!foundUser) {
    res.status(404).json({ message: "User not found in the data base" });
  } 
  else {

    const passwordMatch = await bcrypt.compare(password, foundUser.password);
    
    if (passwordMatch) {
      const jwtToken = jwt.sign(
        { id: foundUser.id, email: foundUser.email },
        process.env.JWT_SECRET
      );
    
      res.status(200).json({ message: "User found", token: jwtToken });
    } 
    else res.status(404).json({ message: "User not found in the data base" });
  }
};

module.exports = { signup, login, createStudents };
