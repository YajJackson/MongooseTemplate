let mongoose = require('mongoose')

let catSchema = mongoose.Schema({
  name: String,
  age: Number,
  type: String
})

module.exports = mongoose.model('Cat', catSchema)