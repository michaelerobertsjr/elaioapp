const INTELLIGENCE_TYPES = require('../../../globals/intelligenceTypes')
const LEARNING_STYLES =    require('../../../globals/learningStyles')

export default class StudentFactory {
  constructor () {
    this.intelligenceTypes = Object.keys(INTELLIGENCE_TYPES)
    this.learningStyles =    Object.keys(LEARNING_STYLES)
  }

  getIntelligenceTypeDataSet(results) {
    let data, datasets

    data =     []
    datasets = {}

    datasets.backgroundColor = 'rgba(127, 26, 228, 0.3)'
    datasets.label           = 'Intelligence Type'

    this.intelligenceTypes.forEach((type) =>
      data.push(results.intelligenceType[type].success * 100)
    )

    datasets.data = data

    return {
      labels:   this.intelligenceTypes,
      datasets: [datasets]
    }
  }

  getLearningStyleDataSet(results) {
    let data, datasets, learningStylesResults;

    learningStylesResults = {}

    this.learningStyles.forEach(function (learningStyle) {
      data = []
      datasets = {}
      Object.keys(LEARNING_STYLES[learningStyle]).forEach(function (style) {
        datasets.label           = learningStyle
        data.push(results.learningStyles[learningStyle][style].success * 100)
      });

      datasets.data = data;
      learningStylesResults[learningStyle] = {
        labels:   Object.keys(LEARNING_STYLES[learningStyle]),
        datasets: [datasets]
      }
    })

    return learningStylesResults;
  }
}
