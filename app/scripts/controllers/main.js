'use strict';

/**
 * @ngdoc function
 * @name whatamessengerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the whatamessengerApp
 */
angular.module('whatamessengerApp')
  .controller('MainCtrl', function ($state, $scope) {

  	$scope.roomInput = '';
  	$scope.goToRoom = function() {
	  if ($scope.roomInput) {
	  	$state.go('room', {roomKey: $scope.roomInput});
	  }
  	};
  });
