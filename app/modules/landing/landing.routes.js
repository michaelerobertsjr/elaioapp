routes.$inject = ['$stateProvider']

export default function routes ($stateProvider) {
  $stateProvider
    .state('landing', {
      url: '/',
      templateUrl: './modules/landing/landing.html',
      controller: 'LandingController',
      controllerAs: 'landing',
      transclude: true
    })
}
