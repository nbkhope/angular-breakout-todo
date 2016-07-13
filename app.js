angular.module('todoList', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/todos');

    $stateProvider
      .state('todos', function() {
        url: '/todos',
        templareUrl: 'todos.html',
      })
      ;
  });
