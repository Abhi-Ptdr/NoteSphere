const express = require('express');
const User = require('../models/User.js');
const router = express.Router();
const { body, validationResult } = require('express-validator'); 
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');       // .. because we are going back one directory to go into middleware folder


const JWT_SECRET = "AbhiIs$goodBoy"         //we will store it in secret file like .env.local ot ignore to push publicly

//ROUTE 1: Create a user using POST "/api/auth/createuser". No login required
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
        let user = await User.findOne({email: req.body.email});
        if(user){
            return res.status(400).json({error: "Sorry this email already registered"});
        }

        //password hashing
        const salt = await bcrypt.genSalt(10); 
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
        res.status(500).send("Internal server Error");
    } 
})

//LOGIN ENDPOINT
//ROUTE 2: Authenticate a user using POST "/api/auth/login". No login required

router.post('/login', [
    //Validations
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password can not be blank').exists()

], async (req, res)=>{ 
    let success = false;
    //if there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;         //array destructure syntax
    try{
        //checking if user with inserted email registered or not
        let user = await User.findOne({email});
        if(!user){
            success = false;
            return res.status(400).json({error: "Incorrect Credentials"});
        }
        //Check if password inserted is coreect
        const passwordCompare = await bcrypt.compare(password, user.password);      //password is the inserted one and user.password is the hashed password from the DB
        if(!passwordCompare){
            success = false;
            return res.status(400).json({success, error: "Incorrect Credentials"});
        }

        //if both email and password are match fetch user data with unique id
        const data = {        
            user:{
                id: user.id
            }
        }
        //generating and sending authtoken using jwt(json web token)
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authtoken});

    }catch(error) {
        console.log(error.message);
        res.status(500).send("Internal server Error");
    }
})


//ROUTE 3: Get logedin user data using POST "/api/auth/getuser". Login required

router.post('/getuser', fetchuser, async (req, res)=>{
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")    //selecting everything exept password
        res.send(user)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server Error");
    }
})

module.exports = router