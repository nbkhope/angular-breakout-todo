angular.module('todoList')
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
      console.log("updateTodo!")
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
  }]);
