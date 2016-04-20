routes.$inject = ['$stateProvider', '$urlRouterProvider']

export default function routes ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: 'modules/dashboard/dashboard.html',
      controller: 'DashboardController',
      controllerAs: 'dashboard',
      bindToController: true,
      abstract: true
    })
    .state('dashboard.profile', {
      url: '/profile',
      templateUrl: 'modules/dashboard/profile/profile.html',
      controller: 'DashboardController',
      controllerAs: 'dashboard',
      bindToController: true,
      transclude: true
    })
    .state('dashboard.courses', {
      url: '/courses',
      templateUrl: 'modules/dashboard/courses/courses.html',
      controller: 'CoursesController',
      controllerAs: 'courses',
      bindToController: true,
      transclude: true
    })
    .state('dashboard.statements', {
      url: '/statements',
      templateUrl: 'modules/dashboard/statements/statements.html',
      controller: 'StatementsController',
      controllerAs: 'statements',
      bindToController: true,
      transclude: true
    })
    .state('dashboard.main', {
      url: '/main',
      templateUrl: 'modules/dashboard/main/main.html',
      controller: 'DashboardController',
      controllerAs: 'dashboard',
      bindToController: true,
      transclude: true
    })

  $urlRouterProvider.otherwise('/dashboard')
}
