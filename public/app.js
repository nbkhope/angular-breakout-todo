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

    ctrl.getTodos = function() {
      TodosModel.all()
        .then(function(response) {
          ctrl.todos = response.data;
        })
        .catch(function(error) {
          console.log("Error loading todos:");
          console.log(error);
        })
        .finally(function() {
          console.log("Finished loading all todos :)");
        });
    };

    ctrl.addTodo = function(todo) {
      TodosModel.create(todo)
        .then(function(response) {
          // Update list of todos on the current view
          ctrl.getTodos();
        })
        .catch(function(error) {
          // handle error here
        })
        .finally(function() {
          ctrl.newTodo = {
            content: ""
          };
        });
    };

    ctrl.updateTodo = function(todo) {
      TodosModel.update(todo.id, todo)
        .then(function(response) {
          // Update list of todos on the current view
          ctrl.getTodos();
        });
    };

    ctrl.deleteTodo = function(todoId) {
      TodosModel.destroy(todoId)
        .then(function(response) {
          ctrl.getTodos();
        });
    };

    // Retrieve all the todos the first time the view is loaded
    ctrl.getTodos();
  }])

  .controller('NotesCtrl', ['$stateParams', '$state', 'TodosModel', function($stateParams, $state, TodosModel) {
    var ctrl = this;

    ctrl.getTodo = function(todoId) {
      TodosModel.fetch(todoId)
        .then(function(response) {
          ctrl.todo = response.data;
        });
    }

    ctrl.updateTodo = function(todo) {
      TodosModel.update(todo.id, todo)
        .then(function(response) {
          // do nothing
        })
        .catch(function(error) {
          console.log("Failed to update todo #" + todo.id);
        });
    };

    ctrl.deleteTodo = function(todoId) {
      TodosModel.destroy(todoId)
        .then(function(response) {
          // Go back to the list of todos after deleting this specific one
          // You can use $state.go to go to a specific state (aka route)
          // Besides this, using the attribute ui-sref in <a> tags also
          // does the same thing
          $state.go('todos');
        });
    };

    // Retrieve the todo item the first time the controller is loaded
    ctrl.getTodo($stateParams.id);
  }])

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

  }])
  ;
