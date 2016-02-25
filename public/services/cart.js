angular.module('MyApp')
  .factory('Cart', function($resource) {
    return $resource('/api/cart/:_id');
  });
