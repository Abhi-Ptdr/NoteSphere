//file name with all small letter

const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.send("hello notes")
})

module.exports = router