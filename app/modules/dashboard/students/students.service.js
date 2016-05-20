let HTTP = null
let endpoint = null
let q = null
let authService, params

export default class StudentsService {

  constructor ($http, $q, AuthService) {
    HTTP = $http
    q = $q
    authService = AuthService

    endpoint = {
      'statements': 'api/students',
      'saveStudent': 'api/student/save',
      'findStudent': 'api/student/get',
      'intelligenceType' : 'api/student/intelligencetype'
    }

    params = {
      apikey: ''
    }
 }

 findStudent(email) {
   let deferred = q.defer()
   authService.getCurrentUser().then(function (currentUser) {
     params.apikey = currentUser.apikey
     params.email = email
     HTTP.get(endpoint.findStudent, {params: params}).then(function (result) {
       deferred.resolve(result.data[0])
     })
   })
   return deferred.promise
 }

 getIntelligenceType(email) {
   let deferred = q.defer()
   authService.getCurrentUser().then(function (currentUser) {
     params.apikey = currentUser.apikey
     params.mbox = email
     HTTP.get(endpoint.intelligenceType, {params: params}).then(function (result) {
       deferred.resolve(result.data)
     })
   })
   return deferred.promise
 }
}

StudentsService.$inject = ['$http', '$q', 'AuthService']
