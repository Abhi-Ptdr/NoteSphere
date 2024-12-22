const connectToMongo = require('./db');
connectToMongo();

const express = require('express')
const app = express()
const port = 3000

//if we want to use req.body we have to use a middleware i.e.
app.use(express.json())

//Available routes in our folder
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

