var variables = require('./backend/config/variables')
var environment = variables[variables.environment]
var configDB = require('./backend/config/database')

var express = require('express')
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')

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

var config = require('./webpack.config')
var compiler = webpack(config)
var publicPath = path.resolve(__dirname, 'app')

mongoose.connect(process.env.MONGOLAB_URI || configDB.url)

require('./backend/passport/main')(passport)
require('./backend/routes/_routes')(router, publicPath, app, passport, server)

app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
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
app.use(flash())
app.use(router)
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: {colors: true}
}))
app.use(webpackHotMiddleware(compiler, {
  log: console.log
}))

app.listen(port)
console.log('Listening  to  port http://localhost:' + port)
