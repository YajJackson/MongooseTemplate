let r = require('request').defaults({ json: true })
let async = require('async')

module.exports = function(app) {

  // Read
  app.get('/pets', function(req, res) {

    async.parallel({
      cats: function(callback) {
        r({uri: 'http://localhost:3000/cat'}, function(error, response, body) {
          if(error) {
            callback({service: 'cat', error: error})
            return
          }
          if(!error && response.statusCode === 200) {
            callback(null, body)
          } else {
            callback(response.statusCode)
          }
        })
      },
      dogs: function(callback) {
        r({uri: 'http://localhost:4000/dog'}, function(error, response, body) {
          if(error) {
            callback({service: 'dog', error: error})
            return
          }
          if(!error && response.statusCode === 200) {
            callback(null, body)
          } else {
            callback(response.statusCode)
          }
        })
      }
    }, 
    function(error, results){
      res.json({
        error: error,
        results: results
      })
    })
  })
}