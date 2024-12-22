//Keep file name with 1st letter capital 
const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    title: {
        type: string,
        requied: true
    },
    description: {
        type: string,
        requied: true
    },
    tag: {
        type: string,
        default: "General"
    },
    date: {
        type: string,
        default: Date.now
    }    
});

module.exports = mongoose.model('notes', NotesSchema);

//model() takes 2 argument model name (can be anything) and Schema name that we have created in the model 