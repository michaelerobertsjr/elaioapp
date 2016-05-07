import DashboardController from '../dashboard.controller'

let statements
let reader = new FileReader()

export default class StatementsController extends DashboardController {
  constructor ($scope, statementsService, UploadfileService) {
    super()
    statements = this

    statements.uploadFile = function () {
      var file = $scope.fileContent
      var saveStatements = '/api/statements/save'
      statements.content = file
      UploadfileService.uploadFileToURL(file, saveStatements)
    }

    $scope.$watch('fileContent', function (statementsFile) {
      if (statementsFile) {
        reader.readAsText(statementsFile)
        statements.statementsFileContent = reader.result
      }
    })
  }
}

StatementsController.$inject = ['$scope', 'StatementsService', 'UploadfileService']
