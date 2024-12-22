const express = require('express');
const User = require('../models/User.js');
const router = express.Router();
const { body, validationResult } = require('express-validator'); //but first we have to install "npm install express-validator" visit https://express-validator.github.io/docs/guides/getting-started for docs


//Create a user using POST "/api/auth". Doesn't require Authentication
// router.post('/', [all validations in array], (req, res)=>{                  
//     console.log(req.body);                      
//     const user = User(req.body);                
//     user.save()                                 
//     res.send(req.body);                         
// })

router.post('/', [
    body('name', 'Enter a valid name').isLength({min: 3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Your password is too short').isLength({min: 5})
], (req, res)=>{                  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});      //400 -> Bad request
    }
    User.create({               //creating user in database
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }).then(user => res.json(user))                     //json response at thunder client
    .catch(err=> {console.log(err)                      //log error in terminal
        res.json({error: 'Email already Registered!'})  //json errro response in thunder client
    })


})

module.exports = router