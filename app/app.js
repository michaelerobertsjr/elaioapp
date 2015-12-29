import angular from 'angular'
import uirouter from 'angular-ui-router'
import angularbootstrap from 'angular-bootstrap'
import config from './app.config'

import landing from './modules/landing'
import dashboard from './modules/dashboard'

const modules = [uirouter, angularbootstrap, landing, dashboard]

import FooterMenu from './components/footer/footer.directive'
import Sidebar from './components/sidebar/sidebar.directive'
import Icon from './components/icon/icon.directive'

angular.module('app', modules).config(config)
  .directive('footerMenu', FooterMenu)
  .directive('icon', Icon)
  .directive('sidebar', Sidebar)
