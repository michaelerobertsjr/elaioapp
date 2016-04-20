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
        'text': 'Dashboard',
        'href': 'dashboard.main',
        'name': 'dashboard'
      }, {
        'text': 'Statements',
        'href': 'dashboard.statements',
        'name': 'tasks'
      }, {
        'text': 'Students',
        'href': 'dashboard.students',
        'name': 'graduation-cap'
      }, {
        'text': 'Courses',
        'href': 'dashboard.courses',
        'name': 'book'
      }, {
        'text': 'Documentation',
        'href': 'dashboard.docs',
        'name': 'file-text-o'
      }, {
        'text': 'Profile',
        'href': 'dashboard.profile',
        'name': 'user'
      }
      ]
    }
  }
}
