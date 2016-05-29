var Statement = require('../models/Statement')
var User = require('../models/User')

module.exports = function (router, app, passport, server, auth) {
  router.get('/api/statements', auth, function (request, response) {
    console.log('REQUEST:', request)
    var query = Statement.find()
    query.exec(function (err, statements) {
      if (!err) {
        response.send(statements, {
          'Content-Type': 'application/json'
        }, 200)
      } else {
        response.send(JSON.stringify(err), {
          'Content-Type': 'application/json'
        }, 404)
      }
    })
  })

  router.get('/api/statement/:mbox', auth, function (request, response) {})

  router.get('/api/statement/:mbox/:query', auth, function (request, response) {})

  router.post('/api/statement/save',
    passport.authenticate('localapikey', { failureRedirect: '/api/unauthorized' }),
    function (request, response) {
      var statement;

      statement = request.body.statement;
      statement.authority = request.user.email;
      
      Statement.create(statement);
      response.send(JSON.stringify({message: 'Statement Saved'}), {
        'Content-Type': 'application/json'
      }, 200);
    })

  router.post('/api/statements/save',
    passport.authenticate('localapikey', { failureRedirect: '/api/unauthorized' }),
    function (request, response) {
      Statement.createMany(request.body.statements)
      response.send(JSON.stringify({message: 'Statements Saved'}), {
        'Content-Type': 'application/json'
      }, 200);
    })
}
