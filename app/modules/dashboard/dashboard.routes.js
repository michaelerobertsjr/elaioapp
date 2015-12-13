routes.$inject = ['$stateProvider']

export default function routes ($stateProvider) {
  $stateProvider
    .state('dashboard', {
      url: '/dashboard/:username',
      template: require('./dashboard.html'),
      controller: 'DashboardController',
      controllerAs: 'dashboard',
      transclude: true
    })
}