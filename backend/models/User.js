var mongoose = require('mongoose')
var bcrypt   = require('bcrypt-nodejs')

var userSchema = mongoose.Schema({
  username     : { type : String, required : true},
  email        : { type : String, unique : true, required : true, dropDups: true },
  password     : { type : String, required : true},
  firstDate    : Date,
  lastDate     : Date,
  apikey       : String
})

var User = {}
var UserOperations = {}

UserOperations.findUser = function (request, email, password, done) {
  User.findOne({ 'email' :  email }, function(err, user) {
    if (err)
      return done(err)
    if (!user)
      return done(null, false, 'error')
    if (!user.verifyPassword(user, password))
      return done(null, false, 'error')
    else
      return done(null, user)
  })
}

UserOperations.create = function (request, email, password, done) {
  var newUser       = new User()
  newUser.username  = request.body.username
  newUser.email     = email
  newUser.password  = newUser.generateHash(password)
  newUser.apikey    = newUser.generateHash(password)
  newUser.firstDate = new Date()
  newUser.lastDate  = new Date()
  newUser.save(function (err) {
    if (err) {
      throw err
    } else {
      return done(null, newUser)
    }
 })
}

UserOperations.findUserIfNoRequest = function (request, email, password, done) {
  User.findOne({ 'email' : email }, function (err, user) {
    if (err)
      return done(err)
    if (user)
      return done(null, false, request.flash('signuperror', 'exists-user'));
    else
      UserOperations.create(request, email, password, done)
  });
}

userSchema.methods.update = function (request, response){
  this.username = request.body.username || this.username
  this.email    = request.body.email || this.email

  this.save(function (err) {
    if (err) {
      throw err
    } else {
      return done(null)
    }
 })

	response.redirect('/user')
}

userSchema.methods.createIfDoesNotExist = function (User, request, profile, done) {
  User.findOne({ 'email' : profile.emails[0].value }, function (err, user) {
    if (err) return done(err)
    if (user) return done(null, user)
    var password = request.body.password
    var email = request.body.email
    var username = profile.displayName
    User.create(username, email, password)
  })
}

userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

userSchema.methods.verifyPassword = function (user, password) {
  return bcrypt.compareSync(password, user.password)
}

userSchema.methods.login = function (request, email, password, done) {
  process.nextTick(function () {
    UserOperations.findUser(request, email, password, done)
  })
}

userSchema.methods.signup = function (request, email, password, done) {
  process.nextTick(function () {
    if (!request.user) {
      UserOperations.findUserIfNoRequest(request, email, password, done)
    } else {
      UserOperations.create(request, email, password, done)
    }
  })
}

userSchema.methods.api = function (apikey, done) {
    User.findOne({ apikey: apikey }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user);
    });
}

User = mongoose.model('User', userSchema)
module.exports = User
