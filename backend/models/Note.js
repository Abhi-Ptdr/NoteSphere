//Keep file name with 1st letter capital 
const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user: {     //foregin key to connect user and notes DB
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' //User model 
    },
    title: {
        type: String,
        requied: true
    },
    description: {
        type: String,
        requied: true
    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: String,
        default: Date.now
    }    
});

module.exports = mongoose.model('notes', NotesSchema);


// user: {     //foregin key to connect user and notes DB
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User' //User model 
// }

// This field is meant to store a reference to the user who owns or is associated with the note.

// type: mongoose.Schema.Types.ObjectId:
// mongoose.Schema.Types.ObjectId specifies that the user field will store an ObjectId, which is the unique identifier used by MongoDB for documents/data.
// ObjectId is a 12-byte identifier that MongoDB assigns to each document upon creation.

// ref: 'User':
// The ref property establishes a relationship between this field (user) and another collection in MongoDB.
// 'User' refers to the name of the Mongoose model for the users collection.
// When ref is used, Mongoose understands that the user field in this schema should link to a document in the 'User' collection.
// e.g., fetch user id along with the note, Imp to identify which note is belong to which user.