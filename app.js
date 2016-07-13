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
      ;
  })

  .controller('TodosCtrl', function() {
    var ctrl = this;

    ctrl.newTodo = {
      content: ""
    };

    ctrl.addTodo = function(todo) {
      ctrl.todos.push(todo);

      ctrl.newTodo = {
        content: ""
      };
    };

    ctrl.deleteTodo = function(todoId) {
      for (var index in ctrl.todos) {
        if (ctrl.todos[index].id === todoId) {
          ctrl.todos.splice(index, 1);
          return;
        }
      }
    };

    ctrl.getTodos = function() {
      ctrl.todos = [
        { id: 1, content: "Do the dishes", complete: false },
        { id: 2, content: "Clean my room", complete: true },
        { id: 3, content: "Walk the dog", complete: true },
        { id: 4, content: "Do the laundry", complete: false },
      ];
    };

    ctrl.getTodos();
  })
  ;
