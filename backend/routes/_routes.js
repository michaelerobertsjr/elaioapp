module.exports = function (router, publicPath, app, passport, server) {
	var auth = require('../routes/auth_routes')(router, app, passport, server).authenticate

	require('../routes/main_routes')(router, app, passport, server, auth)
	require('../routes/course_routes')(router, app, passport, server, auth)
	require('../routes/statement_routes')(router, app, passport, server, auth)
	require('../routes/student_routes')(router, app, passport, server, auth)

	var io = require('socket.io').listen(server);

	io.sockets.on('connection', function (socket) {
	  socket.on('adduser', function(username){
	    socket.username = username;
	    usernames[username] = username;
	    io.sockets.emit('updateusers', usernames);
	  });

	  socket.on('disconnect', function(){
	    delete usernames[socket.username];
	    io.sockets.emit('updateusers', usernames);
	    socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
	  });
	});
}
