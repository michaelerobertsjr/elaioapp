var variables = require('./backend/config/variables')
var environment = variables[variables.environment]
var configDB = require('./backend/config/database')

var express = require('express')

var app = express()
var router = express.Router()

var cookieParser = require('cookie-parser')
var path = require('path')
var bodyParser = require('body-parser')
var expressSession = require('express-session')

var port = process.env.PORT || environment.port
var mongoose = require('mongoose')
var passport = require('passport')
var flash = require('connect-flash')

var http = require('http')
var server = http.createServer(app)

var publicPath = path.resolve(__dirname, environment.path)

mongoose.connect(process.env.MONGOLAB_URI || configDB.url);

require('./backend/passport/main')(passport)
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, environment.path)))
app.engine('html', require('ejs').renderFile)
app.set('views', __dirname + environment.views)
app.set('view options', {layout: false})
app.use(expressSession({
  secret: variables.secret,
  proxy: true,
  resave: true,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(router)
app.use(flash())
require('./backend/routes/_routes')(router, publicPath, app, passport, server)

app.listen(port)
console.log('Listening  to  port http://localhost:' + port)
