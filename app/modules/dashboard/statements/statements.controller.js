import DashboardController from '../dashboard.controller'

let statements
let reader = new FileReader()

export default class StatementsController extends DashboardController {
  constructor ($scope, statementsService, UploadfileService) {
    super()
    statements = this

    statements.uploadFile = function (fileContent) {
      var file = $scope.statementsFile
      var saveStatements = '/api/statements/save'
      statements.content = fileContent
      UploadfileService.uploadFileToURL(file, saveStatements)
    }

    $scope.$watch('statementsFile', function (statementsFile) {
      if (statementsFile) {
        reader.readAsText(statementsFile)
        console.log(reader)
        console.log(reader.result)
        statements.statementsFileContent = reader.result
      }
    })

    statements.saveStatements = function () {

    }
  }
}

StatementsController.$inject = ['$scope', 'StatementsService', 'UploadfileService']
