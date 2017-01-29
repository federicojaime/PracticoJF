angular.module('starter.controllers', ['ngCordova'])

<<<<<<< HEAD
    .controller('AppCtrl', function ($scope, $ionicModal, $timeout, $state) {
        $scope.toInicio = function () { //Redirecciona a la parte principal de la app. 
            $state.go('principal');
        }
=======
.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state) {
    $scope.toInicio = function() { //Redirecciona a la parte principal de la app. 
        $state.go('principal');
    }

    $scope.toFavoritos = function() { //Redirecciona al template de favoritos.
        $state.go('app.favoritos');
    }



})

.controller('favoritosCtrl', function($scope, $state) {
    $scope.buscar = false;
    $scope.buscador = function() {
        if ($scope.buscar == true) {
            $scope.buscar = false;
        } else {
            $scope.buscar = true;
        }
    }

})

.controller('mapa2', function($scope, $state) {
    $scope.posisionar = function() {
>>>>>>> f7b1760b99a6c07eb0d681fd3851ed5bf8ce4e89

        $scope.toContactanos = function () { //Redirecciona a la parte principal de la app. 
            $state.go('app.contactanos');
        }
        $scope.toMisPedidos = function () { //Redirecciona a la parte principal de la app. 
            $state.go('app.misPedidos');
        }


    })

    .controller('inicioPpalCtrl', function ($scope, $state) {
        $scope.toLista = function () { //Redirecciona a la parte principal de la app. 
            $state.go('app.listadoRestaurantes');
        }
    })

    .controller('loginCtrl', function ($scope, $state) {
        $scope.toPrincipal = function () { //Redirecciona a la parte principal de la app. 
            $state.go('principal');
        }

        $scope.toTerminosCondiciones = function () { //Redirecciona a la parte principal de la app. 
            $state.go('terminosCondiciones');
        }

        $scope.toRegistro = function () { //Redirecciona a la parte principal de la app. 
            $state.go('registro');
        }
    })

    .controller('terminosCondicionesCtrl', function ($scope, $state) {
        $scope.toLogin = function () { //Redirecciona a la parte principal de la app. 
            $state.go('login');
        }
    })

    .controller('registroCtrl', function ($scope, $state) { })

<<<<<<< HEAD
    .controller('misPedidosCtrl', function ($ionicPlatform, $state, $ionicHistory, $ionicPopup, $scope, $stateParams, $http, $ionicModal, $timeout) {
        $ionicHistory.clearHistory();
        $ionicPlatform.registerBackButtonAction(function (event) {
            if ($state.current.name == "app.misPedidos") {
                navigator.app.exitApp(); //<-- remove this line to disable the exit
            }
            else {
                navigator.app.backHistory();
            }
        }, 100);
        $scope.doRefresh = function () { // se activa cuando scrollea hacia abajo el usuario en la app.
            $scope.refrescar();
            $timeout(function () {
                $scope.$broadcast('scroll.refreshComplete');
            }, 1000);
        };

        $scope.refrescar = function () { //Actualiza las llamadas del templates.
            $scope.pedidos = [];
            $http.get("http://alaordenapp.com/alaorden/php/getpedidos.php?idcliente=85").success(function (dato) {
                $scope.pedidos = dato["datos"];
                if ($scope.pedidos.length > 0) {
                    $scope.hayPed = true;
                }
            });
        };
=======
.controller('listRestaurantesCtrl', function($scope, $state) {
    $scope.toMapa = function() {
        $state.go('mapa2');
    }
    $scope.buscar = false;
    $scope.buscador = function() {
        if ($scope.buscar == true) {
            $scope.buscar = false;
        } else {
            $scope.buscar = true;
        }
    }

})

.controller('IntroCtrl', function($scope, $state, $ionicSlideBoxDelegate) {
    // Called to navigate to the main app
    $scope.startApp = function() {
        $state.go('main');
    };
    $scope.next = function() {
        $ionicSlideBoxDelegate.next();
    };
    $scope.previous = function() {
        $ionicSlideBoxDelegate.previous();
    };
    // Called each time the slide changes
    $scope.slideChanged = function(index) {
        $scope.slideIndex = index;
        console.log($scope.slideIndex);
    };

    //↑ ↑ ↑  CODIGO PARA QUE FUNCIONE LOS SLIDE. 

    $scope.toPrincipal = function() { //Redirecciona a la parte principal de la app. 
        $state.go('login');
    }
})

.controller('mapaCtrl', function($scope, $state) {
    $scope.buscar = false;
    $scope.buscador = function() {
        if ($scope.buscar == true) {
            $scope.buscar = false;
        } else {
            $scope.buscar = true;
        }
    }
>>>>>>> f7b1760b99a6c07eb0d681fd3851ed5bf8ce4e89

        $scope.clientSideList = [
            { text: "El pedido nunca llegó a mi casa.", value: "2" },
            { text: "Llegó todo en orden como lo pedí.", value: "1" },
            { text: "La orden llegó pero tardo demasiado.", value: "3" },
        ];

        $scope.data = {
            clientSide: '0'
        };


        $scope.abriPedido = function (pedido) { //Abre la pantalla emergente de los pedidos.
            $scope.seleccion = pedido;
            $scope.modale.show();
        };

        $ionicModal.fromTemplateUrl('templates/Compra-confirmarPed.html', { //determina que hay una pagina modal, seria datos pedido.
            scope: $scope
        }).then(function (modal) {
            $scope.modale = modal;
        });


        $scope.time = function () { // timer, para que se actualice el template cada 3 minutos.
            stopped = $timeout(function () {
                $scope.refrescar();
                $scope.time();
            }, 100000);
        };

        $scope.hayPed = false; // si no llegase a haber un pedido, muestra un cartel. 

        $scope.pedidos = [];// Arreglo donde se van a setear todos los pedidos. 

        $http.get("http://alaordenapp.com/alaorden/php/getpedidos.php?idcliente=85").success(function (dato) { //devuelve los pedidos.
            $scope.pedidos = dato["datos"];
            if ($scope.pedidos.length > 0) {
                $scope.hayPed = true;
            }
            $scope.refrescar();
        });
        $scope.abrir = function (pedido) {
            $scope.seleccion = pedido;
        }
        $ionicModal.fromTemplateUrl('templates/Pedidos.html', { // determina el modal para mostrar el pedido.
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });
        $scope.confirmar = function (valor) {
            alert("Estoy");
            if (valor === 3) {
                valor = 1;
            }
            if (valor > 0) {
                $http.get("http://alaordenapp.com/alaorden/php/setconfirmacion.php?idpedido=" + $scope.seleccion.id + "&respuesta=" + valor).success(function (dato) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Muy bien',
                        template: '<center>Muchas gracias por confirmarnos.</center>'
                    });
                });
                document.location.href = 'file:///android_asset/www/index.html';
            }
            else {
                var alertPopup = $ionicPopup.alert({
                    title: 'Elige',
                    template: '<center>Debes elegir primero una opción.</center>'
                });
            }
        }
        $scope.refrescar();

    })

    .controller('contactanosCtrl', function ($scope, $state) { })

    .controller('listRestaurantesCtrl', function ($scope, $state, $http) {
        $scope.buscar = false;
        $scope.toMapa = function () {
            $state.go('mapa2');
        }

        $scope.buscador = function () {
            if ($scope.buscar == true) {
                $scope.buscar = false;
            } else {
                $scope.buscar = true;
            }
        }

        $scope.restaurantes = [
            { nombre: 'La Farola de Palermo', descripcion: 'Pizzas - Milanesas - Parrilla', tiempo: '60 min', precioDelivery: '$10', compraMinima: '$150', img: 'img/lafarola.jpg' },
            { nombre: 'Il Panino', descripcion: 'Barrolucos - Milanesas - Parrilla', tiempo: '20 min', precioDelivery: '$20', compraMinima: '$100', img: 'img/lafarola.jpg' },
            { nombre: 'Pizzas Juan', descripcion: 'Pizzas', tiempo: '20 min', precioDelivery: '$10', compraMinima: '$150', img: 'img/lafarola.jpg' },
            { nombre: 'ParriPizza', descripcion: 'Pizza - Parrilla', tiempo: '30 min', precioDelivery: '$15', compraMinima: '$350', img: 'img/lafarola.jpg' },
            { nombre: 'Empanadas Pepe', descripcion: 'Pizzas - Milanesas - Parrilla', tiempo: '90 min', precioDelivery: '$10', compraMinima: '$150', img: 'img/lafarola.jpg' },
            { nombre: 'Milanesas Jhon Jhon', descripcion: 'Pizzas - Milanesas - Sanguches', tiempo: '60 min', precioDelivery: '$10', compraMinima: '$150', img: 'img/lafarola.jpg' }
        ];
        $scope.estrella = []; //arreglo utilizado para generar el codigo. 
        $scope.estrellaVacias = [];
        $scope.rating = 3;
        if ($scope.rating > 0)
        { $scope.votos = "true"; }
        for (var i = 0; i < $scope.rating; i++) {
            $scope.estrella.push({});
        }
        while ($scope.estrella.length + $scope.estrellaVacias.length < 5) {
            $scope.estrellaVacias.push({});
        }
    })
<<<<<<< HEAD

    .controller('IntroCtrl', function ($scope, $state, $ionicSlideBoxDelegate) {
        // Called to navigate to the main app
        $scope.startApp = function () {
            $state.go('main');
        };
        $scope.next = function () {
            $ionicSlideBoxDelegate.next();
        };
        $scope.previous = function () {
            $ionicSlideBoxDelegate.previous();
        };
        // Called each time the slide changes
        $scope.slideChanged = function (index) {
            $scope.slideIndex = index;
            console.log($scope.slideIndex);
        };

        //↑ ↑ ↑  CODIGO PARA QUE FUNCIONE LOS SLIDE. 

        $scope.toPrincipal = function () { //Redirecciona a la parte principal de la app. 
            $state.go('login');
        }
    })

    .controller('MapCtrl', function ($timeout, $scope, $ionicLoading, $cordovaGeolocation, $compile, $ionicPopup, $http, $stateParams) {

        $scope.datamap = { //Datos del mapa a crear, el resto de los datos se encuentran en directives.js
            titulo: "Hola",
            centro: {
                lat: 50,
                lng: 2
            },
            localidad: $stateParams.localidad,
            zoom: 16,
            marcas: [
            ]
        };
    })
=======
*/

.controller('buscadorCtrl', function($scope, $state) {

})

.controller('MainCtrl', function($scope, $state) {
    console.log('MainCtrl');

    $scope.toIntro = function() {
        $state.go('intro');
    }
});
>>>>>>> f7b1760b99a6c07eb0d681fd3851ed5bf8ce4e89
