routes.$inject = ['$stateProvider']

export default function routes ($stateProvider) {
  $stateProvider
    .state('landing', {
      url: '/',
      template: require('./landing.html'),
      controller: 'LandingController',
      controllerAs: 'landing',
      transclude: true
    })
}
