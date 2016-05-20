import angular from 'angular'
import uirouter from 'angular-ui-router'
import angularbootstrap from 'angular-bootstrap'
import config from './app.config'

import landing from './modules/landing'
import dashboard from './modules/dashboard'

const modules = [uirouter, angularbootstrap, landing, dashboard]

import FooterMenuDirective from './components/footer/footer.directive'
import SidebarDirective from './components/sidebar/sidebar.directive'
import IconDirective from './components/icon/icon.directive'
import AuthService from './components/general/auth.service'

angular.module('app', modules).config(config)
  .directive('footerMenu', FooterMenuDirective)
  .directive('icon', IconDirective)
  .directive('sidebar', SidebarDirective)
  .service('AuthService', AuthService)
