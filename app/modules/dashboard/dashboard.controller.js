export default class DashboardController {
  constructor () {
    this.name = 'Dashboard'
    this.logo = '../../assets/images/elaio.png'
    this.links = [{
    		'text' : 'Perfil',
    		'href' : 'dashboard.profile',
    		'name' : 'user'
    	},{
    		'text' : 'Cursando',
    		'href' : '#',
    		'name' : 'tasks'
    	},{
    		'text' : 'Certificados',
    		'href' : '#',
    		'name' : 'file-text-o'
    	}
    ]
  }

  	toggleSidebar () {
		$('#wrapper').toggleClass('toggled');
	}
}