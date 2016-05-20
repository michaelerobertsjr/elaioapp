import DashboardController from '../dashboard.controller'
let currentUser = {}
let profile

export default class ProfileController extends DashboardController {
  constructor (AuthService) {
  	super()

    profile = this

    AuthService.getCurrentUser().then(function(currentUser) {
  		profile.currentUser = currentUser
  	})

  }

}

ProfileController.$inject = ['AuthService']
