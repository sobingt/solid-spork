angular.module('MyApp')
  .factory('Menu', function($resource) {
    return $resource('/api/menus/:_id');
  });
