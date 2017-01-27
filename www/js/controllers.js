angular.module('starter.controllers', ['ngCordova'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state) {
    $scope.toInicio = function() { //Redirecciona a la parte principal de la app. 
        $state.go('principal');
    }


})

.controller('mapa2', function($scope, $state) {
    $scope.posisionar = function() {

    }
})


.controller('inicioPpalCtrl', function($scope, $state) {
    $scope.toLista = function() { //Redirecciona a la parte principal de la app. 
        $state.go('app.listadoRestaurantes');
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
    $scope.toLogin = function() { //Redirecciona a la parte principal de la app. 
        $state.go('login');
    }
})

.controller('registroCtrl', function($scope, $state) {

})

.controller('listRestaurantesCtrl', function($scope, $state) {
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

})

.controller('MapCtrl', function($scope, $ionicLoading, $cordovaGeolocation) {
        $scope.mapCreated = function(map) {
            $scope.map = map;
        };

        /*$scope.centerOnMe = function() {
            console.log("Centering");
            if (!$scope.map) {
                return;
            }

            $scope.loading = $ionicLoading.show({
                content: 'Getting current location...',
                showBackdrop: false
            });

            navigator.geolocation.getCurrentPosition(function(pos) {
                console.log('Got pos', pos);
                $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
                $scope.loading.hide();
            }, function(error) {
                alert('Unable to get location: ' + error.message);
            });
        };*/

        $scope.centerOnMePro = function() {
            var posOptions = { timeout: 10000, enableHighAccuracy: false };
            $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position) {
                var lat = position.coords.latitude
                var long = position.coords.longitude
                console.log(lat + '   ' + long)
            }, function(err) {
                console.log(err)
            });

            var watchOptions = { timeout: 3000, enableHighAccuracy: false };
            var watch = $cordovaGeolocation.watchPosition(watchOptions);

            watch.then(
                null,

                function(err) {
                    console.log(err)
                },

                function(position) {
                    var lat = position.coords.latitude
                    var long = position.coords.longitude
                    console.log(lat + '' + long)
                }
            );

            watch.clearWatch();
        }
    })
    /*
    .controller('MapCtrl', function($scope, $cordovaGeolocation) {
        var posOptions = { timeout: 10000, enableHighAccuracy: false };
        $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position) {
            var lat = position.coords.latitude
            var long = position.coords.longitude
            console.log(lat + '   ' + long)
        }, function(err) {
            console.log(err)
        });

        var watchOptions = { timeout: 3000, enableHighAccuracy: false };
        var watch = $cordovaGeolocation.watchPosition(watchOptions);

        watch.then(
            null,

            function(err) {
                console.log(err)
            },

            function(position) {
                var lat = position.coords.latitude
                var long = position.coords.longitude
                console.log(lat + '' + long)
            }
        );

        watch.clearWatch();

    })
*/
    .controller('MainCtrl', function($scope, $state) {
        console.log('MainCtrl');

        $scope.toIntro = function() {
            $state.go('intro');
        }
    });