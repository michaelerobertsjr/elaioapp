export default function UploadFile ($parse) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var model = $parse(attrs.uploadFile)
      var modelSetter = model.assign

      element.bind('change', function () {
        var reader = new FileReader();
        scope.$apply(function () {
          modelSetter(scope, element[0].files[0])
        })
      })
    }
  }
}

UploadFile.$inject = ['$parse']
