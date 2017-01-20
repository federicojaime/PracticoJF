// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ionic.cloud', 'starter.controllers'])

.config(function($ionicCloudProvider) {
    $ionicCloudProvider.init({
        "core": {
            "app_id": "d5f187ac"
        },
        "auth": {
            "facebook": {
                "scope": ["permission1", "permission2"]
            }
        }
    });
})

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('intro', {
            url: '/',
            templateUrl: 'templates/intro.html',
            controller: 'IntroCtrl'
        })
        .state('main', {
            url: '/main',
            templateUrl: 'templates/main.html',
            controller: 'MainCtrl'
        })

    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.principal', { //Pantalla inicio, donde aparecen los restaurantes. 
        url: '/principal',
        views: {
            'menuContent': {
                templateUrl: 'templates/inicio-principal.html',
                controller: 'PlaylistsCtrl'
            }
        }
    })

    $urlRouterProvider.otherwise("/"); // Determina en que templates va a empezar la app. 

})