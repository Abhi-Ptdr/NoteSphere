//file name with all small letter

const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

//ROUTE 1: Get all the notes using GET "/api/auth/createuser". Login required
router.get('/fetchallnotes', fetchuser, async (req, res)=>{
    try {
        const notes = await Note.find({user: req.user.id});
        res.json(notes);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server Error");
    }
})

//ROUTE 2: Add new notes using POST "/api/auth/addnote". Login required
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
            title, description, tag, user: req.user.id      //explaination below
        })
        const savedNote = await note.save()
        res.json(savedNote);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server Error");
    }

})


module.exports = router


// user: req.user.id

// This explicitly assigns a value to the user field in the Note object.
// req.user is populated earlier by the fetchuser middleware. This middleware verifies a JWT (JSON Web Token) authentication mechanism and attaches the authenticated user's details (e.g., id) to req.user.
// req.user.id represents the authenticated user's unique ID in the database.
// This association ensures that the note is linked to the user who is creating it.

// The object passed to new Note() looks like this:

// {
//     title: "My Note",
//     description: "This is a sample note",
//     tag: "Personal",
//     user: "someUniqueUserId"
// }