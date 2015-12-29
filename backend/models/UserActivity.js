var mongoose = require('mongoose')
var ObjectId = mongoose.Schema.Types.ObjectId

var UserActionSchema = mongoose.Schema({
  user: ObjectId,
  username: String,
  action: String,
  actors: []
})

UserActionSchema.methods.create = function (userActionSchema) {
  var userAction = new userAction()
  userAction.course = UserActionSchema.course
  userAction.user   = UserActionSchema.user

  userAction.save(function(err) {
      if (err) {
        throw err
      }
  })
}

module.exports = mongoose.model('UserAction', UserActionSchema)