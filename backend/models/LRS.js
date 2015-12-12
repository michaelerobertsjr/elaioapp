var mongoose = require('mongoose')
var objectTypeEnum = { type: String, enum: ['Activity', 'Agent', 'StatementRef', 'SubStatement'] }

var LRSSchema = mongoose.Schema({
  id: String, /* from objectId */
  actor: {
    name: String,
    mbox: String, /* "mailto:teampb@example.com" */
    member: [
      {
        name: String,
        account: {
          homePage: String,
          name: String
        },
        objectType: objectTypeEnum
      }
    ],
    objectType: objectTypeEnum
  },
  verb: {
    id: String, /* "http://adlnet.gov/expapi/verbs/attended" */
    display: Object /* {"en-GB": "attended",// "en-US": "attended"} */
  },
  result: {
    extensions: Object, /* {"http://example.com/profiles/meetings/resultextensions/minuteslocation": "X:\\meetings\\minutes\\examplemeeting.one"} */
    success: Boolean,
    completion: Boolean,
    response: String,
    duration: Date /* "PT1H0M0S" */
  },
  context: {
    registration: String,
    contextActivities: {
      parent: [
        {
          id: String, /* "http://www.example.com/meetings/series/267" */
          objectType: objectTypeEnum
        }
      ],
      category: [
        {
          id: String, /* "http://www.example.com/meetings/categories/teammeeting" */
          objectType: objectTypeEnum,
          definition: {
            name: Object, /* {"en": "team meeting"} */
            description: Object, /* {"en": "A category of meeting used for regular team meetings."}, */
            type: String /*"http://example.com/expapi/activities/meetingcategory" */
          }
        }
      ],
      other: [
        {
          id: String,/* "http://www.example.com/meetings/occurances/34257" */
          objectType: objectTypeEnum
        }
      ]
    },
    platform: String, /* "Example virtual meeting software" */
    language: String, /* "tlh" */
    statement: {
      objectType: objectTypeEnum,
      id: String /* "6690e6c9-3ef0-4ed3-8b37-7f3964730bee" */
    }
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
    objectType: objectTypeEnum
  }
})

LRSSchema.methods.create = function (LRSdata) {
  var lrs = new LRS()
  lrs = LRSdata

  lrs.save(function (err) {
    if (err) {
      throw err
    }
  })
}

module.exports = mongoose.model('LRS', LRSSchema)