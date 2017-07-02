'use strict';

/**
 * @ngdoc service
 * @name whatamessengerApp.api
 * @description
 * # api
 * Factory in the whatamessengerApp.
 */
angular.module('whatamessengerApp')
  .factory('api', function ($log, $http) {
    // Service logic

    var apiServer = 'https://bw5hyt19i6.execute-api.us-east-1.amazonaws.com/prod';

    /**
     * Wrapper functon for Angular's $http - For convenience, controls default options
     *
     * @param {object} opts Options for the $http call - see https://docs.angularjs.org/api/ng/service/$http
     */
    function makeRequest(opts) {

      // Make sure we have everything we need
      var requiredOpts = ['url', 'method'];
      for (var i = 0; i < requiredOpts.length; i++) {
        if (!opts[requiredOpts[i]]) {
          $log.error(requiredOpts[i], 'not provided to soHttp', opts);
          return false;
        }
      }

      // Set some default options
      opts.withCredentials = opts.withCredentials || false;
      opts.headers = opts.headers || {'Content-Type': 'application/json'}; // TODO: Should not overwrite entire object
      opts.params = opts.params || {};
      opts.data = opts.data || {};
      opts.timeout = opts.timeout || 0;
      opts.process = opts.process || function(data) {
          return data;
        };

      // Make http call
      return $http({
        url: opts.url,
        method: opts.method,
        withCredentials: opts.withCredentials,
        headers: opts.headers,
        params: opts.params,
        data: opts.data,
        timeout: opts.timeout
      }).then(
        function(response) {
          var data = opts.process(response.data);
          data._success = true;
          return data;
        },
        function(response) {
          if (response.status === 0) {
            $log.error('Call to', opts.url, 'timed out');
          }
          else if (response.status === 404 && opts.invoke404 === true) {
            //$state.go('404');
            $log.error('404 on api call');
          }
          else {
            var data = opts.process(response.data);
            data._success = false;
            return data;
          }
        }
      );
    }

    // Public API here
    return {
      getMessages: function () {
        return makeRequest({
          url: apiServer + '/messages',
          method: 'GET'
        });
      }
    };
  });
