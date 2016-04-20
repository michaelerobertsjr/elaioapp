var mongoose = require('mongoose')
var brain = require('brain')

var studentSchema = mongoose.Schema({
  name: String,
  gender: String,
  age: Number,
  /* ************************ Learning Style (Kolb) ************************ */
  learningStyle: {
    /* AE: Active Experimentation: Doing */
    entertainer: Number,
    improviser: Number,
    discoverer: Number,
    risky: Number,
    spontaneous: Number,
    /* RO: Reflexive  Observation: Watching */
    prudent: Number,
    conscientious: Number,
    receptive: Number,
    analytical: Number,
    exhaustive: Number,
    /* AC: Abstract Conceptualisation: Thinking */
    methodical: Number,
    logical: Number,
    objective: Number,
    critical: Number,
    organized: Number,
    /* CE: Concrete Experience: Feeling */
    experimental: Number,
    practical: Number,
    direct: Number,
    effective: Number,
    realistic: Number
  },
  'ingelligenceType': { // Howard Gardner
    linguistic: Number,
    logicalMathematical: Number,
    spatial: Number,
    musical: Number,
    bodylyKinesthetic: Number,
    intrapersonal: Number,
    interpersonal: Number,
    naturalist: Number
  },
  'personality': {
    pA: Number,
    pB: Number,
    pAB: Number
  },
  'academicData': {
    achievements: Number,
    materials: Number,
    activities: Number,
    time: Number
  },
  'mood': {
    positive: Number,
    negative: Number,
    neutral: Number
  }
})

function updateStudentKey (studentKey, studentDataKey, key) {
  studentKey[key] = studentDataKey[key] || studentKey[key] || 0
}

function updateKeys (student, studentData, keyName) {
  for (var key in student[keyName]) {
    updateStudentKey(student[keyName], studentData[keyName], key)
  }
}

studentSchema.methods.create = function (studentData) {
  var student = new Student()

  student.save(function (err) {
    if (err) {
      throw err
    }
  })
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

function isSuccessfull (statement) {
  return (statement.result.success && statement.result.completion) ? 1 : 0
}

function getLearningStyles (statement) {
  var learningStyles = {}
  statement.context.extensions.learningStyles.forEach( function (learningStyle) {
    learningStyles[learningStyle] = isSuccessfull(statement)
  })
  return learningStyles
}

studentSchema.methods.updateLearningStyle = function (studentStatements) {
  var student = this
  var training = []

  studentStatements.forEach(function (statement) {
    training.push({
      'input': {
        'student': statement.actor.mbox
      },
      'output': getLearningStyles(statement)
    })
  })

  var net = new brain.NeuralNetwork()
  net.train(training)
  var studentData = net.run({
    'student': statement.actor.mbox
  })
  updateLearningStyle(student, studentData)
  student.save(function (err) {
    if (err) {
      throw err
    }
  })
}

module.exports = mongoose.model('Student', studentSchema)