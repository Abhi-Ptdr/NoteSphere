const mongoose = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: string,
        requied: true
    },
    email: {
        type: string,
        requied: true,
        unique: true
    },
    password: {
        type: string,
        requied: true
    },
    date: {
        type: string,
        default: Date.now
    }    
});

module.exports = mongoose.model('user', UserSchema);