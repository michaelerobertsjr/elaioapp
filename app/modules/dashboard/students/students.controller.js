import DashboardController from '../dashboard.controller'

let students, studentsService, studentsFactory

export default class StudentsController extends DashboardController {
  constructor($scope, StudentsService, StudentsFactory) {
    super()
    students = this
    studentsService = StudentsService
    studentsFactory = StudentsFactory
    students.intelligenceTypeChart = {}
    students.learningStyleChart =    {}
    students.interactionTypeChart =  {}
  }

  findStudent() {
    studentsService.getStudentInformation(students.email, 'intelligenceType').then(function (results) {
      students.intelligenceTypeChart = studentsFactory.getIntelligenceTypeDataSet(results)
    })
    studentsService.getStudentInformation(students.email, 'learningStyles').then(function (results) {
      students.learningStyleCharts = studentsFactory.getLearningStyleDataSet(results)
    })
  }
}

StudentsController.$inject = ['$scope', 'StudentsService', 'StudentsFactory']
