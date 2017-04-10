angular.module('starter.controllers', ['ngCordova', 'ionic.cloud'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state, $ionicAuth, ionicToast) {

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
        $state.go('contactanos');
    }

    $scope.toMisPedidos = function() { //Redirecciona a misPedidos.
        $state.go('app.misPedidos');
    }

    $scope.toCambiarCdad = function() { //Redirecciona al template de cambiarCdad
        $state.go('app.cambiarCdad');
    }

    $scope.toMisPedidos = function() { //Redirecciona a misPedidos.
        $state.go('app.misPedidos');
    }

    $scope.toCambiarCdad = function() { //Redirecciona al template de cambiarCdad
        $state.go('app.cambiarCdad');
    }
    $scope.toCerrasSession = function() { //Cierra Session y dirige  al template de login
        $ionicAuth.logout();
        $state.go('login');
    }


})

.controller('favoritosCtrl', function($scope, $state, $ionicPlatform) {

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
    $scope.buscar = false;
    $scope.buscador = function() {
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

})

.controller('loginCtrl', function($scope, $state, User, $cordovaAppAvailability, $ionicAuth, $http, $ionicUser, $ionicPush, $ionicPopup, $ionicFacebookAuth, $ionicPlatform) {

    $scope.token = '';
    $scope.iniciaFacebook = function() { // inicia session en el caso de que eliga el boton de facebook.
        $cordovaAppAvailability.check('com.facebook.katana') //verifica si esta instalada la app de facebook en el dispositivo
            .then(function() {
                // is availablec
                $ionicFacebookAuth.login().then(
                    $ionicPush.register().then(function(t) {
                        return $ionicPush.saveToken(t);
                    }).then(function(t) {
                        //console.log('Token saved:', t.token);
                    }).then(function() {})
                ).then(function() {
                    var full_name = $ionicUser.social.facebook.data.full_name
                    var profile_picture = $ionicUser.social.facebook.data.profile_picture
                    var alertPopup = $ionicPopup.alert({
                        title: 'Entro',
                        template: full_name + " " + profile_picture //+ err
                    });
                    $ionicPush.register().then(function(t) {
                        return $ionicPush.saveToken(t);
                    }).then(function(t) {
                        $scope.token = t.token;
                    }).then(function() {
                        var req = {
                            method: "POST",
                            dataType: "json",
                            url: "http://nerdgroups.com/jonyfood/appcalls/adduser.php",
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            },
                            data: {
                                mail: this.user.social.facebook.data.email,
                                password: this.user.social.facebook.data.uid,
                                name: this.user.social.facebook.data.full_name,
                                token: $scope.token
                            }
                        };
                        $http(req).then(function(response) {
                            if (response.data.err) {
                                response.data.msg.forEach(function(item) {
                                    alert(item); //Un alert por cada error
                                });
                            }
                        });
                    })
                    $state.go('principal');
                })
            }, function() { //en caso de no estar instalada la app de facebook, recurre al login por browser
                // not available     
                $ionicAuth.login('facebook').then(
                    $ionicPush.register().then(function(t) {
                        return $ionicPush.saveToken(t);
                    }).then(function(t) {
                        //console.log('Token saved:', t.token);
                    })
                    //console.log($ionicUser.social.facebook.data.full_name + " " + $ionicUser.social.facebook.data.uid),
                ).then(function() {
                    if ($ionicAuth.isAuthenticated()) {
                        $ionicPush.register().then(function(t) {
                            return $ionicPush.saveToken(t);
                        }).then(function(t) {
                            $scope.token = t.token;
                        }).then(function() {
                            var req = {
                                method: "POST",
                                dataType: "json",
                                url: "http://nerdgroups.com/jonyfood/appcalls/adduser.php",
                                headers: {
                                    "Content-Type": "application/x-www-form-urlencoded"
                                },
                                data: {
                                    mail: $ionicUser.social.facebook.data.email,
                                    password: $ionicUser.social.facebook.data.email,
                                    name: $ionicUser.social.facebook.data.full_name,
                                    token: $scope.token
                                }
                            };
                            $http(req).then(function(response) {
                                if (response.data.err) {
                                    response.data.msg.forEach(function(item) {
                                        alert(item); //Un alert por cada error
                                    });
                                }
                            });
                        })
                        User.GuardarUsuario($ionicUser.social.facebook.data.full_name, $ionicUser.social.facebook.data.email, $scope.token, $ionicUser.social.facebook.data.email)
                        $state.go('principal');
                    } else {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Error',
                            template: "Se produjo un error en tu atenticación, vuelve a intentarlo." //+ err
                        });
                        $state.go('login');
                    }
                });
            })
    }

    $scope.details = { 'email': '', 'password': '' };
    $scope.toPrincipal = function() { //inicia sesion con un correo y una clave ingresadas por el usuario
        $ionicAuth.login('basic', $scope.details).then(function() {
            $ionicPush.register().then(function(t) {
                return $ionicPush.saveToken(t);
            }).then(function(t) {
                $scope.token = t.token;
            }).then(function() {
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
                $http(req).then(function(response) {
                    if (response.data.err) {
                        response.data.msg.forEach(function(item) {
                            alert(item); //Un alert por cada error
                        });
                    }
                });
            })
            User.GuardarUsuario($ionicUser.details.name, $scope.details['password'], $scope.token, $scope.details['email'])
            $state.go('principal', null, { reload: true });
        }, function(err) {
            var alertPopup = $ionicPopup.alert({
                title: 'Error',
                template: "Tu correo o contraseña son incorrectos, vuelve a intentarlo." //+ err
            });
        })
    }

    $scope.toTerminosCondiciones = function() { $state.go('terminosCondiciones'); } //Redirecciona al estado terminosCondiciones
    $scope.toRegistro = function() { $state.go('registro'); } //Redirecciona al estado registro
        //$ionicPlatform.onHardwareBackButton(function() { $state.go('login'); });

})

.controller('terminosCondicionesCtrl', function($scope, $state) {
    $scope.toRegistro = function() { $state.go('registro'); } //Redirecciona a la parte principal de la app. 
})

.controller('registroCtrl', function($scope, $http, $state, $ionicPush, $ionicAuth, $ionicUser, $ionicPopup) {
    $scope.token = '';
    $scope.toSomos = function() { $state.go('terminosCondiciones'); }
    $scope.details = { 'email': '', 'password': '', 'username': '', 'name': '' };
    $scope.acepto = false; //Variable para que aparezca y desparezca el boton "REGISTRARSE", si acepta los term y condiciones.
    $scope.aceptarTerminos = function() { //Funcion para que aparezca y desparezca el boton "REGISTRARSE", si acepta los term y condiciones
        if ($scope.acepto == false) { $scope.acepto = true; } else { $scope.acepto = false; }
    }
    $scope.toLogin = function() {
        $ionicPush.register().then(function(t) {
            return $ionicPush.saveToken(t);
        }).then(function(t) {
            $scope.token = t.token;
        }).then(function() {
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
            $http(req).then(function(response) {
                if (response.data.err) {
                    response.data.msg.forEach(function(item) {
                        alert(item); //Un alert por cada error
                    });
                }
            });
        })
        $ionicAuth.signup($scope.details).then(function() {
            var alertPopup = $ionicPopup.alert({
                title: 'Te registraste!',
                template: "Tu cuenta ha sido creada con éxito, por favor, ingresa con ella."
            }); // `$ionicUser` is now registered
            $state.go('login'); //va a al template de login
        }, function(err) {
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
                    console.log(e);
                    var alertPopup = $ionicPopup.alert({
                        title: 'Error de registro.',
                        template: 'Verifique los datos e inténtelo nuevamente.' //e
                    });
                }
            }
        })
    }
})

.controller('inicioPpalCtrl', function($scope, User, $state, $ionicPopup, $ionicUser, $ionicAuth, $ionicPlatform) {
    $scope.toLista = function(id) { $state.go('app.listadoRestaurantes', { id }); } //Redirecciona a app.listadoRestaurantes 
    $scope.toFavoritos = function() { $state.go('app.favoritos'); } //Redirecciona a app.favoritos 
    $scope.toMapa = function() { $state.go('mapa2'); } //Redirecciona a mapa2
    $scope.toSomos = function() { $state.go('app.somos'); } //Redirecciona a app.somos 
    $ionicPlatform.registerBackButtonAction(function(event) {
        if ($state.current.name == "principal") {
            navigator.app.exitApp(); //<-- remove this line to disable the exit
        } else {
            navigator.app.backHistory();
        }
    }, 100);
    //$ionicPlatform.onHardwareBackButton(function() { $state.go('principal'); }); //Redirecciona a la parte principal de la app. 
})

.controller('cambiarCdadCtrl', function($scope, $state, HTTPIP, $http, $ionicLoading, $ionicPopup) {

    $scope.toggleGroup = function(group) {
        if ($scope.isGroupShown(group)) {
            $scope.shownGroup = null;
        } else {
            $scope.shownGroup = group;
        }
    };
    $scope.isGroupShown = function(group) {
        return $scope.shownGroup === group;
    };

    $scope.idprovincia = 0;
    $scope.provincias = null;

    var reqprovincias = {
        method: "POST",
        dataType: "json",
        url: HTTPIP + "/provloc.php",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {}
    };
    $http(reqprovincias).then(function(response) {
        if (!response.data.error) {
            $scope.provincias = response.data.data;
        } else {
            $scope.resp.error = 1;
            $scope.resp.errormsg = response.data.msg;
        }
    });


    /*var reqprovincias = {
        method: "POST",
        dataType: "json",
        url: HTTPIP + "/provincias.php",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
            id: 0
        }
    };
    $http(reqprovincias).then(function(response) {
        if (!response.data.error) {
            $scope.provincias = response.data.data;
            console.log($scope.provincias)
        } else {
            $scope.resp.error = 1;
            $scope.resp.errormsg = response.data.msg;
        }
    });

    $scope.agregarLocalidades = function() {
        var reqlocalidades = {
            method: "POST",
            dataType: "json",
            url: HTTPIP + "/localidades.php",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
                idprovincia: $scope.idprovincia,
            }
        };
        $http(reqlocalidades).then(function(response) {
            if (!response.data.error) {
                $scope.localidades = response.data.data;
            } else {
                $scope.resp.error = 1;
                $scope.resp.errormsg = response.data.msg;
            }
        });
    }
    */
    $scope.isprovinciashown = function(provincia) { return $scope.shownprovincias === provincia; };
    $scope.toMapaLocalidad = function(localidad) { $state.go('app.mapaLocalidad'); }
    $scope.toSomos = function() { $state.go('app.somos'); }
})

.controller('misPedidosCtrl', function($state, $ionicHistory, $ionicLoading, $ionicPlatform, $ionicPopup, $scope, $stateParams, $http, $ionicModal, $timeout) {
    $ionicPlatform.registerBackButtonAction(function(event) {
        if ($state.current.name == "app.misPedidos") {
            $state.go('principal'); //<-- remove this line to disable the exit
        } else {
            navigator.app.backHistory();
        }
    }, 100);

    $scope.leyenda = "Estamos buscando tus pedidos.";
    // ↓ ↓ ↓ ↓ ↓ CODIGO DEL LOADING  ↓ ↓ ↓ 
    $scope.i = 0;
    $scope.show = function() {
        $scope.i++;
        $ionicLoading.show({
            template: 'Cargando...',
            duration: 9
        }).then(function() {
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

                $http.get("http://alaordenapp.com/alaorden/php/getpedidos.php?idcliente=85").success(function(dato) {
                    $scope.pedidos = [];
                    console.log("ass")
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
    $scope.hide = function() {
        $ionicLoading.hide().then(function() {
            console.log("The loading indicator is now hidden");
        });
    };

    $scope.show();

    //  ↑ ↑ ↑ ↑ CODIGO DEL LOADING  ↑ ↑ ↑ ↑



    $scope.doRefresh = function() { // se activa cuando scrollea hacia abajo el usuario en la app.
        $scope.refrescar();
        $timeout(function() {
            $scope.$broadcast('scroll.refreshComplete');
        }, 1000);
    };

    $scope.refrescar = function() { //Actualiza las llamadas del templates.
        $scope.show();
    };

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
    $scope.toSomos = function() { $state.go('app.somos') };
})

.controller('IntroCtrl', function($scope, User, $state, $ionicUser, $ionicSlideBoxDelegate, $ionicAuth, $http, $ionicModal) {
    if ($ionicAuth.isAuthenticated()) {
        if ($ionicUser.details.name != null) {
            User.GuardarUsuario($ionicUser.details.name, $ionicUser.details.password, $ionicUser.details.name, $ionicUser.details.email);
        } else {
            User.GuardarUsuario($ionicUser.social.facebook.data.full_name, $ionicUser.social.facebook.data.full_name, $ionicUser.social.facebook.data.full_name, $ionicUser.social.facebook.data.email);
        }
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
    $scope.toLogin = function() { $state.go('login') };
    $scope.toSomos = function() { $state.go('app.somos') };
})

.controller('contactanosCtrl', function($scope, $state, $cordovaAppAvailability, $cordovaSms, $ionicAuth, $ionicUser, $ionicPopup) {
    /*document.addEventListener("deviceready", function() {
            $cordovaAppAvailability.check('com.twitter.android || com.facebook.katana || com.whatsapp')
            IMPLEMENTAR ESTAS VERIFICACIONES EN LOGIN
              .then(function() {
                // is available
              }, function () {
                // not available
              });*/
    $scope.llamar = function() {
        var number = '+54266154582100';
        var onSuccess = function() { $state.go('contactanos'); };
        var onError = function() {
            $state.go('contactanos');
            var alertPopup = $ionicPopup.alert({
                title: 'Error',
                template: 'El permiso requerido no ha sido entregado.'
            });
        }
        window.plugins.CallNumber.callNumber(onSuccess, onError, number, true);
    }

    $scope.enviarSms = function() {
        $ionicUser.load().then(function() {
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
                .then(function() {
                    // Success! SMS was sent
                    $state.go('contactanos');
                }, function(error) {
                    // An error occurred
                    var alertPopup = $ionicPopup.alert({
                        title: 'Error',
                        template: "Hemos registrado un problema al procesar el pedido, inténtalo nuevamente!."
                    });
                });
        });
    }

    $scope.enviarEmail = function() {
        if (true) {
            cordova.plugins.email.open({
                to: 'gsebastianlopezillia@gmail.com', //CAMBIAR DIRECCIÓN DE E-MAIL
                cc: null,
                bcc: null,
                subject: "Contacto JonyFood",
                body: null
            });
        } else {
            var alertPopup = $ionicPopup.alert({
                title: 'Error',
                template: 'Tu dispositivo debe contar con la App de Gmail para realizar esta acción.'
            });
        }
    }

    $scope.whatsApp = function() {
        $cordovaAppAvailability.check('com.whatsapp')
            .then(function() {
                cordova.plugins.Whatsapp.send("2657218215");
                // is available
            }, function() {
                var alertPopup = $ionicPopup.alert({
                    title: 'Error',
                    template: 'Tu dispositivo debe contar con la App WhatsApp instalada para realizar esta acción.'
                });
                // not available
            });
    }
})

.controller('listRestaurantesCtrl', function($scope, $state, HTTPIP, $stateParams, $http, $ionicLoading) {
    $scope.hayInternet = true;
    $scope.hayResto = false; // si no llegase a haber un pedido, muestra un cartel. 
    $scope.leyenda = "Estamos buscando tus pedidos.";
    // ↓ ↓ ↓ ↓ ↓ CODIGO DEL LOADING  ↓ ↓ ↓ 
    $scope.show = function() {
        $ionicLoading.show({
            template: 'Cargando...',
            duration: 13000
        })
    }
    var reqRestaurantes = {
        method: "POST",
        dataType: "json",
        timeout: 13000,
        url: HTTPIP + "comercios.php",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
            idrubro: $stateParams.id,
            idlocalidad: 4282
        }
    };
    $http(reqRestaurantes).then(function(response) {
        if (!response.data.error) {
            $scope.restaurantes = response.data.data;
            $scope.cantidadResto = $scope.restaurantes.length;
            $scope.hayResto = true; // si no llegase a haber un pedido, muestra un cartel. 
            $ionicLoading.hide();
        } else {
            $scope.resp.error = 1;
            $scope.resp.errormsg = response.data.msg;
        }
    }, function(data) {
        console.log("error");
        console.log(data);
        $scope.hayInternet = false;
        $ionicLoading.hide();
    })

    $scope.show();

    //  ↑ ↑ ↑ ↑ CODIGO DEL LOADING  ↑ ↑ ↑ ↑

    $scope.restaurantes = null;
    /*$scope.restaurantes = [
        { nombre: 'La Farola de Palermo', descripcion: 'Pizzas - Milanesas - Parrilla', tiempo: '60 min', precioDelivery: '$10', compraMinima: '$150', img: 'img/listRest/lafarola.jpg' },
        { nombre: 'Il Panino', descripcion: 'Barrolucos - Milanesas - Parrilla', tiempo: '20 min', precioDelivery: '$20', compraMinima: '$100', img: 'img/listRest/logo 1.jpg' },
        { nombre: 'Pizzas Juan', descripcion: 'Pizzas', tiempo: '20 min', precioDelivery: '$10', compraMinima: '$150', img: 'img/listRest/logo2.jpg' },
        { nombre: 'ParriPizza', descripcion: 'Pizza - Parrilla', tiempo: '30 min', precioDelivery: '$15', compraMinima: '$350', img: 'img/listRest/logo3.jpg' },
        { nombre: 'Empanadas Pepe', descripcion: 'Pizzas - Milanesas - Parrilla', tiempo: '90 min', precioDelivery: '$10', compraMinima: '$150', img: 'img/listRest/logo4.gif' },
        { nombre: 'Milanesas Jhon Jhon', descripcion: 'Pizzas - Milanesas - Sanguches', tiempo: '60 min', precioDelivery: '$10', compraMinima: '$150', img: 'img/listRest/lafarola.jpg' }
    ];*/



    //AGREGAR FAVORITO //
    $scope.agregarFav = function(id) {
            var reqRestaurantes = {
                method: "POST",
                dataType: "json",
                url: HTTPIP + "addfavoritos.php",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: {
                    idcliente: 5,
                    idcomercio: id
                }
            };
            $http(reqRestaurantes).then(function(response) {
                if (!response.data.error) {} else {
                    $scope.resp.error = 1;
                    $scope.resp.errormsg = response.data.msg;
                }
            }, function(data) {
                console.log("error");
                console.log(data);
            })
        }
        // TERMINA AGREGAR FAVORITO// 
    $scope.toPerfilRes = function(id) { //Redirecciona a la parte principal de la app. 
        $state.go('app.descr-carta', { id });
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

.controller('descr-cartaCtrl', function($scope, comercio, Pedidos, $state, $http, HTTPIP, $ionicModal, $ionicLoading, $stateParams, $ionicPopup) {
    $scope.catComidas = "";
    var reqRestaurante = {
        method: "POST",
        dataType: "json",
        url: HTTPIP + "comerciodata.php",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
            idcomercio: $stateParams.id,
        }
    };
    $http(reqRestaurante).then(function(response) {
        if (!response.data.error) {
            $scope.datosComercio = response.data.data;
            $scope.catComidas = response.data.categorias;
            console.log($scope.catComidas);
            console.log($scope.datosComercio);
        } else {
            $scope.resp.error = 1;
            $scope.resp.errormsg = response.data.msg;
        }
    })

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

    $scope.datosComercio = "";

    $scope.estrella = []; //arreglo utilizado para generar el codigo. 
    $scope.estrellaVacias = [];
    $scope.rating = 0;
    var reqRestaurante = {
        method: "POST",
        dataType: "json",
        url: HTTPIP + "getvotos.php",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
            idcomercio: $stateParams.id,
        }
    };
    $http(reqRestaurante).then(function(response) {
        if (!response.data.error) {
            $scope.rating = response.data.total;
        } else {
            $scope.resp.error = 1;
            $scope.resp.errormsg = response.data.msg;
        }
    })

    if ($scope.rating > 0) { $scope.votos = "true"; }
    for (var i = 0; i < $scope.rating; i++) {
        $scope.estrella.push({});
    }
    while ($scope.estrella.length + $scope.estrellaVacias.length < 5) {
        $scope.estrellaVacias.push({});
    }

    $scope.hayPromo = false; //Si es false no muestra el titulo de promocion. 
    $http.get("http://alaordenapp.com/alaorden/php/promos.php?idcomercio=8").success(function(dato) { //Solo San Luis
        $scope.promociones = dato;
        if ($scope.promociones.length > 0) {
            $scope.hayPromo = true;
        }
    });

    $scope.getPrecioTotal = function() { //Funcion que devuelve el precio total. 
        $scope.precioTotales = 0;
        var precioT = 0;
        for (var i = 0; i < $scope.pedidos.length; i++) {
            precioT = parseFloat(precioT) + parseFloat($scope.pedidos[i].costo);
        }
        $scope.precioTotales = parseFloat(precioT) + parseFloat(0);
    };

    $scope.pedidos = [
        []
    ];

    $scope.hayPedido = false;

    //Crea el pedido, y lo suma a la lista, devolviendo un ok si es una cantidad correcta. 
    $scope.crearPedido = function() {
        u = $scope.pedidoItem;
        cantidad = $scope.pedidoCant;
        Ifpromo = $scope.pedidoIfpromo;
        var i = 0;
        /* if (parseFloat(cantidad) > 0) {
        if ($scope.pedidos.length === 0) {*/
        $scope.pedidos[$scope.pedidos.length - 1].push({ name: u.descripcion, costo: (u.costo * cantidad), cantidad: cantidad, id: u.id, promo: Ifpromo, listaitems: $scope.myChoices });
        $scope.hayPedido = true;
        $scope.listaItem = "";
        $scope.pedidoCant = "";
        $scope.pedidoIfpromo = "";
        $scope.pedidoItem = "";
        $scope.myChoices = [
            []
        ];
        /*} else {
                for (i; i < $scope.pedidos.length; i++) {
                    if (u.descripcion === $scope.pedidos[i].name) {
                        $scope.pedidos[i].costo = parseFloat($scope.pedidos[i].costo) + (u.costo * cantidad);
                        $scope.pedidos[i].cantidad = parseFloat($scope.pedidos[i].cantidad) + parseFloat(cantidad);
                        i = $scope.pedidos.length + 1;
                    }
                }
                if (i === $scope.pedidos.length) {
                    $scope.pedidos.push({ name: u.descripcion, costo: (u.costo * cantidad), cantidad: cantidad, id: u.id, promo: Ifpromo, listaitems: $scope.myChoices });
                }
            }
            if (i === $scope.pedidos.length) {
                $scope.pedidos.push({ name: u.descripcion, costo: (u.costo * cantidad), cantidad: cantidad, id: u.id, promo: Ifpromo, listaitems: $scope.myChoices });
            }
        } else {
            var alertPopup = $ionicPopup.alert({
                title: '¡Error!',
                template: "<center>" + '¡Ingresa una cantidad correcta!' + "</center>"
            });
        }*/
        $scope.footer = 'classFooter'; //Hace que se muestre el botón de "TU ORDEN".
        /*var alertPopup = $ionicPopup.alert({
            title: '¡Muy bien!',
            template: "<center>" + 'Tu pedido fue agregado' + "</center>",
            okType: 'button-dark',
        });
        */

        console.log($scope.pedidos);
        $scope.getPrecioTotal();
        comercio.guardarComercio($stateParams.id, $scope.datosComercio.costodelib, $scope.precioTotales);
    }
    $scope.getPrecioTotal();

    $scope.numerosCantidad.selectedOption = { id: '1', value: '1' }
    $scope.numerosCantidadP.selectedOption = { id: '1', value: '1' }

    $scope.abriPedido = function() { //Abre la pantalla emergente de los pedidos.
        $scope.modale.show();
    };

    $scope.listaItem = "";
    $scope.pedidoCant = "";
    $scope.pedidoIfpromo = "";
    $scope.pedidoItem = "";

    $scope.abriItem = function(item, numerosCantidad, Ifpromo) { //Abre la pantalla emergente de los pedidos.
        $scope.pedidoItem = item;
        $scope.listaItem = item.listaitems;
        $scope.pedidoCant = numerosCantidad;
        $scope.pedidoIfpromo = Ifpromo;
        $scope.modal.show();
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

    //**Algoritmo para la animacion de la lista en acordeon.

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

    $scope.goConfirmar = function() {
        console.log($scope.myChoices);
        Pedidos.guardarPedido($scope.pedidos);
        $state.go('datosPedido');
    }


    $ionicModal.fromTemplateUrl('templates/items.html', { //determina que hay una pagina modal, seria voto nuevo.
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $ionicModal.fromTemplateUrl('templates/Compra-DatosPedido.html', { //determina que hay una pagina modal, seria datos pedido.
        scope: $scope
    }).then(function(modal) {
        $scope.modale = modal;
    });
    ///EMPIEZA TEMPLATE VOTOS 
    $ionicModal.fromTemplateUrl('templates/voto-calificacion.html', { //determina que hay una pagina modal, seria datos pedido.
        scope: $scope
    }).then(function(modal) {
        $scope.calificar = modal;
    });

    $scope.votos = false; //Oculta las estrellas en el caso de que no haya votos.
    $scope.voto = 0; // contador de votos.
    $scope.estrella = []; //arreglo utilizado para generar el codigo. 
    $http.get("http://alaordenapp.com/alaorden/php/getvotos.php?idcomercio=" + $stateParams.id).success(function(dato) { //Solo San Luis
        $scope.rating = dato.estrellas;
        $scope.ratingsObject.rating = dato.estrellas;
        if ($scope.rating > 0) { $scope.votos = "true"; }
        for (var i = 0; i < $scope.rating; i++) {
            $scope.estrella.push({});
        }
        while ($scope.estrella.length + $scope.estrellaVacias.length < 5) {
            $scope.estrellaVacias.push({});
        }
    })

    $scope.estrellaVacias = [] //arreglo utilizado para generar el codigo. 

    $scope.ratingsObject = { // caracteristicas de las estrellas a la hora de votar.
        iconOn: 'ion-ios-star',
        iconOff: 'ion-ios-star-outline',
        iconOnColor: 'rgb(255, 246, 57)',
        iconOffColor: 'rgb(200, 100, 100)',
        rating: $scope.rating,
        minRating: 1,
        callback: function(rating) {
            $scope.ratingsCallback(rating);
        }
    };

    $scope.ratingsCallback = function(rating) {};

    $scope.VotoNuevo = {
        iconOn: 'ion-ios-star',
        iconOff: 'ion-ios-star-outline',
        iconOnColor: 'rgb(255, 246, 57)',
        iconOffColor: 'rgb(200, 100, 100)',
        rating: 0,
        minRating: 0,
        callback: function(rating) {
            $scope.ratingsCallback(rating);
        }
    };

    $scope.ratingsCallback = function(rating) {
        $scope.voto = rating;
    };

    $scope.votar = function() {
        var reqRestaurantes = {
            method: "POST",
            dataType: "json",
            url: HTTPIP + "addvoto.php",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
                idcliente: 5,
                idcomercio: $stateParams.id,

            }
        };
        $http(reqRestaurantes).then(function(response) {
            if (!response.data.error) {
                var alertPopup = $ionicPopup.alert({
                    title: '¡Perfecto!',
                    template: '<center>Tu voto se ha efectuado</center>'
                });
                $scope.calificar.hide();
            } else {
                $scope.resp.error = 1;
                $scope.resp.errormsg = response.data.msg;
            }
        })
    }

    ///TERMINA TEMPLATES VOTOS
    ///EMPIEZA EL TEMPLATE DE LISTAS DE ITEMS
    $scope.listaItem = "";

    $scope.myChoices = [
        []
    ];

    $scope.stateChanged = function(checked, item) {
        if (checked) {
            $scope.myChoices[$scope.myChoices.length - 1].push(item);
        } else {
            var index = $scope.myChoices[$scope.myChoices.length - 1].indexOf(item);
            $scope.myChoices[$scope.myChoices.length - 1].splice(index, 1);
        }
    }


})

.controller('somosCtrl', function($scope, $state) {
    $scope.toPrincipal = function() { //Redirecciona a la parte principal de la app. 
        $state.go('principal');
    }

})

.controller('MainCtrl', function($scope, $state) {
    $scope.toIntro = function() { $state.go('intro'); }
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

.controller('datosPedidoCtrl', function($scope, comercio, Pedidos, User, $state) {
    $scope.toMisPedidos = function() {
        console.log("comercio");
        console.log(comercio.retornarComercio());
        console.log("User");
        console.log(User.DatosUsuario());
        console.log("pedido");
        console.log(Pedidos.retornarPedidos());
        //$state.go('app.misPedidos'); 
    }
})

.controller('cambiarClaveCtrl', function($scope, $ionicPopup, $state, $ionicAuth) {

    $scope.details = { 'code': '', 'newPassword': '' };
    $scope.toLogin = function() {
        console.log($ionicAuth.confirmPasswordReset($scope.details['code'], $scope.details['newPassword']));
        var alertPopup = $ionicPopup.alert({
            title: 'Listo',
            template: "<center>Se restablecio tu contraseña.</center>" //+ err
        });
        $state.go('login');
    }

})

.controller('recuperarClaveCtrl', function($scope, $ionicPopup, $state, $ionicAuth) {
    $scope.toLogin = function() { $state.go('login') };

    $scope.details = { 'email': '' };

    $scope.pedirCodigo = function() {
        if ($scope.details['email'] === undefined) {
            var alertPopup = $ionicPopup.alert({
                title: 'Vuelve a intentarlo',
                template: "<center>Tu correo es incorrecto.</center>" //+ err
            });
        } else {
            console.log($ionicAuth.requestPasswordReset($scope.details['email']));
            $state.go('cambiarClave');
        }
        $scope.iscategoriashown = function(categorias) {
            return $scope.showncategorias === categorias;
        };
    }
})

.controller('favoritosCtrl', function($scope, $timeout, HTTPIP, $ionicLoading, $http, $state) {
    $scope.doRefresh = function() { //Se activa cuando en el celular scrollea hacia abajo.
        $scope.refrescar();
        $timeout(function() {
            $scope.$broadcast('scroll.refreshComplete');
        }, 1000);
    };
    $scope.hayInternet = true;
    $scope.hayResto = false; // si no llegase a haber un pedido, muestra un cartel. 
    $scope.leyenda = "Estamos buscando tus pedidos.";
    // ↓ ↓ ↓ ↓ ↓ CODIGO DEL LOADING  ↓ ↓ ↓ 
    $scope.refrescar = function() {
            $scope.show = function() {
                $ionicLoading.show({
                    template: 'Cargando...',
                    duration: 13000
                })
            }
            var reqRestaurantes = {
                method: "POST",
                dataType: "json",
                timeout: 13000,
                url: HTTPIP + "listfavoritos.php",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: {
                    idcliente: 5
                }
            };
            $http(reqRestaurantes).then(function(response) {
                if (!response.data.error) {
                    $scope.restaurantes = response.data.data;
                    console.log($scope.restaurantes);
                    $scope.hayResto = true; // si no llegase a haber un pedido, muestra un cartel. 
                    $ionicLoading.hide();
                } else {
                    $scope.resp.error = 1;
                    $scope.resp.errormsg = response.data.msg;
                }
            }, function(data) {
                console.log("error");
                console.log(data);
                $scope.hayInternet = false;
                $ionicLoading.hide();
            })

            $scope.show();
        }
        //  ↑ ↑ ↑ ↑ CODIGO DEL LOADING  ↑ ↑ ↑ ↑

    //DELETE FAVORITO//
    $scope.eliminarFav = function(id) {
            console.log(id);
            var reqRestaurantes = {
                method: "POST",
                dataType: "json",
                url: HTTPIP + "delfavorito.php",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: {
                    idcliente: 5,
                    idcomercio: id
                }
            };
            $http(reqRestaurantes).then(function(response) {
                if (!response.data.error) {
                    $scope.refrescar();
                } else {
                    $scope.resp.error = 1;
                    $scope.resp.errormsg = response.data.msg;
                }
            })
        }
        //TERMINA DELETE FAVORITO //
    $scope.buscar = false;
    $scope.buscador = function() {
        if ($scope.buscar == true) {
            $scope.buscar = false;
        } else {
            $scope.buscar = true;
        }
    };
    $scope.restaurantes = [];
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
    $scope.refrescar();
})

.controller('MapLocCtrl', function($timeout, $scope, $ionicLoading, $cordovaGeolocation, $compile, $ionicPopup, $http, $stateParams) {

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

.controller('itemsCtrl', function($timeout, $scope, $ionicLoading, $cordovaGeolocation, $compile, $ionicPopup, $http, $stateParams) {

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
});