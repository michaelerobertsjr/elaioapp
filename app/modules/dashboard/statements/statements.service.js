let HTTP = null
let endpoint = null
let q = null
let authService, params

export default class StatementsService {

  constructor ($http, $q, AuthService) {
    HTTP = $http
    q = $q
    authService = AuthService

    endpoint = {
      'statements': 'api/statements',
      'saveStatement': 'api/statement/save',
      'saveManyStatements': 'api/statements/save'
    }

    params = {
      apikey: ''
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
    authService.getCurrentUser().then(function (currentUser) {
      params.apikey = currentUser.apikey
      HTTP.post(endpoint.saveStatement, {statement: statement}, {params: params}).then(function (result) {
        deferred.resolve(result.data)
      })
    })
    return deferred.promise
  }

  saveManyStatements (statements) {
    let deferred = q.defer()
    HTTP.post(endpoint.saveManyStatement, {statements: statements}).then(function (result) {
      deferred.resolve(result.data)
    })
    return deferred.promise
  }
}

StatementsService.$inject = ['$http', '$q', 'AuthService']
