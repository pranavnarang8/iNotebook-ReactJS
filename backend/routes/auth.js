const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')


const JWT_SECRET = 'Pranavislearningtocode'
//Route 1: Create a user using: POST "/api/auth/createuser". Doesn't require authentication, hence no login required
router.post(
  "/createuser",
  [
    body("name", "Enter a Valid Name").isLength({ min: 1 }),
    body("email", "Enter a Valid Email").isEmail(),
    body("password", "Password length needs to be a minimum of 8 characters").isLength({ min: 8 }),
  ],
  async (req, res) => {
    let success = false
    //If there are errors, return bad req and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success = false
      return res.status(400).json({ success, errors: errors.array() });
    }
    //Check whether user with same email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        success = false
        return res.status(400).json({success,
            error: "Sorry, a user with the same email address already exists",
          });
      }
      const salt = await bcrypt.genSalt(10);
      //We use await, because bcrypt.hash() and bcrypt.genSalt return promises
      const secPass = await bcrypt.hash(req.body.password, salt) ;
      //Create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass
      });

      // .then(user => res.json(user))
      // .catch(err => {console.log(err)
      // res.json({error: "Please enter a unique Email ID", message: err.message})})
      const data = {
        user:{
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true
      //jwt.sign( ) is a sync function
      res.json({success, authtoken});
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//Route 2: Authenticate a User using: POST "/api/auth/login". No Login required

router.post(
  "/login",[
    body("email", "Enter a Valid Email").isEmail(),
    body("password","Password cannot be blank").exists()
  ], async (req,res)=>{
    let success = false
    //If there are errors, return bad req and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body
    try{
      let user = await User.findOne({email})
      if(!user){
        success = false
        return res.status(400).json({success, error: "Please enter valid credentials"})
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if(!passwordCompare){
        success = false
        return res.status(400).json({success, error: "Please enter valid credentials"})

      }
       //this data is payload
      const data = {
        user:{
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true
      //jwt.sign( ) is a sync function
      res.json({ success, authtoken});
    } catch(error){
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }

  })

  //Route 3: Get details of online user: POST "/api/auth/getuser".Login Required
  router.post("/getuser", fetchuser, async (req,res)=>{

  try {
    const userId = req.user.id;
    //Selecting all data points of the user barring the password
    const user = await User.findById(userId).select("-password")
    res.send(user)
    
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
})

module.exports = router;
