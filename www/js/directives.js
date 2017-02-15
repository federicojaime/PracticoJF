/*
	Requiere:
	<script src="http://maps.googleapis.com/maps/api/js?key=AIzaSyB16sGmIekuGIvYOfNoW9T44377IU2d2Es"></script>
	
	Estilo css:
	#gmaps {
		width: 450px;
		height: 450px;
	}

	Scope:
	$scope.datamap = {
		titulo: "Hola",
		centro: { 
			lat: 50, 
			lng: 2
		},
		zoom: 4,
		marcas: [
			{
				lat: 51.508515,
				lng: -0.125487,
				titulo: "London",
				contenido: "<div> Hola Londres </div>"
			},
			{
				lat: 52.370216,
				lng: 4.895168,
				titulo: "Amsterdam",
				contenido: "<div> Hola Amsterdam </div>"
			},
			{
				lat: 48.856614,
				lng: 2.352222,
				titulo: "Paris",
				contenido: "<div> Hola Paris </div>"
			}
		]
	};

	html:
	<my-map data=datamap></my-map>
*/
angular.module('starter.directives', [])

var myObject = {
    "id": "4",
    "nombre": "Coyote Delivery",
    "costodelib": "0",
    "pathimg": "http:\/\/alaordenapp.com\/app\/admin\/imgs\/gslaU.jpg",
    "onoff": "0",
    "latitud": "-33.688005",
    "longitud": "-65.467519",
    "favorito": 0,
    "rango": "3000"
}


.directive('myMap', function($http, $ionicPopup) {

        return {
            restrict: 'E',
            scope: {
                data: "="
            },
            template: '<div id="gmaps"></div>',
            replace: true,
            link: function(scope, element, attrs) {
                var map, infoWindow;

                // map config

                var mapOptions = {
                    //center: new google.maps.LatLng(50, 2),
                    center: new google.maps.LatLng(scope.data.centro.lat, scope.data.centro.lng),
                    //zoom: 4,
                    zoom: scope.data.zoom,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    scrollwheel: true,
                    draggable: true
                };

                // init the map
                function initMap() {
                    if (map === void 0) {
                        map = new google.maps.Map(element[0], mapOptions);
                    }
                }

                // place a marker
                function setMarker(map, position, title, content) {
                    var marker;
                    var markerOptions = {
                        position: position,
                        map: map,
                        title: title,
                        icon: 'img/mapapink.png'
                    };

                    marker = new google.maps.Marker(markerOptions);

                    google.maps.event.addListener(marker, 'click', function() {
                        // close window if not undefined
                        if (infoWindow !== void 0) {
                            infoWindow.close();
                        }
                        // create new window
                        var infoWindowOptions = {
                            content: content
                        };
                        infoWindow = new google.maps.InfoWindow(infoWindowOptions);
                        infoWindow.open(map, marker);
                    });
                }

                function setMarkerPerson(map, position, title, content) {
                    var marker;
                    var markerOptions = {
                        position: position,
                        map: map,
                        title: title,
                    };
                    marker = new google.maps.Marker(markerOptions);
                    google.maps.event.addListener(marker, 'click', function() {
                        // close window if not undefined
                        if (infoWindow !== void 0) {
                            infoWindow.close();
                        }
                        // create new window
                        var infoWindowOptions = {
                            content: content
                        };
                        infoWindow = new google.maps.InfoWindow(infoWindowOptions);
                        infoWindow.open(map, marker);
                    });
                }
                /*formula de haversine*/
                var rad = function(x) {
                    return x * Math.PI / 180;
                };

                var getDistance = function(p1, p2) {
                    var R = 6378137; // Earth’s mean radius in meter
                    var dLat = rad(p2.latitude() - p1.latitud());
                    var dLong = rad(p2.longitude() - p1.longitud());
                    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                        Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) *
                        Math.sin(dLong / 2) * Math.sin(dLong / 2);
                    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                    var d = R * c;
                    return d; // returns the distance in meter
                };
                /*fin formukla de haversine*/

                // show the map and place some markers
                initMap();
                $http.get("http://alaordenapp.com/alaorden/php/comercios.php?idlocalidad=82").success(function(dato) {
                    /*Función que retorna la posición del dispositivo*/
                    var posicionActual = function() {
                            var options = {
                                enableHighAccuracy: true,
                                timeout: 5000,
                                maximumAge: 0
                            };

                            function success(pos) {
                                return pos.coords;
                            };

                            function error(err) {
                                var alertPopup = $ionicPopup.alert({
                                    template: '<center>Activa tu GPS para ver tu ubicación</center>',
                                });
                            };
                            navigator.geolocation.getCurrentPosition(success, error, options);
                        }
                        /*Fin de la función que retorna la posición del dispositivo*/
                    for (var i = 0; i < dato.length; i++) {
                        if (getDistance(dato[i], posicionActual()) <= myObject.rango) {
                            scope.data.marcas.push(dato[i]);
                        }
                    }
                    console.log(scope.data.marcas);
                    for (var i = 0; i < scope.data.marcas.length; i++) {
                        setMarker(map, new google.maps.LatLng(scope.data.marcas[i].latitud, scope.data.marcas[i].longitud), scope.data.marcas[i].nombre, '<a style="text-decoration:none;"   href="#/app/inicio/' + scope.data.marcas[i].id + '">' + scope.data.marcas[i].nombre, '</a>');
                    }
                })
                setTimeout(function() { resizingMap(); }, 400);

                function resizingMap() {
                    if (typeof map == "undefined") return;
                    var center = map.getCenter();
                    google.maps.event.trigger(map, "resize");

                    var options = {
                        enableHighAccuracy: true,
                        timeout: 4000,
                        maximumAge: 0
                    };

                    function success(pos) {
                        map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
                        setMarkerPerson(map, new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude), "", "<div>¡Ud. esta aquí! </div>");
                    };

                    function error(err) {
                        var alertPopup = $ionicPopup.alert({
                            template: '<center>Activa tu GPS para ver tu ubicación</center>',
                        });
                    };
                    navigator.geolocation.getCurrentPosition(success, error, options);
                }
            }
        };
    })
    .directive('myMapa', function($http, $ionicPopup) {

        return {
            restrict: 'E',
            scope: {
                data: "="
            },
            template: '<div id="gmaps"></div>',
            replace: true,
            link: function(scope, element, attrs) {
                var map, infoWindow;

                // map config

                var mapOptions = {
                    //center: new google.maps.LatLng(50, 2),
                    center: new google.maps.LatLng(scope.data.centro.lat, scope.data.centro.lng),
                    //zoom: 4,
                    zoom: scope.data.zoom,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    scrollwheel: true,
                    draggable: true
                };

                // init the map
                function initMap() {
                    if (map === void 0) {
                        map = new google.maps.Map(element[0], mapOptions);
                    }
                }

                // place a marker
                function setMarker(map, position, title, content) {
                    var marker;
                    var markerOptions = {
                        position: position,
                        map: map,
                        title: title,
                        icon: 'img/mapapink.png'
                    };

                    marker = new google.maps.Marker(markerOptions);

                    google.maps.event.addListener(marker, 'click', function() {
                        // close window if not undefined
                        if (infoWindow !== void 0) {
                            infoWindow.close();
                        }
                        // create new window
                        var infoWindowOptions = {
                            content: content
                        };
                        infoWindow = new google.maps.InfoWindow(infoWindowOptions);
                        infoWindow.open(map, marker);
                    });
                }

                function setMarkerPerson(map, position, title, content) {
                    var marker;
                    var markerOptions = {
                        position: position,
                        map: map,
                        title: title,
                    };
                    marker = new google.maps.Marker(markerOptions);
                    google.maps.event.addListener(marker, 'click', function() {
                        // close window if not undefined
                        if (infoWindow !== void 0) {
                            infoWindow.close();
                        }
                        // create new window
                        var infoWindowOptions = {
                            content: content
                        };
                        infoWindow = new google.maps.InfoWindow(infoWindowOptions);
                        infoWindow.open(map, marker);
                    });
                }

                // show the map and place some markers
                initMap();
                $http.get("http://alaordenapp.com/alaorden/php/dcomercio.php?idcomercio=82").success(function(dato) {
                    setMarker(map, new google.maps.LatLng(dato[0].latitud, dato[0].longitud), dato[0].nombre, '<a style="text-decoration:none;"   href="#/app/inicio/' + dato[0].id + '">' + dato[0].nombre + '</img></a>');
                    map.setCenter(new google.maps.LatLng(dato[0].latitud, dato[0].longitud));
                })
                setTimeout(function() { resizingMap(); }, 400);

                function resizingMap() {
                    if (typeof map == "undefined") return;
                    var center = map.getCenter();
                    google.maps.event.trigger(map, "resize");
                    var options = {
                        enableHighAccuracy: true,
                        timeout: 4000,
                        maximumAge: 0
                    };

                    function success(pos) {
                        setMarkerPerson(map, new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude), "", "<div>¡Ud. esta aquí! </div>");
                    };

                    function error(err) {
                        var alertPopup = $ionicPopup.alert({
                            template: '<center>Activa tu GPS para ver tu ubicación</center>'
                        });
                    };
                    navigator.geolocation.getCurrentPosition(success, error, options);
                }
            }
        };
    });