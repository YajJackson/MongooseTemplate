let _ = require('lodash')
let Cat = require('./cat_model')

module.exports = function(app) {

  // Create
  app.post('/cat', (req, res) => {
    newCat = new Cat(req.body)
    newCat.save((err) => { err ? res.json({info: 'error during cat create', error: err}) : res.json({info: 'cat created successfully'})})
  })

  // Read All
  app.get('/cat', (req, res) => {
    Cat.find((err, cats) => { err ? res.json({ info: 'error during find cats', error: err }) : res.json({ info: 'cats found successfully', data: cats })})
  })

  // Read One
  app.get('/cat/:id', (req, res) =>{
    Cat.findById(req.params.id, (err, cat) => { err ? res.json({ info: 'error during find cat', error: err }) : cat ? res.json({ info: 'cat found successfully', data: cat }) : res.json({ info: 'cat not found' })})
  })

  // Update
  app.put('/cat/:id', (req, res) => {
    Cat.findById(req.params.id, (err, cat) => {
      if(err) {
        res.json({ info: 'error during find cat', error: err })
      } else {
        if(cat) {
          _.merge(cat, req.body)
          cat.save((err) => { err ? res.json({ info: 'error during cat update', error: err }) : res.json({ info: 'cat updated successfully' })})
        } else {
          res.json({ info: 'cat not found' })
        }
      }
    })
  })

  // Delete
  app.delete('/cat/:id', (req, res) => {
    Cat.findByIdAndRemove(req.params.id, (err) => { err ? res.json({ info: 'error during remove cat', error: err}) : res.json({info: 'cat removed successfully'})})
  })
}