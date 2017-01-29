angular.module('starter.directives', [])

.directive('myMap', function ($http,$ionicPopup) {

		return {
			restrict: 'E',
			scope: {
				data: "="
			},
			template: '<div id="gmaps"></div>',
			replace: true,
			link: function (scope, element, attrs) {
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

				// show the map and place some markers
				initMap();
				setTimeout(function () { resizingMap(); }, 400);
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