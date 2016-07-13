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

    ctrl.getTodo($stateParams.id);
  }])
  .service('TodosModel', function() {
    var service = this;

    // Fake Data
    var todos = [
      { id: 1, content: "Do the dishes", complete: false },
      { id: 2, content: "Clean my room", complete: true },
      { id: 3, content: "Walk the dog", complete: true },
      { id: 4, content: "Do the laundry", complete: false },
    ];

    service.all = function() {
      return todos;
    };

    service.fetch = function(todoId) {
      return todos.filter(function(item) { return item.id == todoId })[0];
    };

    service.create = function(todo) {
      todo.id = todos[todos.length - 1].id + 1;
      todo.complete = false;

      todos.push(todo);
    };

    service.update = function(todo) {
      for (var index in todos) {
        if (todos[index].id === todo.id) {
          todos[index] = todo;
          return;
        }
      };
    };

    service.destroy = function(todoId) {
      for (var index in todos) {
        if (todos[index].id === todoId) {
          todos.splice(index, 1);
          return;
        }
      }
    };

  })
  ;
