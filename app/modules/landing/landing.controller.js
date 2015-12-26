export default class LandingController {

  	constructor () {
    	this.name = 'Elaio'
    	this.logo = '../assets/images/elaio.png'
    	this.signup = false
  	}

	showSignupForm () {
		this.signup = !this.signup
	}
}