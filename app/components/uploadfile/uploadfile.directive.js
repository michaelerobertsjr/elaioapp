export default function Uploadfile ($parse) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var model = $parse(attrs.uploadfile)
      var modelSetter = model.assign

      element.bind('change', function () {
        var reader = new FileReader();
        scope.$apply(function () {
          modelSetter(scope, element[0].files[0])
          fn(scope, {fileContent: onLoadEvent.target.result});
          reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
        })
      })
    }
  }
}

Uploadfile.$inject = ['$parse']
