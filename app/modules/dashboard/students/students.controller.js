import DashboardController from '../dashboard.controller'

let students, studentsService, studentsFactory

export default class StudentsController extends DashboardController {
  constructor($scope, StudentsService, StudentsFactory) {
    super()
    students = this
    studentsService = StudentsService
    studentsFactory = StudentsFactory
    students.intelligenceTypeChart = {}
  }

  findStudent() {
    studentsService.getIntelligenceType(students.email).then(function (results) {
      students.intelligenceTypeChart = studentsFactory.getIntelligenceTypeDataSet(results)
    })
  }
}

StudentsController.$inject = ['$scope', 'StudentsService', 'StudentsFactory']
