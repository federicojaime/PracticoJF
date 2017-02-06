angular.module('starter.controllers', ['ngCordova', 'ionic.cloud'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state, $ionicAuth) {

    $scope.$on('cloud:push:notification', function(event, data) {
        var msg = data.message;
        alert(msg.title + ': ' + msg.text);
    });

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

    $scope.toCerrasSession = function() { //Redirecciona al template de cambiarCdad
        $ionicAuth.logout();
        $state.go('login');
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
    $scope.toSomos = function() { $state.go('app.somos'); }

})

.controller('loginCtrl', function($scope, $state, $ionicAuth, $ionicUser, $ionicPush, $ionicPopup) {

    $scope.iniciaFacebook = function() { // inicia session en el caso de que eliga el boton de facebook.
        $ionicFacebookAuth.login().then(
            $ionicPush.register().then(function(t) {
                return $ionicPush.saveToken(t);
            }).then(function(t) {
                console.log('Token saved:', t.token);
            }),
            console.log($ionicUser.social.facebook.data.full_name + " " + $ionicUser.social.facebook.data.uid),
            $state.go('principal')
        ).err($ionicAuth.login('facebook').then(
            $ionicPush.register().then(function(t) {
                return $ionicPush.saveToken(t);
            }).then(function(t) {
                console.log('Token saved:', t.token);
            }),
            console.log($ionicUser.social.facebook.data.full_name + " " + $ionicUser.social.facebook.data.uid),
            $state.go('principal')
        ))
    }

    $scope.details = { 'email': '', 'password': '' };
    $scope.toPrincipal = function() { //Redirecciona a la parte principal de la app. 
        $ionicAuth.login('basic', $scope.details).then(function() {
            $ionicPush.register().then(function(t) {
                return $ionicPush.saveToken(t);
            }).then(function(t) {});
            $state.go('principal');
        }, function(err) {
            var alertPopup = $ionicPopup.alert({
                title: 'Error',
                template: "Tu correo o contraseña no son los correctos, vuelve a intentarlo." + err
            });
        })
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

.controller('registroCtrl', function($scope, $state, $ionicAuth, $ionicUser, $ionicPopup) {

    $scope.details = { 'email': '', 'password': '', 'username': '', 'name': '' };
    $scope.acepto = false; //Variable para que aparezca y desparezca el boton "REGISTRARSE", si acepta los term y condiciones.
    $scope.aceptarTerminos = function() { //Funcion para que aparezca y desparezca el boton "REGISTRARSE", si acepta los term y condiciones
        if ($scope.acepto == false) { $scope.acepto = true; } else { $scope.acepto = false; }
    }
    $scope.toLogin = function() {
        console.log($scope.details);
        $ionicAuth.signup($scope.details).then(function() {
            var alertPopup = $ionicPopup.alert({
                title: 'Te registraste!',
                template: "Bien!"
            }); // `$ionicUser` is now registered
        }, function(err) {
            for (var e of err.details) {
                if (e === 'conflict_email') {
                    alert(e);
                } else {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Mal',
                        template: e
                    });
                    // handle other errors
                }
            }
        })
        $state.go('login');
    }
})


.controller('inicioPpalCtrl', function($scope, $state, $ionicUser) {

    console.log("Estoy" + $ionicUser.details.name + " " + $ionicUser.details.password);

    $scope.toLista = function() { //Redirecciona a la parte principal de la app. 
        $state.go('app.listadoRestaurantes');
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
    $scope.toSomos = function() { $state.go('app.somos'); }

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

    }
    $scope.toSomos = function() { $state.go('app.somos') }
})

.controller('IntroCtrl', function($scope, $state, $ionicSlideBoxDelegate, $ionicAuth) {
    if ($ionicAuth.isAuthenticated()) {
        console.log("pase");
        $state.go('principal');
    }
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

    $scope.toSomos = function() { $state.go('app.somos'); }

})

.controller('contactanosCtrl', function($scope, $state) {})

.controller('listRestaurantesCtrl', function($scope, $state, $http) {

    $scope.toPerfilRes = function() { //Redirecciona a la parte principal de la app. 
        $state.go('app.descr-carta');
    }
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

    $scope.toSomos = function() { $state.go('app.somos'); }
})

.controller('descr-cartaCtrl', function($scope, $state, $http, $ionicModal, $ionicPopup) {

    $scope.footer = '';

    $scope.numerosCantidad = { //Numeros para la cantidad de la carta
        availableOptions: [
            { id: '1', value: '1' },
            { id: '2', value: '2' },
            { id: '3', value: '3' },
            { id: '4', value: '4' },
            { id: '5', value: '5' }
        ],
        selectedOption: { id: '1', value: '1' }
    };
    $scope.numerosCantidadP = { //Numeros para la cantidad de las promos. 
        availableOptions: [
            { id: '1', value: '1' },
            { id: '2', value: '2' },
            { id: '3', value: '3' },
            { id: '4', value: '4' },
            { id: '5', value: '5' }
        ],
        selectedOption: { id: '1', value: '1' }
    };


    $scope.datosComercio = {
        nombre: "La Farola",
        telefono: "011-323252",
        domicilio: 'La Madrid 430',
        horarios: "lunes a viernes 12 a 00",
        descripcion: "Somos un resto que hace comida fina, podra en contrar shows especiales y mucha modernidad en nuetro local."
    }

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

    $http.get("http://alaordenapp.com/alaorden/php/lcatcom.php?idcomercio=18").success(function(dato) {
        $scope.catComidas = dato;
    });

    /*
     * if given group is the selected group, deselect it
     * else, select the given group
     */
    $scope.pedidos = [];

    $ionicModal.fromTemplateUrl('templates/Hola.html', { //determina que hay una pagina modal, seria voto nuevo.
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $ionicModal.fromTemplateUrl('templates/Compra-DatosPedido.html', { //determina que hay una pagina modal, seria datos pedido.
        scope: $scope
    }).then(function(modal) {
        $scope.modale = modal;
    });

    $scope.hayPedido = false;

    //Crea el pedido, y lo suma a la lista, devolviendo un ok si es una cantidad correcta. 
    $scope.crearPedido = function(u, cantidad, Ifpromo) {
        var i = 0;
        if (parseFloat(cantidad) > 0) {
            if ($scope.pedidos.length === 0) {
                $scope.pedidos.push({ name: u.descripcion, costo: (u.costo * cantidad), cantidad: cantidad, id: u.id, promo: Ifpromo });
                $scope.hayPedido = true;
            } else {
                for (i; i < $scope.pedidos.length; i++) {
                    if (u.descripcion === $scope.pedidos[i].name) {
                        $scope.pedidos[i].costo = parseFloat($scope.pedidos[i].costo) + (u.costo * cantidad);
                        $scope.pedidos[i].cantidad = parseFloat($scope.pedidos[i].cantidad) + parseFloat(cantidad);
                        i = $scope.pedidos.length + 1;
                    }
                }
                if (i === $scope.pedidos.length) {
                    $scope.pedidos.push({ name: u.descripcion, costo: (u.costo * cantidad), cantidad: cantidad, id: u.id, promo: Ifpromo });
                }
            }
            $scope.footer = 'classFooter'; //Hace que se muestre el botón de "TU ORDEN".
            var alertPopup = $ionicPopup.alert({
                title: '¡Muy bien!',
                template: "<center>" + 'Tu pedido fue agregado' + "</center>"
            });
        } else {
            var alertPopup = $ionicPopup.alert({
                title: '¡Error!',
                template: "<center>" + '¡Ingresa una cantidad correcta!' + "</center>"
            });
        }
        $scope.getPrecioTotal();

        $scope.numerosCantidad.selectedOption = { id: '1', value: '1' }
        $scope.numerosCantidadP.selectedOption = { id: '1', value: '1' }
    };

    $scope.getPrecioTotal = function() { //Funcion que devuelve el precio total. 
        $scope.precioTotales = 0;
        var precioT = 0;
        for (var i = 0; i < $scope.pedidos.length; i++) {
            precioT = parseFloat(precioT) + parseFloat($scope.pedidos[i].costo);
        }
        $scope.precioTotales = parseFloat(precioT) + parseFloat(0);
    };

    $scope.abriPedido = function() { //Abre la pantalla emergente de los pedidos.
        $scope.modale.show();
    };

    $scope.borrar = function(item) { // borra los item del pedido en el boton menos. 
        $scope.pedidos.splice($scope.pedidos.indexOf(item), 1);
        if ($scope.pedidos.length === 0) {
            $scope.hayPedido = false;
            $scope.footer = '';
            var alertPopup = $ionicPopup.alert({
                template: "<center>" + '¡Vaciaste tu pedido!' + "</center>"
            });
            $scope.modale.hide();
        }
        $scope.getPrecioTotal();
    }

    $scope.togglecategorias = function(categorias) {
        if ($scope.iscategoriashown(categorias)) {
            $scope.showncategorias = null;
        } else {
            $scope.showncategorias = categorias;

        }
    };
    $scope.iscategoriashown = function(categorias) {
        return $scope.showncategorias === categorias;
    };

    $scope.toLocalidad = function(localidad) {

    }
    $scope.toSomos = function() { $state.go('app.somos'); }
    $scope.goConfirmar = function() { $state.go('datosPedido'); }

})

.controller('somosCtrl', function($scope, $state) {
    $scope.toPrincipal = function() { //Redirecciona a la parte principal de la app. 
        $state.go('principal');
    }

})

.controller('MainCtrl', function($scope, $state) {
    console.log('MainCtrl');

    $scope.toIntro = function() {
        $state.go('intro');
    }

})

.controller('MapCtrl', function($timeout, $scope, $ionicLoading, $cordovaGeolocation, $compile, $ionicPopup, $http, $stateParams, User) {

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

.controller('datosPedidoCtrl', function($scope, $state) {
    $scope.confirmo = function() {
        console.log('CONFIRMO');
    }
    $scope.toPrincipal = function() {
        $state.go('principal');
    }
});