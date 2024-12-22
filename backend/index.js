const connectToMongo = require('./db');
connectToMongo();

const express = require('express')
const app = express()
const port = 3000


//Available routes in our folder
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))
//so this is how we can use routes here


app.get('/', (req, res) => {
  res.send('Hello World!')
})

// app.get('/about', (req, res) => {
//   res.send('About Us!')
// })
// We can create all routes here only like but we will use a different folder for good and structured code

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

