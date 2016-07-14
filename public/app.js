angular.module('todoList', ['ui.router'])

  .constant('ENDPOINT_URI', 'http://localhost:3000/')

  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/todos');

    $stateProvider
      .state('todos', {
        url: '/todos',
        templateUrl: 'todos/todos.tmpl.html',
        controller: 'TodosCtrl',
        controllerAs: 'ctrl',
      })
      .state('notes', {
        url: '/todos/:id/notes',
        templateUrl: 'notes/notes.tmpl.html',
        controller: 'NotesCtrl',
        controllerAs: 'ctrl',
      })
      ;
  })
  ;
