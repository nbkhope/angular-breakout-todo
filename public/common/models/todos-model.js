angular.module('todoList')
.service('TodosModel', ['$http', 'ENDPOINT_URI', function($http, ENDPOINT_URI) {
  var service = this;

  service.all = function() {
    return $http.get(ENDPOINT_URI + "todos");
  };

  service.fetch = function(todoId) {
    return $http.get(ENDPOINT_URI + "todos/" + todoId);
  };

  service.create = function(todo) {
    return $http.post(ENDPOINT_URI + "todos", todo);
  };

  service.update = function(todoId, todo) {
    return $http.put(ENDPOINT_URI + "todos/" + todoId, todo);
  };

  service.destroy = function(todoId) {
    return $http.delete(ENDPOINT_URI + "todos/" + todoId);
  };

}]);
