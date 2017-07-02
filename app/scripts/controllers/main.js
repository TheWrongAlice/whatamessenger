'use strict';

/**
 * @ngdoc function
 * @name whatamessengerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the whatamessengerApp
 */
angular.module('whatamessengerApp')
  .controller('MainCtrl', function ($scope, $log, messages) {
    $scope.messages = messages;
  });
