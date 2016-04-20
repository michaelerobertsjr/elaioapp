var mongoose = require('mongoose')
var objectTypeEnum = { type: String, enum: ['Activity', 'Agent', 'StatementRef', 'SubStatement', 'Group'] }
var interactionTypeEnum = {type: String, enum: ['choice', 'sequencing', 'likert', 'matching', 'performance', 'true-false',
                                                'fill-in', 'long-fill-in', 'numeric']}

var StatementSchema = mongoose.Schema({
  id: String, /* from objectId */
  actor: {
    name: String,
    mbox: String /* "mailto:teampb@example.com" */
  },
  verb: {
    id: String, /* "http://adlnet.gov/expapi/verbs/attended" */
    display: Object /* {"en-GB": "attended",// "en-US": "attended"} */
  },
  result: {
    extensions: Object, /* {"http://example.com/profiles/meetings/resultextensions/minuteslocation": "X:\\meetings\\minutes\\examplemeeting.one"} */
    success: Boolean,
    scaledScore: Number,
    rawScore: Number,
    minScore: Number,
    maxScore: Number,
    completion: Boolean,
    response: String,
    duration: Date /* "PT1H0M0S" */
  },
  context: {
    extensions: Object
  },
  timestamp: Date,/* "2013-05-18T05:32:34.804Z" */
  stored: Date, /* "2013-05-18T05:32:34.804Z" */
  object: {
    id: String, /* "http://www.example.com/meetings/occurances/34534" */
    definition: {
      extensions: Object, /* {"http://example.com/profiles/meetings/activitydefinitionextensions/room": {"name": "Kilby", "id" : "http://example.com/rooms/342"}} */
      name: Object, /* {"en-GB": "example meeting", "en-US": "example meeting"} */
      description: Object, /* {"en-GB": "An example meeting that happened on a specific occasion with certain people present.","en-US": "An example meeting that happened on a specific occasion with certain people present."} */
      type: String, /* "http://adlnet.gov/expapi/activities/meeting" */
      moreInfo: String /* "http://virtualmeeting.example.com/345256" */
    },
    objectType: objectTypeEnum,
    interactionType: interactionTypeEnum
  }
})

function createStatement (statementData) {
  var statement = new Statement()

  statement.actor = statementData.actor
  statement.verb = statementData.verb
  statement.result = statementData.result
  statement.context = statementData.context
  statement.timestamp = statementData.timestamp
  statement.stored = statementData.stored
  statement.object = statementData.object

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