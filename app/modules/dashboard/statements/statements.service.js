let HTTP = null
let endpoint = null
let q = null
export default class StatementsService {
  constructor ($http, $q) {
    HTTP = $http
    q = $q

    endpoint = {
      'statements': 'api/statements',
      'saveStatement': 'api/statement/save',
      'saveManyStatements': 'api/statements/save'
    }
  }

  getStatements () {
    let deferred = q.defer()
    HTTP.get(endpoint.statements).then(function (result) {
      deferred.resolve(result.data)
    })
    return deferred.promise
  }

  saveStatement (statement) {
    let deferred = q.defer()
    HTTP.post(endpoint.saveStatement, {'statement': statement}).then(function (result) {
      deferred.resolve(result.data)
    })
    return deferred.promise
  }

  saveManyStatements (statements) {
    let deferred = q.defer()
    HTTP.post(endpoint.saveManyStatement, {'statements': statements}).then(function (result) {
      deferred.resolve(result.data)
    })
    return deferred.promise
  }
}

StatementsService.$inject = ['$http', '$q']
