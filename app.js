var express = require('express')
var app = express()
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var expressSession = require('express-session')

var port = process.env.PORT || 1923
var mongoose = require('mongoose')
var passport = require('passport')
var flash = require('connect-flash')
var path = require('path')
var fs = require('fs')
var http = require('http')
var server = http.createServer(app)

var variables = require('./backend/config/variables')
var configDB = require('./backend/config/database')

mongoose.connect(process.env.MONGOLAB_URI || configDB.url)

require('./backend/passport/main')(passport)

app.use(cookieParser())
app.use(bodyParser.urlencoded())
app.use(expressSession({ secret: variables.secret }))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

require('./backend/routes/_routes')(app, passport, server)

app.listen(port)
console.log('Listening  to  port http://localhost:' + port)
