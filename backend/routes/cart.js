const express = require('express');
const router = express.Router();
const Cart = require("../models/Cart");
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require("express-validator");

//Fetch Items already added to cart
router.get('/fetchcartitems',fetchuser ,async (req,res)=>{
  try{
      const cartItems = await Cart.find({user: req.user.id})
      res.json(cartItems)
  } catch(error){
      console.log(error.message);
      res.status(500).send("Internal Server Error"); 
  }
  
})

//Add Items to cart
router.post('/addcartitem',fetchuser , [
    body("title", "Enter a Valid Title").isLength({ min: 3 }),
    body("description", "Enter a Valid Description").isLength({ min: 6 }),
    body("price","Enter a Numeric Value").isNumeric()
] ,async (req,res)=>{
    try{
    //Destructuring of req body
    const{title, description, price} = req.body
    //If there are errors, return bad req and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
        const cartItem = new Cart({
            title, description, price, user:req.user.id
        })
        const savedCart = await cartItem.save();
    
        res.json(savedCart)
    }catch(error){
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
    
})

//Remove Cart Items
router.delete('/removecartitem/:id', fetchuser ,async (req,res)=>{
  try{
  const {title, description, price} = req.body;

  //Find the note to be deleted and then delete it
  const cartItem = await Cart.findById(req.params.id);
  if(!cartItem){
      return res.status(404).send("Not Found")
  }
      const deletedCartItem = await Cart.findByIdAndDelete(req.params.id)
      res.json({"Success":"Cart Item has been deleted Successfully", cartItem: deletedCartItem});

  } catch(error){
      console.log(error.message);
      res.status(500).send("Internal Server Error");
  }
})

//Buy Item Now


// //Once cart items are purchased, we will empty the cart
// router.delete('/emptycart/:id', fetchuser ,async (req,res)=>{
//   try{
//   const {title, description, price} = req.body;

//   //Find the note to be deleted and then delete it
//   const cartItem = await Cart.findById(req.params.id);
//   if(!cartItem){
//       return res.status(404).send("Not Found")
//   }
//       const deletedCartItem = await Cart.findByIdAndDelete(req.params.id)
//       res.json({"Success":"Cart Item has been deleted Successfully", cartItem: deletedCartItem});

//   } catch(error){
//       console.log(error.message);
//       res.status(500).send("Internal Server Error");
//   }
// })


module.exports = router