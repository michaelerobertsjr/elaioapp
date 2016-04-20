let courseForm, uibModalInstance, coursesService
export default class CourseFormController {
  constructor ($uibModalInstance, CoursesService) {
  	courseForm = this
  	uibModalInstance = $uibModalInstance
  	coursesService = CoursesService
  }

  close () {
  	uibModalInstance.dismiss('cancel');
  }

  submit () {
  	if (courseForm.course) {
       coursesService.saveCourse(courseForm.course)
       uibModalInstance.close()
  	}
  }
}

CourseFormController.$inject = ['$uibModalInstance', 'CoursesService']