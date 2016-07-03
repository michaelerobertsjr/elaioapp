/* Student Operations */

var
  Statement =         require('../models/Statement'),
  Brain =             require('brain');

const
  INTELLIGENCE_TYPES = require('../globals/intelligenceTypes'),
  INTERACTION_TYPES =  require('../globals/interactionTypes'),
  LEARNING_STYLES =    require('../globals/learningStyles'),
  VERBS =              require('../globals/verbs'),
  ASSERT_VALUE =       1
;

function getIntelligenceType(statements) {
  var training, results, input, type;

  training = []

  statements.forEach(function (statement) {
    if (hasExtensions(statement)) {
      input = {}

      for (type in INTELLIGENCE_TYPES) {
        input[type] = getBooleanIntellygenceTypeInput(statement, type);
      }

      training.push(getTrainingValue(statement, input));
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

      INTERACTION_TYPES.forEach(function (statement, type) {
        input[type] = getBooleanInteractionTypeInput(statement, type);
      })

      training.push(getTrainingValue(statement, input));
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
          input[style] = getBooleanLearningStyleInput(statement, group, style)
        }

        trainings[group].push(getTrainingValue(statement, input));
      })
    }
  })

  learningStylesGroups.forEach(function (group) {
    results[group] = trainNeuralNetwork(trainings[group], Object.keys(LEARNING_STYLES[group]))
  })

  return results;
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

/* Private */

function hasExtensions(statement) {
  return (statement && statement.context && statement.context.extensions)
}

function hasInteractionType(statement) {
  return (statement && statement.definition && statement.definition.interactionType)
}

function getBooleanIntellygenceTypeInput(statement, type) {
  return Number(!!statement.context.extensions[INTELLIGENCE_TYPES[type].id])
}

function getBooleanInteractionTypeInput(statement, type) {
  return Number(!!statement.definition.interactionType[type])
}

function getBooleanLearningStyleInput(statement, group, style) {
  return Number(!!statement.context.extensions[LEARNING_STYLES[group][style].id])
}

function getTrainingValue(statement, input) {
 return {
   input:  input,
   output: {
     success:    Number(statement.result.success),
     completion: Number(statement.result.completion)
   }
 }
}

function trainNeuralNetwork(training, values) {
  var net, results, assert

  results = {}
  neuralNetwork = new Brain.NeuralNetwork()

 try {
   neuralNetwork.train(training)

   values.forEach(function (value) {
     assert =        {}
     assert[value] =  ASSERT_VALUE
     results[value] = neuralNetwork.run(assert)
   })

 } catch (error) {
   results = {reason: error}
 }

  return results
}
