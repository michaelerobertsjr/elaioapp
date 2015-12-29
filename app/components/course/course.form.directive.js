export default function CourseForm ($uibModal) {
  return {
    restrict: 'EA',
    transclude: true,
    replace: true,
    template: ['<button ng-click="courseForm.open()" class="btn btn-primary"><ng-transclude></ng-transclude></button>'].join('\n'),
    controllerAs: 'courseForm',
    scope: {
    },
    controller: function () {
      var courseForm = this

      courseForm.open = function () {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: './components/course/course.form.html',
          // controller: 'ModalInstanceCtrl',
          size: 'md',
          resolve: {
            items: function () {
              return []
            }
          }
        })

        modalInstance.result.then(function (selectedItem) {})
      }
    }
  }
}

CourseForm.$inject = ['$uibModal']
