var User = require('../models/User')

module.exports = function (router, app, passport, server, auth) {
  router.get('/', function (request, response) {
    response.render('index.html')
  })

  router.get('/dashboard/*', auth, function(request, response) {
    response.render('index.html');
  });

  router.get('/logout', auth, function (request, response) {
    request.logout()
    response.redirect('/')
  })

  router.get('/login', function (request, response) {
    if (request.isAuthenticated()) {
      response.redirect('/dashboard/main')
    } else {
      response.redirect('/')
    }
  })

  router.post('/login', passport.authenticate('login', {
    successRedirect: '/dashboard/main',
    failureRedirect: '/fail',
    failureFlash: false
  }))

  router.get('/dashboard/main', auth, function (request, response) {
    response.render('index.html')
  })

  router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/dashboard/main',
    failureRedirect: '/fail',
    failureFlash: false
  }))

  router.get('/user/current', auth, function (request, response) {
    response.send({username: request.user.username, apikey: request.user.apikey}, {
      'Content-Type': 'application/json'
    }, 200)
  });
}
