const express = require('express');
const User = require('../models/User.js');
const router = express.Router();
const { body, validationResult } = require('express-validator'); 
const bcrypt = require('bcryptjs');         //but first we have to install "npm i bcryptjs" visit https://www.npmjs.com/package/bcryptjs for docs
const jwt = require('jsonwebtoken');          //but first we have to install "npm i jsonwebtoken" visit https://www.npmjs.com/package/jsonwebtoken for docs. and visit https://jwt.io/ to understand jwt


const JWT_SECRET = "AbhiIs$goodBoy"         //we will store it in secret file like .env.local ot ignore to push publicly

//Create a user using POST "/api/auth/createuser". No login required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({min: 3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Your password is too short').isLength({min: 5})
], async (req, res)=>{                  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    try{
        // check whether the user with this email alredy exist
        let user = await User.findOne({email: req.body.email});         //in an async function if there are promises, we have to await all the time to resolve the promises 
        if(user){
            return res.status(400).json({error: "Sorry this email already registered"});
        }

        //password hashing
        const salt = await bcrypt.genSalt(10);         //generates a salt and geSalt() is an Asynchronus funtion.
        secPass = await bcrypt.hash(req.body.password, salt);
        
        //creating user in the database
        user = await User.create({               
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });
        
        const data = {        
            user:{
                id: user.id     //we are generating authtoken using id which is there in mongoDB for uniquly idetify each user and assign authtoken
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);           //sign() is an synchronus fxn so no need of await and it take two arg.
        res.json({authtoken});

    } catch(error){
        console.log(error.message);
        res.status(500).send("Some error has occured");
    } 
})

module.exports = router