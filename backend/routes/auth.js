const express = require('express');
const User = require('../models/User.js');
const router = express.Router();
const { body, validationResult } = require('express-validator'); //but first we have to install "npm install express-validator" visit https://express-validator.github.io/docs/guides/getting-started for docs


//Create a user using POST "/api/auth/createuser". No login required
// router.post('/', [all validations in array], async (req, res)=>{                  
//     console.log(req.body);                      
//     const user = User(req.body);                
//     user.save()                                 
//     res.send(req.body);                         
// })

router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({min: 3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Your password is too short').isLength({min: 5})
], async (req, res)=>{                  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});      //400 -> Bad request
    }
    try{
        // check whether the user with this email alredy exist
        let user = await User.findOne({email: req.body.email});         //in an async function if there are promises, we have to await all the time to resolve the promises 
        if(user){
            return res.status(400).json({error: "Sorry this email already registered"});
        }
        user = await User.create({               //creating user in database
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        res.json(user);

    } catch(error){
        console.log(error.message);
        res.status(500).send("Some error has occured");
    } 
})

module.exports = router