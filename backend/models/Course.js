var mongoose = require('mongoose')
var ObjectId = mongoose.Schema.Types.ObjectId

var CourseSchema = mongoose.Schema({
  name: String,
  user: ObjectId,
  description: String,
  platform: String,
  keywords: [String],
  link: String,
  otherLinks: [String],
  students: [],
  difficulty: { type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Proficiency', 'Master'] },
  image: String
})

CourseSchema.methods.create = function (courseData) {
  var course = new Course()
  course.user = courseData.user
  course.name = courseData.name
  course.description = courseData.description
  course.platform = courseData.platform
  course.keywords = courseData.keywords || []
  course.link = courseData.link
  course.otherLinks = courseData.otherLinks || []
  course.students = courseData.students || []
  course.difficulty = courseData.difficulty || ''
  course.image = courseData.image || ''

  course.save(function (err) {
    if (err) {
      throw err
    }
  })
}

module.exports = mongoose.model('Course', CourseSchema)