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

    ctrl.getTodos = function() {
      ctrl.todos = [
        { content: "Do the dishes", complete: false },
        { content: "Clean my room", complete: true },
        { content: "Walk the dog", complete: true },
        { content: "Do the laundry", complete: false },
      ];
    };

    ctrl.getTodos();
  })
  ;
