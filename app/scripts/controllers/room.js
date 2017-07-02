'use strict';

/**
 * @ngdoc function
 * @name whatamessengerApp.controller:RoomCtrl
 * @description
 * # RoomCtrl
 * Controller of the whatamessengerApp
 */
angular.module('whatamessengerApp')
  .controller('RoomCtrl', function ($scope, $state, $stateParams, $interval, $cookies, api) {

    function getRandomColor() {
      var letters = '456789'.split('');
      var color = '#';
      for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * letters.length)];
      }
      return color;
    }

    var cookieColor = $cookies.get('myColor');
    if (cookieColor) {
      $scope.myColor = cookieColor;
    }
    else {
      $scope.myColor = getRandomColor();
      $cookies.put('myColor', $scope.myColor);
    }

    $scope.roomKey = $stateParams.roomKey;
    $scope.messages = [];
    $scope.messageInput = '';

    $scope.sendMessage = function() {
      $scope.sending = true;

      // Construct new message
      var newMessage = {
        roomKey: $stateParams.roomKey,
        message: angular.copy($scope.messageInput),
        color: $scope.myColor
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
    loadMessages();
    $interval(function() {
      loadMessages();
    }, 1000);
  });
