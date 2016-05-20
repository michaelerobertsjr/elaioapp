let HTTP, q, endpoint, params, authService

export default class CoursesService {
  constructor ($http, $q, AuthService) {
    HTTP = $http
    q = $q
    authService = AuthService

    endpoint = {
        courses: 'api/courses',
        saveCourse: 'api/course/save'
    }

    params = {}
  }

  getCourses () {
    let deferred = q.defer()

    authService.getCurrentUser().then(function (currentUser) {
      params.apikey = currentUser.apikey
      HTTP.get(endpoint.courses, {params: params}).then(function (result) {
          deferred.resolve(result.data)
      })
    })

    return deferred.promise
  }

  saveCourse (course) {
    let deferred = q.defer()
    HTTP.post(endpoint.saveCourse, {'course': course}).then(function (result) {
        deferred.resolve(result.data)
    })
    return deferred.promise
  }

}

CoursesService.$inject = ['$http', '$q', 'AuthService']
