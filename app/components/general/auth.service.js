let HTTP = null
let endpoint = null
let q = null
var currentUser = null

export default class AuthService {

  constructor ($http, $q) {
    HTTP = $http
    q = $q

    currentUser = {}

    endpoint = {
      currentUser: '/user/current'
    }
  }

  getCurrentUser () {
    let deferred = q.defer()
    HTTP.get(endpoint.currentUser).then(function (result) {
      deferred.resolve(result.data)
    })
    return deferred.promise
  }
}

AuthService.$inject = ['$http', '$q']
