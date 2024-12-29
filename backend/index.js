const connectToMongo = require('./db');
connectToMongo();

const express = require('express')
const app = express()
const port = 5000

var cors = require('cors')  //but first "npm install cors"
app.use(cors())           //Express CORS is a middleware package for Express.js that allows you to easily enable Cross-Origin Resource Sharing (CORS) in your applications.


//if we want to use req.body we have to use a middleware i.e.
app.use(express.json())

//Available routes in our folder
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
  console.log(`NoteSphere backend listening on port ${port}`)
})

