var Student =   require('../models/Student')
var Statement = require('../models/Statement')
var StudentOperations = require('../operations/student')

module.exports = function (router, app, passport, server, auth) {
  router.get('/api/students', auth, function (request, response) {
    var query = Student.find()
    query.exec(function (err, students) {
      if (!err) {
        response.send(students, {
          'Content-Type': 'application/json'
        }, 200)
      } else {
        response.send(JSON.stringify(err), {
          'Content-Type': 'application/json'
        }, 404)
      }
    })
  })

  router.get('/api/student/get',
    passport.authenticate('localapikey', { failureRedirect: '/api/unauthorized' }),
    function (request, response) {
      Student.find({email: request.query.email})
      .exec(function(err, student) {
       if (err) {
         response.send(JSON.stringify(err));
       } else {
         if (student.length !== 0) {
           response.send(student, {
             'Content-Type': 'application/json'
           }, 200)
         } else {
           response.send({message: 'Student Not Found'}, {
             'Content-Type': 'application/json'
           }, 400)
         }
       }
      });
    })

  router.get('/api/student/intelligencetype',
    passport.authenticate('localapikey', { failureRedirect: '/api/unauthorized' }),
    function (request, response) {
      var intelligenceType, results;

      var query = Statement.find({'actor.mbox': 'mailto:' + request.query.mbox})

      query.exec(function(err, statements) {
        if (!err) {
          results = StudentOperations.getIntelligenceType(statements)
          if (results) {
            response.send({intelligenceType: results}, {
              'Content-Type': 'application/json'
            }, 200);
          } else {
            response.send({message: 'Error'}, {
              'Content-Type': 'application/json'
            }, 400);
          }
        } else {
          return err
        }
      })
    })


  router.get('/api/student/:mbox/:query', auth, function (request, response) {})

  router.post('/api/student/save',
    passport.authenticate('localapikey', { failureRedirect: '/api/unauthorized' }),
    function (request, response) {
      Student.create(request.body.student)
      response.send({message: 'Student Saved'}, {
        'Content-Type': 'application/json'
      }, 200);
    })
}
