var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    user : {
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
    }
});


userSchema.methods.create = function(username, email, password, done, user) {
  var newUser            = user || new User();
  newUser.user.username  = username;
  newUser.user.email     = email;
  newUser.user.password  = newUser.generateHash(password);
  newUser.user.firstDate = new Date()
  newUser.user.lastDate  = new Date()

  newUser.save(function(err) {
      if (err) {
        throw err
      }
  });
};

userSchema.methods.createFromRequest = function(username, email, password, done) {
  var user = req.user;
  user.user.username = req.body.username;
  user.user.email    = email;
  user.user.password = user.generateHash(password);
  user.user.name  = ''
  user.user.address = ''

  user.save(function(err) {
      if (err)
          throw err;
      return done(null, user);
  });
}

userSchema.methods.update = function(request, response){
  this.user.name        = request.body.name || this.user.name
  this.user.familyName  = request.body.familyName || this.user.familyName
  this.user.username    = request.body.username || this.user.username
  this.user.birthDate   = request.body.birthDate || this.user.birthDate
	this.user.showContact = request.body.showContact || this.user.showContact
  this.user.courses     = request.body.courses || this.user.courses
  this.user.preferences = request.body.preferences || this.user.preferences
  this.user.public      = request.body.public || this.user.public
  this.user.twitter     = request.body.public || this.user.public
  this.user.facebook    = request.body.public || this.user.public
  this.user.googlePlus  = request.body.public || this.user.public
  this.user.following   = request.body.public || this.user.public
  this.user.followers   = request.body.public || this.user.public

	this.user.save();
	response.redirect('/user');
};

userSchema.methods.save = function(response) {
  response.user.username = profile.displayName;
  response.user.email    = profile.emails[0].value;
  response.user.name     = ''
  response.save(function(err) {
    if (err) {
      throw err;
    }
    return done(null, user);
  });
};

userSchema.methods.createIfDoesNotExist = function(profile, done) {
    this.findOne({ 'user.email' :  profile.emails[0].value }, function(err, user) {
          if (err)  return done(err);
          if (user) return done(null, user);
          var password = '';
          var email    = profile.email[0].user || '';
          var username = profile.displayName;
          User.create(username, email, password, done);
    });
};

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.verifyPassword = function(password) {
    return bcrypt.compareSync(password, this.user.password);
};

userSchema.methods.login = function(request, email, password, done) {
  var User = this
  process.nextTick(function() {
    User.findUser(request, email, password, done)
  });
}

userSchema.methods.findUser = function(request, email, password, done) {
  var User = this
  User.findOne({ 'user.email' :  email }, function(err, user) {
    if (err)
      return done(err)
    if (!user)
      return done(null, false, req.flash('error', 'no-user'))
    if (!user.verifyPassword(password))
      return done(null, false, req.flash('error', 'incorrect-user'))
    else
      return done(null, user);
  });
}

userSchema.methods.findUserIfNoRequest = function(request, email, password, done) {
  var User = this
  User.findOne({ 'user.email' :  email }, function(err, user) {
    if (err)
      return done(err)
    if (user)
      return done(null, false, request.flash('signuperror', 'exists-user'));
    else
      User.create(request.body.username, email, password, done);
  });
}

userSchema.methods.signup = function(request, email, password, done) {
  var User = this
  process.nextTick(function() {
    if (!request.user) {
      User.findUserIfNoRequest(request, email, password, done)
    } else {
      User.create(request.body.username, email, password, done, request.user);
    }
  });
}

module.exports = mongoose.model('User', userSchema);