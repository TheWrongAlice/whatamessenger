'use strict';

/**
 * @ngdoc function
 * @name whatamessengerApp.controller:RoomCtrl
 * @description
 * # RoomCtrl
 * Controller of the whatamessengerApp
 */
angular.module('whatamessengerApp')
  .controller('RoomCtrl', function ($scope, $state, $stateParams, $interval, api) {

    $scope.messages = [];
    $scope.messageInput = '';

    $scope.sendMessage = function() {
      $scope.sending = true;

      // Construct new message
      var newMessage = {
        roomKey: $stateParams.roomKey,
        message: angular.copy($scope.messageInput),
        color: '#ffffff'
      };

      // Append to displayed messages
      $scope.messages.push(newMessage);

      // Register with API
      api.sendMessage(newMessage).then(function() {
        $scope.sending = false;
        loadMessages(); // Refresh messages once registered
      });

      // Reset input
      $scope.messageInput = '';
    };

    // Function for refreshing room messages
    function loadMessages() {
      api.getMessages({roomKey: $stateParams.roomKey}).then(function(response) {
        if (!$scope.sending) {
          $scope.messages = response.messages;
        }
      });
    }

    // Refresh messages every second
    $interval(function() {
      loadMessages();
    }, 1000);
  });
