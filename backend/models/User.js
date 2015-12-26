var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
  name         : String,
  familyName   : String,
  username     : String,
  email        : String,
  password     : String,
  twitter      : String,
  facebook     : String,
  googlePlus   : String,
  birthDate    : Date,
  firstDate    : Date,
  lastDate     : Date,
  public       : {type: Boolean, default: false},
  showContact  : {type: Boolean, default: false},
  courses      : [],
  preferences  : [],
  following    : [],
  followers    : []
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
  this.name        = request.body.name || this.user.name
  this.familyName  = request.body.familyName || this.user.familyName
  this.username    = request.body.username || this.user.username
  this.birthDate   = request.body.birthDate || this.user.birthDate
	this.showContact = request.body.showContact || this.user.showContact
  this.courses     = request.body.courses || this.user.courses
  this.preferences = request.body.preferences || this.user.preferences
  this.public      = request.body.public || this.user.public
  this.twitter     = request.body.public || this.user.public
  this.facebook    = request.body.public || this.user.public
  this.googlePlus  = request.body.public || this.user.public
  this.following   = request.body.public || this.user.public
  this.followers   = request.body.public || this.user.public

	this.user.save();
	response.redirect('/user')
}

userSchema.methods.createIfDoesNotExist = function(User, request, profile, done) {
  User.findOne({ 'email' :  profile.emails[0].value }, function(err, user) {
    if (err)  return done(err)
    if (user) return done(null, user)
    var password = request.body.password || ''
    var email    = request.body.email || ''
    var username = profile.displayName
    User.create(username, email, password)
  })
}

userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

userSchema.methods.verifyPassword = function (user, password) {
  return bcrypt.compareSync(password, user.password)
}

userSchema.methods.login = function (request, email, password, done) {
  process.nextTick(function () {
    UserOperations.findUser(request, email, password, done)
  })
}

userSchema.methods.signup = function(request, email, password, done) {
  process.nextTick(function() {
    if (!request.user) {
      UserOperations.findUserIfNoRequest(request, email, password, done)
    } else {
      UserOperations.create(request, email, password, done)
    }
  })
}

User = mongoose.model('User', userSchema)
module.exports = User