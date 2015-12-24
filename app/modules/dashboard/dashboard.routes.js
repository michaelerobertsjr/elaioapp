routes.$inject = ['$stateProvider']

export default function routes ($stateProvider) {
  $stateProvider
    .state('dashboard', {
      url: '/dashboard/:username',
      templateUrl: '.modules/dashboard/dashboard.html',
      controller: 'DashboardController',
      controllerAs: 'dashboard',
      transclude: true
    })
}