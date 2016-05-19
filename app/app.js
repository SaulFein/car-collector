'use strict';

require('angular')
require('angular-route')

var app = angular.module('app',['ngRoute'])

require('./services/auth_service')(app);
require('./services/error_service')(app);
// require('./controllers/question-controller.js')(app)
require('./controllers/user-controller.js')(app)

app.config(['$routeProvider', function(router) {
  router
    .when('/', {
      templateUrl: 'templates/home.html'
    })
    // .when('/home', {
    //   // controller: 'UserController',
    //   // controllerAs: 'userctrl',
    //   templateUrl: 'templates/home.html'
    // })
    .when('/login', {
      // controller: 'UserController',
      // controllerAs: 'userctrl',
      templateUrl: 'templates/login.html'
    })  
    .when('/submit', {
      // controller: 'QuestionController',
      // controllerAs: 'questionCtrl',
      templateUrl: 'templates/submit.html'
    })
    .when('/profile', {
      // controller: 'QuestionController',
      // controllerAs: 'questionCtrl',
      templateUrl: 'templates/profile.html'
    })
}])