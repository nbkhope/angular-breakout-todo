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
  ;
