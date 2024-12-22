const express = require('express');
const User = require('../models/User.js');
const router = express.Router();


//Create a user using POST "/api/auth". Doesn't require Authentication
router.post('/', (req, res)=>{                  //replace .get with .post becoz we are posting/sending data,, Use GET when you are fetching data 
    //if we want to use req.body we have to use a middleware i.e.app.use(express.json())
    console.log(req.body);                      //we have added a object in request's body in thunder client  
    const user = User(req.body);                //request data from body compare with User Model and store in user
    user.save()                                 //to save user data in DB that we have created in mongoDB Compass
    res.send(req.body);                         //send response to see the data in thunder client
})

module.exports = router