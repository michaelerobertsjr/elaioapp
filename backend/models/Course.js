var mongoose = require('mongoose')
var ObjectId = mongoose.Schema.Types.ObjectId

var CourseSchema = mongoose.Schema({
  name : String,
  description: String,
  platform: String,
  stars: { type: Number, min: 0, max: 5 },
  certificate: ObjectId,
  keywords: [String],
  link: String,
  otherLinks: [String],
  subscribers: [],
  difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced', 'Proficiency', 'Master'] },
  image: String,
  price: Number
})

CourseSchema.methods.create = function(courseData) {
  var course = new Course()
  course.name        =  courseData.name
  course.description =  courseData.description
  course.platform    =  courseData.platform
  course.stars       =  courseData.stars || 0
  course.certificate =  courseData.certificate || ''
  course.keywords    =  courseData.keywords || []
  course.link        =  courseData.link
  course.otherLinks  =  courseData.otherLinks || []
  course.subscribers =  courseData.subscribers || []
  course.difficulty  =  courseData.difficulty || ''
  course.image       =  courseData.image || ''
  course.price       =  courseData.price || 0

  course.save(function(err) {
      if (err) {
        throw err
      }
  });
};

module.exports = mongoose.model('Course', CourseSchema);