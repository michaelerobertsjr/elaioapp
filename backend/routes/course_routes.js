var Course = require('../models/Course')

module.exports = function (router, app, passport, server, auth) {
  app.get('/api/courses',
    passport.authenticate('localapikey', { failureRedirect: '/api/unauthorized' }),
    function (request, response) {
      var query = Course.find()
      query.exec(function (err, courses) {
        if (!err) {
          response.send(courses, {
            'Content-Type': 'application/json'
          }, 200)
        } else {
          response.send(JSON.stringify(err), {
            'Content-Type': 'application/json'
          }, 404)
        }
      })
    })

  app.post('/api/course/save', auth, function (request, response) {
    Course.create(request.body.course)
    response.redirect('/dashboard/courses')
  })
}
