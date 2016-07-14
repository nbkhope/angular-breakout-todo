angular.module('todoList', ['ui.router'])

  // Define the URL that will be used to hit the backend API
  .constant('ENDPOINT_URI', 'http://localhost:3000/')

  .config(function($stateProvider, $urlRouterProvider) {
    // The default route if request does not match any of the specific routes below
    $urlRouterProvider.otherwise('/todos');

    // Specify all the routes (called states) here
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
