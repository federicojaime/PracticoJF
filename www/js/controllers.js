angular.module('starter.controllers', ['ngCordova', 'ionic.cloud'])

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout, $state, $ionicAuth, ionicToast) {

        $scope.$on('cloud:push:notification', function (event, data) {
            var msg = data.message;
            alert(msg.title + ': ' + msg.text);
        });

        $scope.toInicio = function () { //Redirecciona a la parte principal de la app. 
            $state.go('principal');
        }


        $scope.toFavoritos = function () { //Redirecciona al template de favoritos.
            $state.go('app.favoritos');
        }

        $scope.toContactanos = function () { //Redirecciona a la parte principal de la app.
            $state.go('contactanos');
        }

        $scope.toMisPedidos = function () { //Redirecciona a misPedidos.
            $state.go('app.misPedidos');
        }

        $scope.toCambiarCdad = function () { //Redirecciona al template de cambiarCdad
            $state.go('app.cambiarCdad');
        }

        $scope.toMisPedidos = function () { //Redirecciona a misPedidos.
            $state.go('app.misPedidos');
        }

        $scope.toCambiarCdad = function () { //Redirecciona al template de cambiarCdad
            $state.go('app.cambiarCdad');
        }
        $scope.toCerrasSession = function () { //Cierra Session y dirige  al template de login
            $ionicAuth.logout();
            $state.go('login');
        }


    })

    .controller('favoritosCtrl', function ($scope, $state) {
        $scope.buscar = false;
        $scope.buscador = function () {
            if ($scope.buscar == true) {
                $scope.buscar = false;
            } else {
                $scope.buscar = true;
            }
        }
        $scope.restaurantes = [
            { nombre: 'La Farola de Palermo', descripcion: 'Pizzas - Milanesas - Parrilla', tiempo: '60 min', precioDelivery: '$10', compraMinima: '$150', img: 'img/listRest/lafarola.jpg' },
            { nombre: 'Il Panino', descripcion: 'Barrolucos - Milanesas - Parrilla', tiempo: '20 min', precioDelivery: '$20', compraMinima: '$100', img: 'img/listRest/logo 1.jpg' },
            { nombre: 'Pizzas Juan', descripcion: 'Pizzas', tiempo: '20 min', precioDelivery: '$10', compraMinima: '$150', img: 'img/listRest/logo2.jpg' },
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
        $scope.toSomos = function () { $state.go('app.somos'); }

    })//casi

    .controller('loginCtrl', function ($scope, $state, $ionicAuth, $http, $ionicUser, $ionicPush, $ionicPopup, $ionicFacebookAuth, $ionicPlatform) {
        $scope.token = '';
        $scope.iniciaFacebook = function () { // inicia session en el caso de que eliga el boton de facebook.
            /* $ionicFacebookAuth.login().then(
                 $ionicPush.register().then(function(t) {
                     return $ionicPush.saveToken(t);
                 }).then(function(t) {
                     console.log('Token saved:', t.token);
                 }),
                 console.log($ionicUser.social.facebook.data.full_name + " " + $ionicUser.social.facebook.data.uid),
                 $state.go('principal')
             ).err*/
            $ionicAuth.login('facebook').then(
                $ionicPush.register().then(function (t) {
                    return $ionicPush.saveToken(t);
                }).then(function (t) {
                    //console.log('Token saved:', t.token);
                })
                //console.log($ionicUser.social.facebook.data.full_name + " " + $ionicUser.social.facebook.data.uid),
            ).then(function () {
                if ($ionicAuth.isAuthenticated()) {
                    $state.go('principal');
                } else {
                    $state.go('login');
                }
            })
        }
        $scope.details = { 'email': '', 'password': '' };
        $scope.toPrincipal = function () {
            $ionicAuth.login('basic', $scope.details).then(function () {
                $ionicPush.register().then(function (t) {
                    return $ionicPush.saveToken(t);
                }).then(function (t) {
                    $scope.token = t.token;
                    alert($scope.token);
                }).then(function () {
                    var req = {
                        method: "POST",
                        dataType: "json",
                        url: "http://nerdgroups.com/jonyfood/appcalls/adduser.php",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        data: {
                            mail: $scope.details['email'],
                            password: $scope.details['password'],
                            name: "Nombre",
                            token: $scope.token
                        }
                    };
                    alert($scope.token);
                    $http(req).then(function (response) {
                        if (response.data.err) {
                            response.data.msg.forEach(function (item) {
                                alert(item); //Un alert por cada error
                            });
                        }
                    });
                })
                $state.go('principal');
            }, function (err) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Error',
                    template: "Tu correo o contraseña son incorrectos, vuelve a intentarlo." //+ err
                });
            })
        }

        $scope.toTerminosCondiciones = function () { $state.go('terminosCondiciones'); } //Redirecciona al estado terminosCondiciones
        $scope.toRegistro = function () { $state.go('registro'); } //Redirecciona al estado registro
        $ionicPlatform.onHardwareBackButton(function () { $state.go('login'); });

    })

    .controller('terminosCondicionesCtrl', function ($scope, $state) {
        $scope.toRegistro = function () { //Redirecciona a la parte principal de la app. 
            $state.go('registro');
        }
    })

    .controller('registroCtrl', function ($scope, $http, $state, $ionicPush, $ionicAuth, $ionicUser, $ionicPopup) {
        $scope.token = '';
        $scope.toSomos = function () { $state.go('terminosCondiciones'); }
        $scope.details = { 'email': '', 'password': '', 'username': '', 'name': '' };
        $scope.acepto = false; //Variable para que aparezca y desparezca el boton "REGISTRARSE", si acepta los term y condiciones.
        $scope.aceptarTerminos = function () { //Funcion para que aparezca y desparezca el boton "REGISTRARSE", si acepta los term y condiciones
            if ($scope.acepto == false) { $scope.acepto = true; } else { $scope.acepto = false; }
        }
        $scope.toLogin = function () {
            $ionicPush.register().then(function (t) {
                return $ionicPush.saveToken(t);
            }).then(function (t) {
                $scope.token = t.token;
                alert($scope.token);
            }).then(function () {
                var req = {
                    method: "POST",
                    dataType: "json",
                    url: "http://nerdgroups.com/jonyfood/appcalls/adduser.php",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    data: {
                        mail: $scope.details['email'],
                        password: $scope.details['password'],
                        name: $scope.details['name'],
                        token: $scope.token
                    }
                };
                alert($scope.token);
                $http(req).then(function (response) {
                    if (response.data.err) {
                        response.data.msg.forEach(function (item) {
                            alert(item); //Un alert por cada error
                        });
                    }
                });
            })
            $ionicAuth.signup($scope.details).then(function () {
                var alertPopup = $ionicPopup.alert({
                    title: 'Te registraste!',
                    template: "Tu cuenta ha sido creada con éxito, por favor, ingresa con ella."
                }); // `$ionicUser` is now registered
                $state.go('login'); //va a al template de login
            }, function (err) {
                for (var e of err.details) {
                    if (e === 'conflict_email') {
                        var alertPopup = $ionicPopup.alert({ //si el mail ya se encuentra registrado
                            title: 'Ya estas registrado',

                            template: 'La cuenta de E-mail que estás tratando de vincular ya posee una cuenta de usuario.'
                        })
                    } else if (e.toString().startsWith("required")) { //si faltó algún dato de registro
                        var alertPopup = $ionicPopup.alert({
                            title: 'Campos requeridos',
                            template: 'Debes completar todos los campos con datos válidos.'
                        })
                    } else { //si falla de conección, API, etc.
                        var alertPopup = $ionicPopup.alert({
                            title: 'Error de registro.',
                            template: 'Verifique los datos e inténtelo nuevamente.' //e
                        });
                    }
                }
            }
            )
        }
    })

    .controller('inicioPpalCtrl', function ($scope, $state, $ionicUser, $ionicAuth, $ionicPlatform) {
        $scope.toLista = function () { $state.go('app.listadoRestaurantes'); } //Redirecciona a app.listadoRestaurantes 
        $ionicPlatform.onHardwareBackButton(function () { $state.go('principal'); }); //Redirecciona a la parte principal de la app. 
        $scope.toFavoritos = function () { $state.go('app.favoritos'); } //Redirecciona a app.favoritos 
        $scope.toMapa = function () { $state.go('mapa2'); } //Redirecciona a mapa2
        $scope.toSomos = function () { $state.go('app.somos'); } //Redirecciona a app.somos 
    })

    .controller('cambiarCdadCtrl', function ($scope, $state, $http) {
        $scope.provincias = [];
        for (var i = 0; i < 10; i++) {
            $scope.provincias[i] = {
                name: i,
                localidades: []
            };
        }
        $scope.isprovinciashown = function (provincias) {
            return $scope.shownprovincias === provincias;
        };

        $scope.toLocalidad = function (localidad) {

        }
        $scope.toSomos = function () { $state.go('app.somos'); }

    })

    .controller('misPedidosCtrl', function ($ionicPlatform, $state, $ionicHistory, $ionicLoading, $ionicPopup, $scope, $stateParams, $http, $ionicModal, $timeout) {
        $scope.leyenda = "Estamos buscando tus pedidos.";
        // ↓ ↓ ↓ ↓ ↓ CODIGO DEL LOADING  ↓ ↓ ↓ 
        $scope.i = 0;
        $scope.show = function () {
            $scope.i++;
            $ionicLoading.show({
                template: 'Cargando...',
                duration: 9
            }).then(function () {
                if ($scope.pedidos != null) {
                    return
                    $scope.hide();
                }
                if ($scope.i > 3000) {
                    if ($scope.hayPed == false) {
                        return
                        $scope.hide();
                    }
                    var alertPopup = $ionicPopup.alert({
                        title: '¡Problemas con internet!',
                        template: '<center>Esto esta tardando demasiado, si puedes vuelve mas tarde. </center>'
                    });
                    $scope.leyenda = "Esto esta tardando demasiado, si puedes vuelve mas tarde.";
                } else {
                    $http.get("http://alaordenapp.com/alaorden/php/getpedidos.php?idcliente=85").success(function (dato) {
                        $scope.pedidos = [];
                        $scope.pedidos = dato["datos"];
                        if (dato["datos"] === null) {
                            $scope.hayPed = false;
                            $scope.i = 400;
                            $scope.leyenda = "Aún no tienes pedidos realizadas";
                            return
                            $scope.hide();
                        } else {
                            $scope.hayPed = true;
                            return
                            $scope.hide();
                        }
                    });
                    $scope.show();
                }
            });
        };
        $scope.hide = function () {
            $ionicLoading.hide().then(function () {
                console.log("The loading indicator is now hidden");
            });
        };

        $scope.show();

        //  ↑ ↑ ↑ ↑ CODIGO DEL LOADING  ↑ ↑ ↑ ↑



        $scope.doRefresh = function () { // se activa cuando scrollea hacia abajo el usuario en la app.
            $scope.refrescar();
            $timeout(function () {
                $scope.$broadcast('scroll.refreshComplete');
            }, 1000);
        };

        $scope.refrescar = function () { //Actualiza las llamadas del templates.
            $scope.show();
        };

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

        $scope.toSomos = function () { $state.go('app.somos') };
    })

    .controller('IntroCtrl', function ($scope, $state, $ionicSlideBoxDelegate, $ionicAuth, $http, $ionicModal) {
        if ($ionicAuth.isAuthenticated()) {
            $state.go('principal');
        }
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
        $scope.toLogin = function () { $state.go('login') };
        $scope.toSomos = function () { $state.go('app.somos') };
    })

    .controller('contactanosCtrl', function ($scope, $state, $cordovaAppAvailability, $cordovaSms, $ionicAuth, $ionicUser, $ionicPopup) {
        /*document.addEventListener("deviceready", function() {
    
            $cordovaAppAvailability.check('com.twitter.android || com.facebook.katana || com.whatsapp')
            IMPLEMENTAR ESTAS VERIFICACIONES EN LOGIN
              .then(function() {
                // is available
              }, function () {
                // not available
              });*/
        //$ionicPlatform.onHardwareBackButton(function() { $state.go('contactanos'); });
        $scope.llamar = function () {
            var number = '+54266154582100';
            var onSuccess = function () {
                $state.go('principal');
            };
            var onError = function () {
                $state.go('contactanos');
                var alertPopup = $ionicPopup.alert({
                    title: 'Error',
                    template: 'El permiso requerido no ha sido entregado.'
                });
            }
            window.plugins.CallNumber.callNumber(onSuccess, onError, number, true);
        }

        $scope.enviarSms = function () {
            $ionicUser.load().then(function () {
                // success!
                var mensaje = 'Contacto del usuario ' + $ionicUser.details.name + " e-mail: " + $ionicUser.details.email;

                var options = {
                    replaceLineBreaks: false, // true to replace \n by a new line, false by default
                    android: {
                        intent: 'INTENT' // send SMS with the native android SMS messaging
                        //intent: '' // send SMS without open any other app
                    }
                };
                $cordovaSms.send('2657218215', mensaje, options) //REEMPLAZAR NÚMERO DE TELÉFONO
                    .then(function () {
                        // Success! SMS was sent
                        $state.go('principal');
                        var alertPopup = $ionicPopup.alert({
                            title: 'Enviado',
                            template: "Tu mensaje se envió con éxito. En breves nos comunicaremos contigo."
                        });
                    }, function (error) {
                        // An error occurred
                        var alertPopup = $ionicPopup.alert({
                            title: 'Error',
                            template: "Hemos registrado un problema al procesar el pedido, inténtalo nuevamente!."
                        });
                    });
            });
        }

        $scope.enviarEmail = function () {
            if (true) {
                cordova.plugins.email.open({
                    to: 'gsebastianlopezillia@gmail.com', //CAMBIAR DIRECCIÓN DE E-MAIL
                    cc: null,
                    bcc: null,
                    subject: "Contacto JonyFood",
                    body: null
                });
            } else {
                $state.go('contactanos');
                var alertPopup = $ionicPopup.alert({
                    title: 'Error',
                    template: 'Tu dispositivo debe contar con la App de Gmail para realizar esta acción.'
                });
            }
        }

        $scope.whatsApp = function () {
            $cordovaAppAvailability.check('com.whatsapp')
                .then(function () {
                    cordova.plugins.Whatsapp.send("2657218215");

                    // is available
                }, function () {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Error',
                        template: 'Tu dispositivo debe contar con la App WhatsApp instalada para realizar esta acción.'
                    });
                    // not available
                });

        }
    })


    .controller('listRestaurantesCtrl', function ($scope, $state, $http, $ionicLoading) {

        // ↓ ↓ ↓ ↓ ↓ CODIGO DEL LOADING  ↓ ↓ ↓ 
        var i = 0;
        $scope.show = function () {
            $ionicLoading.show({
                template: 'Loading...',
                duration: 9
            }).then(function () {
                if (i > 10) {
                    $scope.hide();
                } else {
                    i++;
                    $scope.show();
                }
            });
        };
        $scope.hide = function () {
            $ionicLoading.hide().then(function () { });
        };

        $scope.show();


        //  ↑ ↑ ↑ ↑ CODIGO DEL LOADING  ↑ ↑ ↑ ↑

        $scope.toPerfilRes = function () { //Redirecciona a la parte principal de la app. 
            $state.go('app.descr-carta');
        }
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
            { nombre: 'La Farola de Palermo', descripcion: 'Pizzas - Milanesas - Parrilla', tiempo: '60 min', precioDelivery: '$10', compraMinima: '$150', img: 'img/listRest/lafarola.jpg' },
            { nombre: 'Il Panino', descripcion: 'Barrolucos - Milanesas - Parrilla', tiempo: '20 min', precioDelivery: '$20', compraMinima: '$100', img: 'img/listRest/logo 1.jpg' },
            { nombre: 'Pizzas Juan', descripcion: 'Pizzas', tiempo: '20 min', precioDelivery: '$10', compraMinima: '$150', img: 'img/listRest/logo2.jpg' },
            { nombre: 'ParriPizza', descripcion: 'Pizza - Parrilla', tiempo: '30 min', precioDelivery: '$15', compraMinima: '$350', img: 'img/listRest/logo3.jpg' },
            { nombre: 'Empanadas Pepe', descripcion: 'Pizzas - Milanesas - Parrilla', tiempo: '90 min', precioDelivery: '$10', compraMinima: '$150', img: 'img/listRest/logo4.gif' },
            { nombre: 'Milanesas Jhon Jhon', descripcion: 'Pizzas - Milanesas - Sanguches', tiempo: '60 min', precioDelivery: '$10', compraMinima: '$150', img: 'img/listRest/lafarola.jpg' }
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

        $scope.toSomos = function () { $state.go('app.somos'); }
    })

    .controller('descr-cartaCtrl', function ($scope, $state, $http, $ionicModal, $ionicLoading, $ionicPopup) {

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

        $scope.catComidas = null;

        $scope.i = 0;
        $scope.show = function () {
            $scope.i++;
            $ionicLoading.show({
                template: 'Cargando...',
                duration: 9
            }).then(function () {
                if ($scope.catComidas != null) {
                    console.log("estoy6")
                    return $scope.hide();
                }
                if ($scope.i > 3000) {
                    if ($scope.catComidas != null) {
                        console.log("estoy1")
                        return
                        $scope.hide();
                    }
                    var alertPopup = $ionicPopup.alert({
                        title: '¡Problemas con internet!',
                        template: '<center>Esto esta tardando demasiado, si puedes vuelve mas tarde. </center>'
                    });
                } else {
                    $http.get("http://alaordenapp.com/alaorden/php/lcatcom.php?idcomercio=18").success(function (dato) {
                        console.log(0)
                        $scope.catComidas = dato;
                        if ($scope.catComidas != null) {
                            $scope.i = 4000;
                            return "I'm going to work.";
                        }
                    });
                }
            });
        };
        $scope.hide = function () {
            $ionicLoading.hide().then(function () {
                return
            });
        };

        $scope.show();

        //  ↑ ↑ ↑ ↑ CODIGO DEL LOADING  ↑ ↑ ↑ ↑


        $scope.getPrecioTotal = function () { //Funcion que devuelve el precio total. 
            $scope.precioTotales = 0;
            var precioT = 0;
            for (var i = 0; i < $scope.pedidos.length; i++) {
                precioT = parseFloat(precioT) + parseFloat($scope.pedidos[i].costo);
            }
            $scope.precioTotales = parseFloat(precioT) + parseFloat(0);
        };


        /*
         * if given group is the selected group, deselect it
         * else, select the given group
         */
        $scope.pedidos = [];

        $ionicModal.fromTemplateUrl('templates/Hola.html', { //determina que hay una pagina modal, seria voto nuevo.
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $ionicModal.fromTemplateUrl('templates/Compra-DatosPedido.html', { //determina que hay una pagina modal, seria datos pedido.
            scope: $scope
        }).then(function (modal) {
            $scope.modale = modal;
        });

        $scope.hayPedido = false;

        //Crea el pedido, y lo suma a la lista, devolviendo un ok si es una cantidad correcta. 
        $scope.crearPedido = function (u, cantidad, Ifpromo) {
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
                if (i === $scope.pedidos.length) {
                    $scope.pedidos.push({ name: u.descripcion, costo: (u.costo * cantidad), cantidad: cantidad, id: u.id, promo: Ifpromo });
                }
            } else {
                var alertPopup = $ionicPopup.alert({
                    title: '¡Error!',
                    template: "<center>" + '¡Ingresa una cantidad correcta!' + "</center>"
                });
            }
            $scope.footer = 'classFooter'; //Hace que se muestre el botón de "TU ORDEN".
            var alertPopup = $ionicPopup.alert({
                title: '¡Muy bien!',
                template: "<center>" + 'Tu pedido fue agregado' + "</center>"
            });
        }
        $scope.getPrecioTotal();

        $scope.numerosCantidad.selectedOption = { id: '1', value: '1' }
        $scope.numerosCantidadP.selectedOption = { id: '1', value: '1' }



        $scope.abriPedido = function () { //Abre la pantalla emergente de los pedidos.
            $scope.modale.show();
        };

        $scope.borrar = function (item) { // borra los item del pedido en el boton menos. 
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

        $scope.togglecategorias = function (categorias) {
            if ($scope.iscategoriashown(categorias)) {
                $scope.showncategorias = null;
            } else {
                $scope.showncategorias = categorias;

            }
        };
        $scope.iscategoriashown = function (categorias) {
            return $scope.showncategorias === categorias;
        };

        $scope.toLocalidad = function (localidad) {

        }
        $scope.toSomos = function () { $state.go('app.somos'); }
        $scope.goConfirmar = function () { $state.go('datosPedido'); }

    })

    .controller('somosCtrl', function ($scope, $state) {
        $scope.toPrincipal = function () { //Redirecciona a la parte principal de la app. 
            $state.go('principal');
        }

    })

    .controller('MainCtrl', function ($scope, $state) {
        console.log('MainCtrl');

        $scope.toIntro = function () {
            $state.go('intro');
        }

    })

    .controller('MapCtrl', function ($timeout, $scope, $ionicLoading, $cordovaGeolocation, $compile, $ionicPopup, $http, $stateParams, User) {

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

    .controller('datosPedidoCtrl', function ($scope, $state) {
        $scope.confirmo = function () {
            console.log('CONFIRMO');
        }
        $scope.toPrincipal = function () {
            $state.go('principal');
        }
    })

    .controller('cambiarClaveCtrl', function ($scope, $ionicPopup, $state, $ionicAuth) {

        $scope.details = { 'code': '', 'newPassword': '' };
        $scope.toLogin = function () {
            console.log($ionicAuth.confirmPasswordReset($scope.details['code'], $scope.details['newPassword']));
            var alertPopup = $ionicPopup.alert({
                title: 'Listo',
                template: "<center>Se restablecio tu contraseña.</center>" //+ err
            });
            $state.go('login');
        }

    })

    .controller('recuperarClaveCtrl', function ($scope, $ionicPopup, $state, $ionicAuth) {
        $scope.toLogin = function () { $state.go('login') };

        $scope.details = { 'email': '' };

        $scope.pedirCodigo = function () {
            if ($scope.details['email'] === undefined) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Vuelve a intentarlo',
                    template: "<center>Tu correo es incorrecto.</center>" //+ err
                });
            }
            else {
                $ionicAuth.requestPasswordReset($scope.details['email']);
                $state.go('cambiarClave');
            }
            $scope.iscategoriashown = function (categorias) {
                return $scope.showncategorias === categorias;
            };

            $scope.toLocalidad = function (localidad) {

            }
            $scope.toSomos = function () { $state.go('app.somos'); }
            $scope.goConfirmar = function () { $state.go('datosPedido'); }

        }
    });