import DashboardController from '../dashboard.controller'

let statements, reader, content

export default class StatementsController extends DashboardController {
  constructor ($scope, statementsService, UploadfileService) {
    super()
    statements = this
    reader = new FileReader()

    reader.onload = function(){
      statements.fileContent = JSON.stringify(JSON.parse(reader.result), null, 2);
    }

    statements.uploadFile = function () {
      statementsService.saveStatement(content)
    }

    $scope.$watch('fileContent', function (statement) {
      if (statement) {
        reader.readAsText(statement)
        content = JSON.parse(reader.result)
      }
    })
  }
}

StatementsController.$inject = ['$scope', 'StatementsService', 'UploadfileService']
