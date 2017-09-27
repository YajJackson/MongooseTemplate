let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/dogs')

app.use(bodyParser.json())

let dogRoutes = require('./routes/dog_routes')(app)

let server = app.listen(4000, function(){
  console.log('Listening on port 4000')
})