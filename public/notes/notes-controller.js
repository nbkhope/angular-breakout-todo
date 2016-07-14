angular.module('todoList')
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
  }]);
