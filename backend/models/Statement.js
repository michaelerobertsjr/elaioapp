const INTERACTION_TYPES = require('../globals/interactionTypes');
const OBJECT_TYPES =      require('../globals/objectTypes');

var mongoose = require('mongoose')
var objectTypeEnum =      { type: String, enum: OBJECT_TYPES}
var interactionTypeEnum = {type: String, enum: INTERACTION_TYPES}

var StatementSchema = mongoose.Schema({
  actor: {
    name: { type: String, required: true},
    mbox: { type: String, required: true},
  },
  verb: {
    id:      { type: String, required: true},
    display: { type: Object, required: true},
  },
  result: {
    extensions:  { type: Object, required: false},
    scaledScore: { type: Number, required: false},
    rawScore:    { type: Number, required: false},
    minScore:    { type: Number, required: false},
    maxScore:    { type: Number, required: false},
    completion:  { type: Boolean, required: false, default: true},
    response:    { type: String, required: false},
    duration:    { type: Date, required: false}
  },
  context: {
    extensions: { type: Object, required: false}
  },
  timestamp: { type: Date, required: false},
  stored: { type: Date, required: false},
  object: {
    id:         { type: String, required: false},
    definition: {
      extensions:  { type: Object, required: false},
      name:        { type: Object, required: false},
      description: { type: Object, required: false},
      type:        { type: String, required: false},
      moreInfo:    { type: String, required: false}
    },
    objectType:      { type: objectTypeEnum, required: false},
    interactionType: { type: interactionTypeEnum, required: false}
  },
  version:   {type: String, required: false },
  authority: {type: String, required: false}
})

function createStatement (statementData) {
  var statement = new Statement()

  statement.actor =     statementData.actor
  statement.verb =      statementData.verb
  statement.result =    statementData.result
  statement.context =   statementData.context
  statement.stored =    statementData.stored || Date.now()
  statement.timestamp = statementData.timestamp || statement.store
  statement.object =    statementData.object
  statement.version =   statementData.version
  statement.authority = statementData.authority

  statement.save(function (err) {
    if (err) {
      throw err
    }
  })
}

StatementSchema.methods.create = function (statementData) {
  createStatement(statementData)
}

StatementSchema.methods.createMany = function (statementsData) {
  statementsData.forEach(function (statementData) {
    createStatement(statementData)
  })
}

module.exports = mongoose.model('Statement', StatementSchema)
