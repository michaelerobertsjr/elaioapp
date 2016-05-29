var mongoose = require('mongoose')
var objectTypeEnum = { type: String, enum: ['Activity', 'Agent', 'StatementRef', 'SubStatement', 'Group'] }
var interactionTypeEnum = {type: String, enum: ['choice', 'sequencing', 'likert', 'matching', 'performance', 'true-false',
                                                'fill-in', 'long-fill-in', 'numeric']}

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
    extensions:  { type: Object, required: false}, /* {"http://example.com/profiles/meetings/resultextensions/minuteslocation": "X:\\meetings\\minutes\\examplemeeting.one"} */
    success:     { type: Boolean, required: false, default: true},
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
      extensions:  { type: Object, required: false}, /* {"http://example.com/profiles/meetings/activitydefinitionextensions/room": {"name": "Kilby", "id" : "http://example.com/rooms/342"}} */
      name:        { type: Object, required: false},
      description: { type: Object, required: false}, /* {"en-GB": "An example meeting that happened on a specific occasion with certain people present.","en-US": "An example meeting that happened on a specific occasion with certain people present."} */
      type:        { type: String, required: false}, /* "http://adlnet.gov/expapi/activities/meeting" */
      moreInfo:    { type: String, required: false} /* "http://virtualmeeting.example.com/345256" */
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
