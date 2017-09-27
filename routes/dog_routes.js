let _ = require('lodash')
let Dog = require('../models/dog_model')

module.exports = function(app) {

  // Create
  app.post('/dog', function(req, res) {
    let newDog = new Dog(req.body)
    newDog.save(function(err) {
      if(err) {
        res.json({info: 'error during dog create', error: err})
      } else {
        res.json({info: 'dog created successfully'})
      }
    })
  })

  // Read All
  app.get('/dog', function(req, res) {
    Dog.find(function(err, dogs) {
      if(err) {
        res.json({ info: 'error during find dogs', error: err })
      } else {
        res.json({ info: 'dogs found successfully', data: dogs })
      }
    })
  })

  // Read One
  app.get('/dog/:id', function(req, res) {
    Dog.findById(req.params.id, function(err, dog) {
      if(err) {
        res.json({ info: 'error during find dog', error: err })
      } else {
        if(dog) {
          res.json({ info: 'dog found successfully', data: dog })
        } else {
          res.json({ info: 'dog not found' })
        }
      }
    })
  })

  // Update
  app.put('/dog/:id', function(req, res) {
    Dog.findById(req.params.id, function(err, dog) {
      if(err) {
        res.json({ info: 'error during find dog', error: err })
      } else {
        if(dog) {
          _.merge(dog, req.body)
          dog.save(function(err) {
            if(err) {
              res.json({ info: 'error during dog update', error: err })
            } else {
              res.json({ info: 'dog updated successfully' })
            }
          })
        } else {
          res.json({ info: 'dog not found' })
        }
      }
    })
  })

  // Delete
  app.delete('/dog/:id', function(req, res){
    Dog.findByIdAndRemove(req.params.id, function(err) {
      if(err) {
        res.json({ info: 'error during remove dog', error: err})
      } else {
        res.json({info: 'dog removed successfully'})
      }
      
    })
  })
}