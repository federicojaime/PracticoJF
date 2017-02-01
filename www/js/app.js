// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.directives', 'starter.controllers', 'starter.services', 'ngCordova', 'ion-cool-profile'])

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

    .state('app.somos', { //Pantalla login. 
        url: '/somos',
        views: {
            'menuContent': {
                templateUrl: 'templates/somos.html',
                controller: 'somosCtrl'
            }
        }
    })

    .state('app.confirmacionPed', {
            url: '/datosPedido',
            views: {
                'menuContent': {
                    templateUrl: 'templates/Compra-DatosPedido.html',
                    controller: 'datosPedidoCtrl'
                }
            }
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


    .state('app.descr-carta', { //Pantalla inicio, donde aparecen los restaurantes. 
            url: '/descr-carta',
            views: {
                'menuContent': {
                    templateUrl: 'templates/descr-carta.html',
                    controller: 'descr-cartaCtrl'
                }
            }
        })
        .state('app.contactanos', { //Pantalla inicio, donde aparecen los restaurantes. 
            url: '/contactanos',
            views: {
                'menuContent': {
                    templateUrl: 'templates/admin-contactanos.html',
                    controller: 'contactanosCtrl'
                }
            }
        })

    .state('app.favoritos', {
        url: '/favoritos',
        views: {
            'menuContent': {
                templateUrl: 'templates/favoritos.html',
                controller: 'favoritosCtrl'
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
        .state('app.misPedidos', {
            url: '/misPedidos',
            views: {
                'menuContent': {
                    templateUrl: 'templates/misPedidos.html',
                    controller: 'misPedidosCtrl'
                }
            }
        })

    .state('mapa2', {
        url: '/mapa2',
        templateUrl: 'templates/mapa2.html',
        controller: 'MapCtrl'
    })

    .state('app.cambiarCdad', {
        url: '/cambiarCdad',
        views: {
            'menuContent': {
                templateUrl: 'templates/cambiarCdad.html',
                controller: 'cambiarCdadCtrl'
            }
        }
    })

    .state('terminosCondiciones', {
        url: 'terminosCondiciones',
        templateUrl: 'templates/terminosCondiciones.html',
        controller: 'terminosCondicionesCtrl'
    })

    .state('datosPedido', {
        url: 'datosPedido',
        templateUrl: 'templates/datosPedido.html',
        controller: 'datosPedidoCtrl'
    })

    $urlRouterProvider.otherwise("/"); // Determina en que templates va a empezar la app. 
})