var mongoose = require('mongoose')
var ObjectId = mongoose.Schema.Types.ObjectId

var UserCourseSchema = mongoose.Schema({
  course: ObjectId,
  user: ObjectId,
  username: String,
  notes: String,
  customLinks: [],
  documents: [],
  stars: { type: Number, min: 0, max: 5 }
})

UserCourseSchema.methods.create = function (userCourseData) {
  var userCourse = new UserCourse()
  userCourse.course      = userCourseData.course,
  userCourse.user        = userCourseData.user,
  userCourse.notes       = userCourseData.notes || ''
  userCourse.customLinks = userCourseData.customLinks || []
  userCourse.documents   = userCourseData.documents || []
  userCourse.stars       = userCourseData.stars || 0

  userCourse.save(function(err) {
      if (err) {
        throw err
      }
  })
}

module.exports = mongoose.model('UserCourse', UserCourseSchema)