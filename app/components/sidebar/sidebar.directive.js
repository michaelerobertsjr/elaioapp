export default function Sidebar () {
  return {
    restrict: 'E',
    templateUrl: './components/sidebar/sidebar.html',
    controllerAs: 'sidebar',
    scope: {
      target: '@',
      toggle: '@',
      title: '@',
      main: '@',
      links: '='
    },
    controller: function () {
      this.logo = '../assets/images/elaio.png'
    }
  }
}
