//middleware is nothing but a function and called whenever we got any request on routes with requires login.
//It can be passed as an argument to the router.post()
//eg router.post('/getuser', fetchuser, async(req, res) => {   })

const jwt = require('jsonwebtoken');
const JWT_SECRET = "AbhiIs$goodBoy";  //that we have set earlier

const fetchuser = (req, res, next) => {
    //Get the user from the JWT token and add id to req object
    const token = req.header('auth-token');         //we will add auth-token to the headers on thunder client
    if(!token){
        res.status(401).send({error: "Please authenticate using a valid token"})        //401 - Access Denied 
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();

    } catch (error) {
        res.status(401).send({error: "Please authenticate using a valid token"})
    }
}

module.exports = fetchuser;


// The primary purpose of next() is to pass control to the next middleware function in the stack. If you don't call next(), 
// the request-response cycle will halt at the current middleware, and the subsequent middleware functions won't be executed.