import angular from 'angular'

let HTTP = null
let q = null
let reader = new FileReader()

export default class UploadfileService {
  constructor ($http, $q) {
    HTTP = $http
    q = $q
  }

  uploadFileContent (content, uploadUrl) {
    var deferred = q.defer()

    HTTP.post(uploadUrl, content, {
      headers: {'Content-Type': "application/json"}
    })
    .success(function (message) {
      console.log('success')
    })
    .error(function (error) {
      console.log('error')
    })

    return deferred.promise
  }
}

UploadfileService.$inject = ['$http', '$q']
