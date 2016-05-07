import angular from 'angular'

let HTTP = null
let q = null
let reader = new FileReader()

export default class UploadfileService {
  constructor ($http, $q) {
    HTTP = $http
    q = $q
  }

  uploadFileToURL (file, uploadUrl) {
    var deferred = q.defer()
    var formData = new FormData()

    formData.append('file', file)

    // TODO:
    // HTTP.post(uploadUrl, formData, {
    //   transformRequest: angular.identity,
    //   headers: {'Content-Type': undefined}
    // })
    // .success(function () {
    // })
    // .error(function () {
    // })

    return deferred.promise
  }
}

UploadfileService.$inject = ['$http', '$q']
