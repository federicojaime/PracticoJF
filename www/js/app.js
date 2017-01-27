// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.directives'])

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

    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('principal', { //Pantalla inicio, donde aparecen la ruleta con las opciones. 
        url: '/principal',
        templateUrl: 'templates/inicio-principal.html',
        controller: 'inicioPpalCtrl'
    })

    .state('login', { //Pantalla login. 
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
    })

    .state('registro', { // Pantalla de Registro de nuevo usuario.
        url: '/registro',
        templateUrl: 'templates/registro.html',
        controller: 'registroCtrl'
    })

    .state('terminosCondiciones', { //Pantalla login. 
        url: '/terminosCondiciones',
        templateUrl: 'templates/terminosCondiciones.html',
        controller: 'terminosCondicionesCtrl'
    })

    .state('app.listadoRestaurantes', { //Pantalla inicio, donde aparecen los restaurantes. 
        url: '/listadoRestaurantes',
        views: {
            'menuContent': {
                templateUrl: 'templates/inicio-listadoRestaurantes.html',
                controller: 'listRestaurantesCtrl'
            }
        }
    })

    .state('app.mapa', {
        url: '/mapa',
        views: {
            'menuContent': {
                templateUrl: 'templates/mapa.html',
                controller: 'mapaCtrl'
            }
        }
    })

    .state('mapa2', {
        url: '/mapa2',
        templateUrl: 'templates/mapa2.html',
        controller: 'MapCtrl'
    })

    $urlRouterProvider.otherwise("/"); // Determina en que templates va a empezar la app. 

})