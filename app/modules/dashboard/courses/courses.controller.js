import DashboardController from '../dashboard.controller'
let courses = []
export default class CoursesController extends DashboardController {
  constructor (coursesService) {
  	super()
  	courses = this
  	coursesService.getCourses().then(function(data) {
  		courses.courses = data
  	})

  }

}

CoursesController.$inject = ['CoursesService']