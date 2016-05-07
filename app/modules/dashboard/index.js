import angular from 'angular'
import uirouter from 'angular-ui-router'
import angularbootstrap from 'angular-bootstrap'

import routing from './dashboard.routes'
import DashboardController from './dashboard.controller'
import CoursesController from './courses/courses.controller'
import CoursesService from './courses/courses.service'
import StatementsController from './statements/statements.controller'
import StatementsService from './statements/statements.service'

import CourseFormDirective from '../../components/course/course.form.directive'
import CourseFormController from '../../components/course/course.form.controller'
import UploadFileDirective from '../../components/uploadFile/uploadfile.directive'
import UploadfileService from '../../components/uploadFile/uploadfile.service'

export default angular.module('app.dashboard', [uirouter, angularbootstrap])
  .config(routing)
  .controller('DashboardController', DashboardController)
  .controller('CoursesController', CoursesController)
  .controller('StatementsController', StatementsController)
  .controller('CourseFormController', CourseFormController)
  .directive('courseForm', CourseFormDirective)
  .directive('uploadFile', UploadFileDirective)
  .service('CoursesService', CoursesService)
  .service('StatementsService', StatementsService)
  .service('UploadfileService', UploadfileService)
  .name
