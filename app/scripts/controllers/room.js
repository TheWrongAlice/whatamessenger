'use strict';

/**
 * @ngdoc function
 * @name whatamessengerApp.controller:RoomCtrl
 * @description
 * # RoomCtrl
 * Controller of the whatamessengerApp
 */
angular.module('whatamessengerApp')
  .controller('RoomCtrl', function ($scope, messages) {
    $scope.messages = messages;
  });
