export default function CourseForm (CoursesService, $uibModal) {
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
      var modalInstance = null

      courseForm.open = function () {
        modalInstance = $uibModal.open({
          animation: true,
          templateUrl: './components/course/course.form.html',
          controller: 'CourseFormController',
          controllerAs: 'courseForm',
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

CourseForm.$inject = ['CoursesService', '$uibModal']
