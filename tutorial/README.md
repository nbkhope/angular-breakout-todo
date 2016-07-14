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

We add the ng-app "attribute" (actually called an Angular directive) to the `<html>` tag to give control of our page to Angular. Essentially that makes the whole page an Angular app, whose name is given by whatever you defined in the attribute (in this case, we are called our app `todoList`). You only need to do this once for the whole application.

Then, in the `<head>`, we add some meta tags for responsiveness before `<title>` because I chose to use Bootstrap as the user interface framework. You are free to choose whatever framework you like or even not use one at all. Note we place the link to the Bootstrap CSS styles after the `<title>` tag.

For the `<body>`, we place all the necessary scripts at the bottom, right before the end of the body tag. Those scripts are, in order: jQuery, AngularJS, Angular UI Router, Bootstrap, and your custom script (`app.js`) that will hold the actual application code. I added jQuery and Bootstrap scripts there because they go together, although they are not necessary; you just need the script for Angular and the script for UI Router to build a simple Angular app. The [latter](https://github.com/angular-ui/ui-router) is an Angular module that is highly preferred over the built-in Angular router called `ngRoute`.

Between `<body>` and the scripts at the bottom, we have a div that will hold the main content of the app. We will be using only one main content view for this application. The page templates will all be rendered in the div whose attribute has the directive `ui-view`:

```
<div ui-view></div>
```

Note that we used CDN links for all the styles and external scripts. Feel free to download them locally if you prefer.
