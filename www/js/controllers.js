angular.module('starter.controllers', ['ngCordova'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state) {

    $scope.toInicio = function() { //Redirecciona a la parte principal de la app. 
        $state.go('principal');
    }

    $scope.toFavoritos = function() { //Redirecciona al template de favoritos.
        $state.go('app.favoritos');
    }

    $scope.toContactanos = function() { //Redirecciona a la parte principal de la app. 
        $state.go('app.contactanos');
    }

    $scope.toMisPedidos = function() { //Redirecciona a misPedidos. 
        $state.go('app.misPedidos');
    }

    $scope.toCambiarCdad = function() { //Redirecciona al template de cambiarCdad
        $state.go('app.cambiarCdad');
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
    $scope.restaurantes = [
        { nombre: 'La Farola de Palermo', descripcion: 'Pizzas - Milanesas - Parrilla', tiempo: '60 min', precioDelivery: '$10', compraMinima: '$150', img: 'img/lafarola.jpg' },
        { nombre: 'Il Panino', descripcion: 'Barrolucos - Milanesas - Parrilla', tiempo: '20 min', precioDelivery: '$20', compraMinima: '$100', img: 'img/lafarola.jpg' },
        { nombre: 'Pizzas Juan', descripcion: 'Pizzas', tiempo: '20 min', precioDelivery: '$10', compraMinima: '$150', img: 'img/lafarola.jpg' },
    ];
    $scope.estrella = []; //arreglo utilizado para generar el codigo. 
    $scope.estrellaVacias = [];
    $scope.rating = 3;
    if ($scope.rating > 0) { $scope.votos = "true"; }
    for (var i = 0; i < $scope.rating; i++) {
        $scope.estrella.push({});
    }
    while ($scope.estrella.length + $scope.estrellaVacias.length < 5) {
        $scope.estrellaVacias.push({});
    }
    $scope.toSomos = function() { $state.go('somos'); }

})

.controller('inicioPpalCtrl', function($scope, $state) {
    $scope.toLista = function() { //Redirecciona a la parte principal de la app. 
        $state.go('app.listadoRestaurantes');
    }

    $scope.toDatosPedido = function() {
        $state.go('datosPedido')
    }
})

.controller('loginCtrl', function($scope, $state) {
    $scope.toPrincipal = function() { //Redirecciona a la parte principal de la app. 
        $state.go('principal');
    }

    $scope.toTerminosCondiciones = function() { //Redirecciona a la parte principal de la app. 
        $state.go('terminosCondiciones');
    }

    $scope.toRegistro = function() { //Redirecciona a la parte principal de la app. 
        $state.go('registro');
    }

})

.controller('terminosCondicionesCtrl', function($scope, $state) {
    $scope.toRegistro = function() { //Redirecciona a la parte principal de la app. 
        $state.go('registro');
    }
})

.controller('registroCtrl', function($scope, $state) {
    $scope.acepto = false;

    $scope.aceptarTerminos = function() {
        if ($scope.acepto == false) { $scope.acepto = true; } else { $scope.acepto = false; }
    }

    $scope.toLogin = function() {
        $state.go('login');
    }
})

.controller('cambiarCdadCtrl', function($scope, $state, $http) {
    $scope.provincias = [];
    for (var i = 0; i < 10; i++) {
        $scope.provincias[i] = {
            name: i,
            localidades: []
        };
        for (var j = 0; j < 3; j++) {
            $scope.provincias[i].localidades.push(i + '-' + j);
        }
    }
    /*
     * if given group is the selected group, deselect it
     * else, select the given group
     */
    $scope.toggleprovincias = function(provincias) {
        if ($scope.isprovinciashown(provincias)) {
            $scope.shownprovincias = null;
        } else {
            $scope.shownprovincias = provincias;

        }
    };
    $scope.isprovinciashown = function(provincias) {
        return $scope.shownprovincias === provincias;
    };

    $scope.toLocalidad = function(localidad) {

    }
    $scope.toSomos = function() { $state.go('somos'); }

})

.controller('misPedidosCtrl', function($ionicPlatform, $state, $ionicHistory, $ionicPopup, $scope, $stateParams, $http, $ionicModal, $timeout) {
    $scope.pedidos = []; // Arreglo donde se van a setear todos los pedidos. 
    $http.get("http://alaordenapp.com/alaorden/php/getpedidos.php?idcliente=85").success(function(dato) { //devuelve los pedidos.
        $scope.pedidos = dato["datos"];
        if ($scope.pedidos.length > 0) {
            $scope.hayPed = true;
        }
        $scope.refrescar();
    });
    $scope.doRefresh = function() { // se activa cuando scrollea hacia abajo el usuario en la app.
        $scope.refrescar();
        $timeout(function() {
            $scope.$broadcast('scroll.refreshComplete');
        }, 1000);
    };

    $scope.refrescar = function() { //Actualiza las llamadas del templates.
        $scope.pedidos = [];
        $http.get("http://alaordenapp.com/alaorden/php/getpedidos.php?idcliente=85").success(function(dato) {
            $scope.pedidos = dato["datos"];
            if ($scope.pedidos.length > 0) {
                $scope.hayPed = true;
            }
        });
    };

    $scope.clientSideList = [
        { text: "El pedido nunca llegó a mi casa.", value: "2" },
        { text: "Llegó todo en orden como lo pedí.", value: "1" },
        { text: "La orden llegó pero tardo demasiado.", value: "3" },
    ];

    $scope.data = {
        clientSide: '0'
    };


    $scope.abriPedido = function(pedido) { //Abre la pantalla emergente de los pedidos.
        $scope.seleccion = pedido;
        $scope.modale.show();
    };

    $ionicModal.fromTemplateUrl('templates/Compra-confirmarPed.html', { //determina que hay una pagina modal, seria datos pedido.
        scope: $scope
    }).then(function(modal) {
        $scope.modale = modal;
    });


    $scope.time = function() { // timer, para que se actualice el template cada 3 minutos.
        stopped = $timeout(function() {
            $scope.refrescar();
            $scope.time();
        }, 100000);
    };

    $scope.hayPed = false; // si no llegase a haber un pedido, muestra un cartel. 

    $scope.pedidos = []; // Arreglo donde se van a setear todos los pedidos. 

    $http.get("http://alaordenapp.com/alaorden/php/getpedidos.php?idcliente=85").success(function(dato) { //devuelve los pedidos.
        $scope.pedidos = dato["datos"];
        if ($scope.pedidos.length > 0) {
            $scope.hayPed = true;
        }
        $scope.refrescar();
    });
    $scope.abrir = function(pedido) {
        $scope.seleccion = pedido;
    }
    $ionicModal.fromTemplateUrl('templates/Pedidos.html', { // determina el modal para mostrar el pedido.
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });
    $scope.confirmar = function(valor) {
        alert("Estoy");
        if (valor === 3) {
            valor = 1;
        }
        if (valor > 0) {
            $http.get("http://alaordenapp.com/alaorden/php/setconfirmacion.php?idpedido=" + $scope.seleccion.id + "&respuesta=" + valor).success(function(dato) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Muy bien',
                    template: '<center>Muchas gracias por confirmarnos.</center>'
                });
            });
            document.location.href = 'file:///android_asset/www/index.html';
        } else {
            var alertPopup = $ionicPopup.alert({
                title: 'Elige',
                template: '<center>Debes elegir primero una opción.</center>'
            });
        }
    }
    $scope.refrescar();

    $scope.toSomos = function() { $state.go('somos'); }

})

.controller('contactanosCtrl', function($scope, $state) {})

.controller('listRestaurantesCtrl', function($scope, $state, $http) {
    $scope.buscar = false;
    $scope.toMapa = function() {
        $state.go('mapa2');
    }

    $scope.buscador = function() {
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
    if ($scope.rating > 0) { $scope.votos = "true"; }
    for (var i = 0; i < $scope.rating; i++) {
        $scope.estrella.push({});
    }
    while ($scope.estrella.length + $scope.estrellaVacias.length < 5) {
        $scope.estrellaVacias.push({});
    }

    $scope.toSomos = function() { $state.go('somos'); }
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

    $scope.toLogin = function() { //Redirecciona a la parte principal de la app. 
        $state.go('login');
    }

})

.controller('MapCtrl', function($timeout, $scope, $ionicLoading, $cordovaGeolocation, $compile, $ionicPopup, $http, $stateParams) {

    $scope.datamap = { //Datos del mapa a crear, el resto de los datos se encuentran en directives.js
        titulo: "Hola",
        centro: {
            lat: 50,
            lng: 2
        },
        localidad: $stateParams.localidad,
        zoom: 16,
        marcas: []
    };
})

.controller('somosCtrl', function($scope, $state) {
    $scope.toPrincipal = function() { //Redirecciona a la parte principal de la app. 
        $state.go('principal');
    }

})

.controller('datosPedidoCtrl', function($scope, $state) {
    $scope.confirmo = function() {
        console.log('CONFIRMO');
    }
    $scope.toPrincipal = function() {
        $state.go('principal');
    }
})

.controller('MainCtrl', function($scope, $state) {
    console.log('MainCtrl');

    $scope.toIntro = function() {
        $state.go('intro');
    }
});