import angular from 'angular'
import uirouter from 'angular-ui-router'
import angularbootstrap from 'angular-bootstrap'

import routing from './dashboard.routes'
import DashboardController from './dashboard.controller'
import CoursesController from './courses/courses.controller'
import CoursesService from './courses/courses.service'

import CourseFormDirective from '../../components/course/course.form.directive'

export default angular.module('app.dashboard', [uirouter, angularbootstrap])
  .config(routing)
  .controller('DashboardController', DashboardController)
  .controller('CoursesController', CoursesController)
  .directive('courseForm', CourseFormDirective)
  .service('CoursesService', CoursesService)
  .name
