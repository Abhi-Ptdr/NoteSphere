//file name with all small letter

const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

//ROUTE 1: Get all the notes using GET "/api/notes/createuser". Login required
router.get('/fetchallnotes', fetchuser, async (req, res)=>{
    try {
        const notes = await Note.find({user: req.user.id});
        res.json(notes);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server Error");
    }
})

//ROUTE 2: Add new notes using POST "/api/notes/addnote". Login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid Title').isLength({min: 3}),
    body('description', 'Description must be atleast 5 Characters').isLength({min: 5})

], async (req, res)=>{
    try {
        const {title, description, tag} = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server Error");
    }

})


//ROUTE 3: Update an existing note using POST "/api/notes/updatenote". Login required

router.put('/updatenote/:id', fetchuser, async (req, res)=>{
    const {title, description, tag} = req.body;
    //Create a newNote, initially empty
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    //Find the note to be updated and update it
    let note = await Note.findById(req.params.id);          //req.params.id retrieves the id parameter from the URL endpoint (/updatenote/:id).
    if(!note){return res.status(404).send("Not found")}

    if(note.user.toString() !== req.user.id){               //the same user is updating the note who have created it. means a user can update his note only
        return res.status(401).send("Not Allowed")
    }

    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
    res.json({note});
})

module.exports = router


// { $set: newNote }
// $set:
// This is a MongoDB operator used to update only the specified fields in the note.
// If a field exists, it updates it. If the field does not exist, it adds it.

// { new: true }
// This is an option passed to findByIdAndUpdate.
// Ensures that the method returns the updated note instead of the original one.
// Without this option, findByIdAndUpdate would return the note before the update.