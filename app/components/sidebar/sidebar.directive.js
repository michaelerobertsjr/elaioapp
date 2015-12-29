export default function Sidebar () {
  return {
    restrict: 'E',
    templateUrl: './components/sidebar/sidebar.html',
    controllerAs: 'sidebar',
    scope: {
      target: '@',
      toggle: '@',
      title: '@',
      main: '@'
    },
    controller: function () {
      this.logo = '../assets/images/elaio.png'
      this.links = [{
        'text': 'Principal',
        'href': 'dashboard.main',
        'name': 'dashboard'
      }, {
        'text': 'Cursos',
        'href': 'dashboard.courses',
        'name': 'tasks'
      }, {
        'text': 'Certificados',
        'href': '#',
        'name': 'file-text-o'
      }, {
        'text': 'Perfil',
        'href': 'dashboard.profile',
        'name': 'user'
      }
      ]
    }
  }
}
