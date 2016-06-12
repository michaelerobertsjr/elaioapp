var mongoose = require('mongoose')
var brain =    require('brain')
var url =      require('../config/variables').url

var studentStructure, studentSchema;

studentStructure = {
  name:      { type : String, required : true},
  email:     { type : String, required : true, unique : true, dropDups: true },
  gender:    { type : String, required : true},

  /* ************************ Learning Style (Kolb) ************************ */
  learningStyle: {
    /* AE: Active Experimentation: Doing */
    entertainer: { type: Number, default: 0 },
    improviser:  { type: Number, default: 0 },
    discoverer:  { type: Number, default: 0 },
    risky:       { type: Number, default: 0 },
    spontaneous: { type: Number, default: 0 },
    /* RO: Reflexive  Observation: Watching */
    prudent:       { type: Number, default: 0 },
    conscientious: { type: Number, default: 0 },
    receptive:     { type: Number, default: 0 },
    analytical:    { type: Number, default: 0 },
    exhaustive:    { type: Number, default: 0 },
    /* AC: Abstract Conceptualisation: Thinking */
    methodical: { type: Number, default: 0 },
    logical:    { type: Number, default: 0 },
    objective:  { type: Number, default: 0 },
    critical:   { type: Number, default: 0 },
    organized:  { type: Number, default: 0 },
    /* CE: Concrete Experience: Feeling */
    experimental: { type: Number, default: 0 },
    practical:    { type: Number, default: 0 },
    direct:       { type: Number, default: 0 },
    effective:    { type: Number, default: 0 },
    realistic:    { type: Number, default: 0 }
  },

  intelligenceType: { // Howard Gardner
    linguistic:          { type: Number, default: 0 },
    logicalMathematical: { type: Number, default: 0 },
    spatial:             { type: Number, default: 0 },
    musical:             { type: Number, default: 0 },
    bodylyKinesthetic:   { type: Number, default: 0 },
    intrapersonal:       { type: Number, default: 0 },
    interpersonal:       { type: Number, default: 0 },
    naturalist:          { type: Number, default: 0 }
  },
  personality: {
    pA: { type: Number, default: 0 },
    pB: { type: Number, default: 0 },
    pAB:  { type: Number, default: 0 }
  },
  academicData: {
    achievements: { type: Number, default: 0 },
    materials:    { type: Number, default: 0 },
    activities:   { type: Number, default: 0 },
    time:         { type: Number, default: 0 }
  },
  mood: {
    positive: { type: Number, default: 0 },
    negative: { type: Number, default: 0 },
    neutral:  { type: Number, default: 0 }
  }
}

studentSchema = mongoose.Schema(studentStructure)

/* Private */

function updateKeys (student, studentData, keyName) {
  for (var attribute in studentStructure[keyName]) {
    student[keyName][attribute] = studentData[keyName][attribute] || student[keyName][attribute]
  }
}

function updateLearningStyle (student, studentData) {
  updateKeys(student, studentData, 'learningStyle')
}

function updateIngelligenceType (student, studentData) {
  updateKeys(student, studentData, 'intelligenceType')
}

function updatePersonality (student, studentData) {
  updateKeys(student, studentData, 'personality')
}

function updateAcademicData (student, studentData) {
  updateKeys(student, studentData, 'academicData')
}

function updateMood (student, studentData) {
  updateKeys(student, studentData, 'mood')
}

function addStudentData (student, studentData) {
  updateLearningStyle(student, studentData)
  updateIngelligenceType(student, studentData)
  updatePersonality(student, studentData)
  updateAcademicData(student, studentData)
  updateMood(student, studentData)
}

studentSchema.methods.create = function (studentData) {
  var student = new Student()
  student.name =      studentData.name
  student.email =     studentData.email
  student.age =       studentData.age
  student.gender =    studentData.gender

  addStudentData(student, studentData)

  student.save(function (err) {
    if (err) {
      throw err
    }
  })
}

studentSchema.methods.update = function (studentData) {
  var student = this
  addStudentData(student, studentData)
  student.save(function (err) {
    if (err) {
      throw err
    }
  })
}

studentSchema.methods.exists = function (student) {
  return (student.length === 0)
}

module.exports = mongoose.model('Student', studentSchema)
