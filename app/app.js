import 'bootstrap/dist/css/bootstrap.css'
import angular from 'angular'
import uirouter from 'angular-ui-router'
import config from './app.config'
import landing from './modules/landing'

const modules = [uirouter, landing]

angular.module('app', modules).config(config)
