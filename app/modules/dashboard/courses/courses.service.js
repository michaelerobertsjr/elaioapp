let HTTP = null
let endpoint = null
let q = null
export default class CoursesService {
  constructor ($http, $q) {
    HTTP = $http
    q = $q

    endpoint = {
        courses: 'api/courses',
        saveCourse: 'api/course/save'
    }
  }

  getCourses () {
    let deferred = q.defer()
    HTTP.get(endpoint.courses).then(function (result) {
        deferred.resolve(result.data)
    })
    return deferred.promise
  }

  saveCourse (course) {
    let deferred = q.defer()
    HTTP.post(endpoint.saveCourse, {'course': course}).then(function (result) {
        console.log(result)
        deferred.resolve(result.data)
    })
    return deferred.promise
  }

}

CoursesService.$inject = ['$http', '$q']