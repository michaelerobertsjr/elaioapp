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

export default class StudentFactory {
  constructor () {
    this.intelligenceType = intelligenceType
  }

  getIntelligenceTypeDataSet(results) {
    let data, datasets

    data =     []
    datasets = {}

    datasets.backgroundColor = 'rgba(127, 26, 228, 0.3)'
    datasets.label           = 'Intelligence Type'

    this.intelligenceType.forEach((type) =>
      data.push(results.intelligenceType[type].success * 100)
    )

    datasets.data = data

    return {
      labels:   intelligenceType,
      datasets: [datasets]
    }
  }
}
