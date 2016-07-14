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
  ;
