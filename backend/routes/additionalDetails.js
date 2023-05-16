const express = require('express');
const router = express.Router();
const AdditionalDetails = require("../models/AdditionalDetails");
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require("express-validator");



//fetch Additional Details
router.get('/fetchdetails',fetchuser ,async (req,res)=>{
    try{
        const details = await AdditionalDetails.find({user: req.user.id})
        res.json(details)
    } catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error"); 
    }
    
  })

//save additional details
router.post('/savedetails',fetchuser,async (req,res)=>{
    try{
    //Destructuring of req body
    const{contact, address, locality, city, state, zip} = req.body
    //If there are errors, return bad req and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let user = await AdditionalDetails.findOne({ contact: req.body.contact });
      if (user) {
        success = false
        return res.status(400).json({success,
            error: "Sorry, a user with the same contact number already exists",
          });
        }
    
        const addDetails = new AdditionalDetails({
            contact, address, locality, city, state, zip, user:req.user.id
        })
        const savedDetails = await addDetails.save();
    
        res.json(savedDetails)
    }catch(error){
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
    
})


//update additional details

module.exports = router