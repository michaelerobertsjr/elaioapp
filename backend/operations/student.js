/* Student Operations */

var Statement =         require('../models/Statement')
var Brain =             require('brain')

const INTELLIGENCE_TYPES = require('../globals/intelligenceTypes')
const INTERACTION_TYPES =  require('../globals/interactionTypes')
const LEARNING_STYLES =    require('../globals/learningStyles')
const VERBS =              require('../globals/verbs')

function getIntelligenceType(statements) {
  var training, results, input, type;

  training = []

  statements.forEach(function (statement) {
    if (hasExtensions(statement)) {
      input = {}

      for (type in INTELLIGENCE_TYPES) {
        input[type] = Number(!!statement.context.extensions[INTELLIGENCE_TYPES[type].id]);
      }

      training.push({
        input:  input,
        output: {
          success:    Number(statement.result.success),
          completion: Number(statement.result.completion)
        }
      })
    }
  })

  return trainNeuralNetwork(training, Object.keys(INTELLIGENCE_TYPES))
}

function getInteractionType(statements) {
  var training, results, input, type;

  training = []

  statements.forEach(function (statement) {
    if (hasInteractionType(statement)) {
      input = {}

      INTERACTION_TYPES.forEach(function (type) {
        input[type] = Number(!!statement.definition.interactionType[type]);
      })

      training.push({
        input:  input,
        output: {
          success:    Number(statement.result.success),
          completion: Number(statement.result.completion)
        }
      })
    }
  })

  return trainNeuralNetwork(training, INTERACTION_TYPES)
}

function getLearningStyles(statements) {
  var trainings, results, input, style;
  var learningStylesGroups = Object.keys(LEARNING_STYLES)
  trainings = {}
  results = {}
  learningStylesGroups.forEach(function (group) {
    trainings[group] = []
  })

  statements.forEach(function (statement) {
    if (hasExtensions(statement)) {
      learningStylesGroups.forEach(function (group) {
        trainings[group] = []
        input = {}
        for (style in LEARNING_STYLES[group]) {
          input[style] = Number(!!statement.context.extensions[LEARNING_STYLES[group][style].id]);
        }

        trainings[group].push({
          input:  input,
          output: {
            success:    Number(statement.result.success),
            completion: Number(statement.result.completion)
          }
        })
      })
    }
  })

  learningStylesGroups.forEach(function (group) {
    results[group] = trainNeuralNetwork(trainings[group], Object.keys(LEARNING_STYLES[group]))
  })

  return results;
}

function hasExtensions(statement) {
  return (statement && statement.context && statement.context.extensions)
}

function hasInteractionType(statement) {
  return (statement && statement.definition && statement.definition.interactionType)
}

function trainNeuralNetwork(training, values) {
  var net, results, assert

  results =  {}
  neuralNetwork = new Brain.NeuralNetwork()

 try {
   neuralNetwork.train(training)

   values.forEach(function (value) {
     assert =        {}
     assert[value] =  1
     results[value] = neuralNetwork.run(assert)
   })

 } catch (err) {
   console.log(err)
   results = {}
 }

  return results
}

var StudentOperations = {
  getIntelligenceType: function(statements) {
    return statements ? getIntelligenceType(statements) : false
  },
  getInteractionType: function(statements) {
    return statements ? getInteractionType(statements) : false
  },
  getLearningStyles: function(statements) {
    return statements ? getLearningStyles(statements) : false
  }
}

module.exports = StudentOperations
