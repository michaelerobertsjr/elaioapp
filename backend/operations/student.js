/* Student Operations */

var Statement = require('../models/Statement')
var Brain =     require('brain')
var url =       'http://www.elaio.com/intelligenceType/'

const intelligenceType = [
  "bodylyKinesthetic",
  "interpersonal",
  "intrapersonal",
  "linguistic",
  "logicalMathematical",
  "musical",
  "naturalist",
  "spatial"
]

function calcIntelligenceType(statements) {
  var training, results, input, type;

  training = []

  statements.forEach(function (statement) {
    if (statement.context.extensions.intelligenceType) {
      input = {}

      intelligenceType.forEach(function (type) {
        input[type] = Number(statement.context.extensions.intelligenceType === (url + type))
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

  return trainIntelligenceType(training)
}

function trainIntelligenceType(training) {
  var training, net, results, assert, type

  results =  {}
  net =      new Brain.NeuralNetwork()

  net.train(training)

  intelligenceType.forEach(function (type) {
    assert =        {}
    assert[type] =  1
    results[type] = net.run(assert)
  })

  return results
}

var StudentOperations = {

  getIntelligenceType: function(statements) {
    return statements ? calcIntelligenceType(statements) : false
  }
}

module.exports = StudentOperations
