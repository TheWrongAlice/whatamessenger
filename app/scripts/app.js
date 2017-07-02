'use strict';

/**
 * @ngdoc overview
 * @name whatamessengerApp
 * @description
 * # whatamessengerApp
 *
 * Main module of the application.
 */
angular
  .module('whatamessengerApp', [
    'ngSanitize',
    'ui.router'
  ])
  .config(function($stateProvider, $urlRouterProvider) {
    // Routing logic
    $urlRouterProvider

    // Set default state of the application
      .otherwise('/');

    // Register states
    $stateProvider

      // Main state
      .state('main', {
        url : '/',
        templateUrl: '/views/main.html',
        controller: 'MainCtrl'
      })

      // Room state
      .state('room', {
        url : '/{roomKey}',
        templateUrl: '/views/room.html',
        controller: 'RoomCtrl'
      });
  })
  .run(function($rootScope, $log, $state) {
    // Watch for state changes
    $rootScope.$on('$stateChangeStart', function(event, toState) {
      $log.debug('State change start:', toState.name);
      $rootScope.transitioning = true;
    });
    $rootScope.$on('$stateChangeSuccess', function (event, toState) {
      $log.debug('State change success:', toState.name);
      $rootScope.transitioning = false;
      window.scrollTo(0,0); // Reset scroll position
    });
    $rootScope.$on('$stateNotFound', function (event, toState, toParams, fromState, fromParams, error) {
      $log.error('State not found:', toState.name);
      $log.debug(event, toState, toParams, fromState, fromParams, error);
      $rootScope.transitioning = false;
      $state.go('public.404');
    });
    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
      $log.error('State change error:', error);
      $log.debug(event, toState, toParams, fromState, fromParams);
      $rootScope.transitioning = false;
      //$state.go('error');
    });
  });
