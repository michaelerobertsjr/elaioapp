import angular from 'angular'
import uirouter from 'angular-ui-router'
import config from './app.config'

import landing from './modules/landing'
import dashboard from './modules/dashboard'
const modules = [uirouter, landing, dashboard]

import FooterMenu from './components/footer/footer.directive'

angular.module('app', modules).config(config)
.directive('footerMenu', FooterMenu)
