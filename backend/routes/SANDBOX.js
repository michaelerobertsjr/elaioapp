/* SANDBOX */
//exercises --------------------------------------------------

/* Models */

var User       = require('./backend/models/User');
var Text       = require('./backend/models/Text');
var Exercise   = require('./backend/models/Exercise');

/* Dependencies */
var async = require("async");
var path  = require('path'),
var fs    = require('fs');
var auth  = require('./backend/routes/auth_routes').authenticate

module.exports = function(app, passport, server) {
  var ExerciseData {
    fields : {
      userData       : '',
      levelNumber    : 0,
      score          : 0,
      name           : '',
      totalScore     : 0,
      maxScore       : 0,
      timesPlayed    : 0,
      lastScore      : 0,
      levelField     : 0,
      excerciseScore : 0
    },

    get : function() {
      return ExerciseData.fields;
    },

    fromRequest : function(request) {
      ExerciseData.fields.userData       = request.user;
      ExerciseData.fields.levelNumber    = parseInt(request.params.levelnumber) - 1;
      ExerciseData.fields.score          = parseInt(request.params.score);
      ExerciseData.fields.name           = request.params.name;
      ExerciseData.fields.totalScore     = parseInt(userData.user.totalScore) + parseInt(request.params.score);
      ExerciseData.fields.maxScore       = 0;
      ExerciseData.fields.timesPlayed    = 0;
      ExerciseData.fields.lastScore      = 0;
      ExerciseData.fields.levelField     = 0;
      ExerciseData.fields.excerciseScore = 0;
      return ExerciseData.fields;
    },

    fromExercise : function(exercise) {
      ExerciseData.fields.maxScore       = Math.max(excercise[0].levels[data.levelNumber].maxScore, Exercisedata.fields.score);
      ExerciseData.fields.timesPlayed    = excercise[0].levels[data.levelNumber].timesPlayed;
      ExerciseData.fields.number         = excercise[0].levels[data.levelNumber].number;
      ExerciseData.fields.lastScore      = Exercisedata.fields.score;
      ExerciseData.fields.excerciseScore = excercise[0].levels[data.levelNumber].totalScore + Exercisedata.fields.score;
      return ExerciseData.fields;
    },

    reset : function() {
      ExerciseData.fields.maxScore       = ExerciseData.fields.score;
      ExerciseData.fields.timesPlayed    = 0;
      ExerciseData.fields.lastScore      = ExerciseData.fields.score;
      ExerciseData.fields.number         = ExerciseData.fields.levelNumber + 1;
      ExerciseData.fields.excerciseScore = ExerciseData.fields.score;
      return ExerciseData.fields;
    },

    incrementLevel : function() {
      ExerciseData.fields.levelField = 'levels.' + (ExerciseData.fields.levelNumber).toString();
      ExerciseData.fields.timesPlayed++;
      return ExerciseData.fields;
    },

    update : function() {
      


    },

    headers : [
      { 
        name : 'Content-Type',
        type : 'application/json;  charset=utf-8'
      }
    ],

    setTotalScore : {
      $set:{'user.totalScore': totalScore}
    },

    getUserFromRequest : function(request) {
      var username = request.params.username || request.user.user.username;
      return username;
    },

    getUsername : function(user) {
      return {'user.username': user};
    },

    getUserExercise : function(exerciseName, user) {
      return {'name': exerciseName, 'username': user};
    },

    setHeaders : function(response) {
      ExerciseData.headers.forEach(function(header) {
        response.setHeader(header.name, header.type);
      });
    },

    endParsedResponse : function(response, data) {
      response.end(JSON.stringify(data));
    }
  }

  app.get('/exercises/:username?', auth, function(request, response) {
    var username = ExerciseData.getUserFromRequest(request);

    Exercise.find({username: username}).exec(function(err, excercises) {
      if (err) {
        ExerciseData.endParsedResponse(response, err);
      } else {
        ExerciseData.setHeaders(response);
        ExerciseData.endParsedResponse(response, exercises);
      }

      ExerciseData.incrementLevel();
    });


  });

  app.put('/save/:name/:levelnumber/:score', auth, function(request, response) {
    var data = ExerciseData.fromRequest(request);
    // User.update(ExerciseData.getUsername(exercise.userData.user.username), ExerciseData.setTotalScore)

    Exercise.find(ExerciseData.getUserExercise(name, userData.user.username) function(err, exercise) {
      if (ExerciseData.exists(exercise)) {
        ExerciseData.fromExercise(exercise);
      } else {
        ExerciseData.reset();
      }
    });

    Excercise.find({'name': name, 'username': userData.user.username}, function(err, excercise) {
      if (excercise[0].levels[levelNumber]) {
        maxScore = Math.max(excercise[0].levels[levelNumber].maxScore, score);
        timesPlayed = excercise[0].levels[levelNumber].timesPlayed;
        number = excercise[0].levels[levelNumber].number;
        lastScore = score;
        excerciseScore = excercise[0].levels[levelNumber].totalScore + score;

      } else {
        maxScore = score;
        timesPlayed = 0;
        lastScore = score;
        number = levelNumber + 1;
        excerciseScore = score;
      }

      levelField = 'levels.' + (levelNumber).toString();
      timesPlayed++;

      var excerciseData = {
        name: name,
        username: userData.user.username
      };

      var excerciseUpdate = {$set: {}};

      excerciseUpdate['$set'][levelField] = {
        maxScore    : maxScore,
        timesPlayed : timesPlayed,
        number      : number,
        lastScore   : lastScore,
        totalScore  : excerciseScore
      };



      Excercise.update(excerciseData, excerciseUpdate, function(err, data) {
          if (err) {
            response.setHeader('Content-Type', 'application/json;  charset=utf-8');
            response.end(JSON.stringify(err));
          } else {
            query.exec(function(err, data) {
              if (err) {
                response.setHeader('Content-Type', 'application/json;  charset=utf-8');
                response.end(JSON.stringify(err));
              } else {
                response.setHeader('Content-Type', 'application/json;  charset=utf-8');
                response.end(JSON.stringify(data));
              };
            });
          };
      })
    });

  });

};


/* SANDBOX */

//list exercises by user
  app.get('/userdata/:username', auth, function(request, response) {
      Exercise.find({username: request.params.username}, {'_id': 0})
      .select('name levels');
      .exec(function(err, userdata) {
       if (err) {
         sendErrorResponse(response, err)
       } else {
         if (UserData.exists(userdata)) {
           sendUserResponse(UserData.exercisesFromRequest(request), response);
         } else {
           sendNoUserResponse(response);
         }
       }
      });
  });

//texts --------------------------------------------------



  /* Models */
var User       = require('./backend/models/User');
var Text       = require('./backend/models/Text');
var Exercise   = require('./backend/models/Exercise');

/* Dependencies */
var async = require("async");
var path  = require('path'),
var fs    = require('fs');
var auth  = require('./backend/routes/auth_routes').authenticate

module.exports = function(app, passport, server) {
  var TextData {
    
    headers : [
      { 
        name : 'Content-Type',
        type : 'application/json;  charset=utf-8'
      }
    ],

    fromRequest: function(request) {
      return {name: request.params.name, level: request.params.levelnumber};
    },
    
    getGameFromRequest : function(texts, request) {
      return {excercises: texts, levelNumber: request.params.levelnumber}
    },

    setHeaders : function(response) {
      TextData.headers.forEach(function(header) {
        response.setHeader(header.name, header.type);
      });
    },

    endParsedResponse : function(response, data) {
      response.end(JSON.stringify(data));
    }
  }

  app.get('/:name/level/:levelnumber', function(request, response) {
    Text.find(TextData.fromRequest(request))
    .exec(function(err, texts) {
      if (err) return err;
      TextData.setHeaders(response);
      TextData.endParsedResponse(response, TextData.getGameFromRequest(texts, request));
    });
  });
};

