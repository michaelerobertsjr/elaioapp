module.exports = function (router, app, passport, server) {
	app.get('/auth/facebook',
		passport.authenticate('facebook', { scope : 'email' }))

	app.get('/auth/facebook/callback',
		passport.authenticate('facebook', {
		successRedirect : '/dashboard/user',
		failureRedirect: '/login' }));

	app.get('/auth/twitter',
		passport.authenticate('twitter'));

	app.get('/auth/twitter/callback',
		passport.authenticate('twitter', {
					successRedirect : '/dashboard/user',
					failureRedirect: '/login' }));

	app.get('/auth/google',
	  passport.authenticate('google', { scope : ['profile', 'email'] }));

	app.get('/auth/google/callback',
	  passport.authenticate('google', {
					successRedirect : '/dashboard/user',
					failureRedirect: '/login' }));

	app.get('/api/unauthorized', function (request, response) {
		response.send(JSON.stringify({message: 'Api Authentication Failed'}), {
			'Content-Type': 'application/json'
		}, 200);
	});

	return {
		authenticate : function(request, response, next) {
		  if (request.isAuthenticated()) { return next(); }
			response.redirect('/login')
		}
	}
}
