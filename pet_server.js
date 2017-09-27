let express = require('express')
let app = express()
let bodyParser = require('body-parser')

app.use(bodyParser.json())

let petRoutes = require('./routes/pet_routes')(app)

let server = app.listen(5000, function(req, res) {
  console.log('Listening on port 5000')
})