export default function UploadFile ($parse) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var model, modelSetter

      model = $parse(attrs.uploadFile)
      modelSetter = model.assign

      element.bind('change', function () {
        scope.$apply(function () {
          modelSetter(scope, element[0].files[0])
        })
      })
    }
  }
}

UploadFile.$inject = ['$parse']
