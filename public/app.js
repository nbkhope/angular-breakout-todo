angular.module('todoList', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/todos');

    $stateProvider
      .state('todos', {
        url: '/todos',
        templateUrl: 'todos.html',
        controller: 'TodosCtrl',
        controllerAs: 'ctrl',
      })
      .state('notes', {
        url: '/todos/:id/notes',
        templateUrl: 'notes.html',
        controller: 'NotesCtrl',
        controllerAs: 'ctrl',
      })
      ;
  })

  .constant('ENDPOINT_URI', 'http://localhost:3000/')

  .controller('TodosCtrl', ['TodosModel', function(TodosModel) {
    var ctrl = this;

    ctrl.newTodo = {
      content: ""
    };

    ctrl.addTodo = function(todo) {
      TodosModel.create(todo);
      ctrl.getTodos();

      ctrl.newTodo = {
        content: ""
      };
    };

    ctrl.updateTodo = function(todo) {
      TodosModel.update(todo);
      ctrl.getTodos();
    };

    ctrl.deleteTodo = function(todoId) {
      TodosModel.destroy(todoId);
      ctrl.getTodos();
    };

    ctrl.getTodos = function() {
      ctrl.todos = TodosModel.all();
    };

    ctrl.getTodos();
  }])

  .controller('NotesCtrl', ['$stateParams', '$state', 'TodosModel', function($stateParams, $state, TodosModel) {
    var ctrl = this;

    ctrl.getTodo = function(todoId) {
      ctrl.todo = TodosModel.fetch(todoId);
    }

    ctrl.deleteTodo = function(todoId) {
      TodosModel.destroy(todoId);
      $state.go('todos');
    };

    ctrl.updateDescription = function(todo) {
      ctrl.todo = TodosModel.update(todo);
    };

    ctrl.getTodo($stateParams.id);
  }])

  .service('TodosModel', ['$http', function($http) {
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

  }])
  ;
