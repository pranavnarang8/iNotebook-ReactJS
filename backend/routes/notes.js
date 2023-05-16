const express = require('express');
const router = express.Router();
const Notes = require("../models/Notes");
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require("express-validator");

//Route 1: Get all the notes usine: GET "/api/notes/fetchallnotes".Login Required
router.get('/fetchallnotes',fetchuser ,async (req,res)=>{
    try{
        const notes = await Notes.find({user: req.user.id})
        res.json(notes)
    } catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error"); 
    }
    
})

//Route 2: Add notes :POST "/api/notes/addnote". Login required
router.post('/addnote',fetchuser , [
    body("title", "Enter a Valid Title").isLength({ min: 3 }),
    body("description", "Enter a Valid Description").isLength({ min: 6 })
] ,async (req,res)=>{
    try{
    //Destructuring of req body
    const{title, description, tag} = req.body
    //If there are errors, return bad req and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
        const note = new Notes({
            title, description, tag, user:req.user.id
        })
        const savedNote = await note.save();
    
        res.json(savedNote)
    }catch(error){
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
    
})

//Route 3: Update existing notes :PUT "/api/notes/updatenote". Login required
//We use PUT to update existing maamla
router.put('/updatenote/:id', fetchuser ,async (req,res)=>{
    const {title, description, tag} = req.body;
    //Create a new note object
    const newNote = {}
    if(title){newNote.title = title}
    if(description){newNote.description = description}
    if(tag){newNote.tag = tag}

    //Find the note to be updated and then update it
    const note = await Notes.findById(req.params.id);
    if(!note){
        return res.status(404).send("Not Found")
    }
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Authorized")   
    }

    try{
        const updatedNote = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
        res.json({updatedNote});

    } catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//Route 4: Delete existing notes :D "/api/notes/updatenote". Login required
router.delete('/deletenote/:id', fetchuser ,async (req,res)=>{
    try{
    const {title, description, tag} = req.body;
    //Create a new note object

    //Find the note to be deleted and then delete it
    const note = await Notes.findById(req.params.id);
    if(!note){
        return res.status(404).send("Not Found")
    }
    //Allow deletion only if the user own's this note
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Authorized")   
    }

    
        const deletedNote = await Notes.findByIdAndDelete(req.params.id)
        res.json({"Success":"Note has been deleted Successfully", note: deletedNote});

    } catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router