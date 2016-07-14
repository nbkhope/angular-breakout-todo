# Tutorial: Making a Todo List with Angular 1.5

![demo app](images/todolist.png)

## Requirements

You are going to need:
* A browser with Developer Tools (such as Chrome)
* A text editor of your choice (e.g. Atom, Sublime)
* Node

## Specifications

We are going to make a todo list web app using **AngularJS**. We will focus solely on the **frontend** and assume there is already a backend running that serves all the information via JSON.

A `todo` has the following structure:

|field|meaning|
|---|---|
|id|a unique number to identify the todo|
|content|the title of the todo|
|complete |whether the todo has been completed (true/false)|
|description|further description or notes about the todo|

Here is an example of a todo in JSON format:

```
{
  "id": 2,
  "content": "Clean my room",
  "complete": true,
  "description": "My room has been a real mess these days."
}
```

We are going to write an app that performs all the CRUD operations on the collection of todos.

## Single-Page Application

The goal here is to build a single-page application app that is completely decoupled from the backend. That is, we are going to use a frontend JavaScript framework that will run by itself, separate from the backend. The backend will just be a JSON API that serves information upon request. To simulate that backend, we will be using a fake JSON server. More on that later.

## Setting up the Initial Structure

Let us get started by creating some directories and some plain files.

```
mkdir json
touch json/db.json

mkdir public/
touch public/index.html public/app.js
```

The above will create a `json/` directory with a `db.json` file inside. That will be used for our fake backend. Place the following contents inside db.json:

```
{
  "todos": [
    { "id": 1, "content": "Do the dishes", "complete": false, "description": "" },
    { "id": 2, "content": "Clean my room", "complete": true, "description": "My room has been a real mess these days. I have to get myself to do some cleaning." },
    { "id": 3, "content": "Walk the dog", "complete": true, "description": "" },
    { "id": 4, "content": "Do the laundry", "complete": false, "description": "There are about 5 piles of laundry to do. I have been putting it off for too long. C'mon, let's do it! Just get yourself moving! I gotta do it... I really have to do it." }
  ]
}
```

The `public/` directory will be used to store the files for the app itself. Inside `public/`, you will have `index.html`, the entry point for your application, and `app.js`, where we will set up our Angular application. To get started on the HTML, add the following to `index.html`:

```
<!DOCTYPE html>
<html ng-app="todoList">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Angular Breakout: Todo List</title>

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">
  </head>
  <body>

    <div class="container">
      <div ui-view></div>
    </div>

    <!-- jQuery -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
    <!-- AngularJS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.7/angular.min.js"></script>
    <!-- Angular UI Router -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.3.1/angular-ui-router.min.js"></script>
    <!-- Bootstrap JS -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
    <!-- Custom Scripts -->
    <script src="app.js"></script>
  </body>
</html>
```

Let's break down what is going on in the index file.

We add the **ng-app** "attribute" (actually called an Angular directive) to the `<html>` tag to give control of our page to Angular. Essentially that makes the whole page an Angular app, whose name is given by whatever you defined in the attribute (in this case, we are calling our app `todoList`). You only need to do this once for the whole application.

Then, in the `<head>`, we add some meta tags for responsiveness before `<title>` because I chose to use Bootstrap as the user interface framework. You are free to choose whatever framework you like or even not use one at all. Note we place the link to the Bootstrap CSS styles after the `<title>` tag.

For the `<body>`, we place all the necessary scripts at the bottom, right before the end of the body tag. Those scripts are, in order: jQuery, AngularJS, Angular UI Router, Bootstrap, and your custom script (`app.js`) that will hold the actual application code. I added jQuery and Bootstrap scripts there because they go together, although they are not necessary; you just need the script for Angular and the script for UI Router to build a simple Angular app. The [latter](https://github.com/angular-ui/ui-router) is an Angular module that is highly preferred over the built-in Angular router called `ngRoute`.

Between `<body>` and the scripts at the bottom, we have a div that will hold the main content of the app. We will be using only one main content view for this application. The page templates will all be rendered in the div whose attribute has the directive `ui-view`:

```
<div ui-view></div>
```

Note that we used CDN links for all the styles and external scripts. Feel free to download them locally if you prefer.

## Defining the Initial App Script

Now let us write some code in `app.js` to define our Angular application in JavaScript. Add the following to `app.js`:

```javascript
angular.module('todoList', ['ui.router'])

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
      ;
  })
  ;
```

In the script above, we define a module to hold our todoList app. The first argument to `angular.module()` is the name of the app and the second argument is an array of all the dependencies or external modules you will be using. You should pass the array of dependencies (even if empty) the first time you call `angular.module()` to create a new module. Here we are just using one external module: `ui.router`.

After setting up the module, we chain the function call to the config() method to set up all the routes (called states) for UI Router. You will need two arguments for the callback provided to config: $stateProvider and $urlRouterProvider.

You use **$urlRouterProvider** to set up the default route if the user tries to go somewhere you have not defined a specific route. In this case, we want to point the user to `/todos` in case that happens. This is somewhat similar to defining a root route.

Then, you use **$stateProvider** to set up all the routes for the application. Each route is set up using the state() function, that takes as parameters first the name of the state and then an object with options for that specific state (aka route). The most basic parameters for a state would be **url** and **template** (or **templateUrl** if not an inline template).

Here we use `/todos` as the URL and `todos/todos.tmpl.html` as the template file (which we will be creating later). You can also add a **controller** to the specific route. In this case, we will be creating a `TodosCtrl` later and using it for this route. Using the `controllerAs` property allows you to refer to the controller by an alias. I chose "ctrl" to be short and clear. Otherwise, you would have to type TodosCtrl every time you wanted to access a property stored in the controller.

## Making the Todos Template

Now that we have our first route in place, let us make the template for that route. Create a directory named `todos` within the `public/` directory and create the todos.tmpl.html file:

```
mkdir public/todos
touch public/todos/todos.tmpl.html
```

You could named your template whatever you want, I just chose `.tmpl.html` as my convention for template filename extensions. Inside that file, type in something arbitrary just as a placeholder for now:

```
<h1>This is the todos.tmpl.html template</h1>
```

## Getting the System Up and Running

Now with our first template in place and the states (aka routes) all set up, let us power up our app and see what it looks like. For that, we will be using a Node module called **serve** to start a simple frontend server. You can install it using:

```
npm install -g serve
```

Then, run the server from the app root directory using:

```
serve -p 9000 public/
```

You can access your web application at http://localhost:9000/
