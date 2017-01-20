angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
})

.controller('inicioPpalCtrl', function($scope, $state) {
    $scope.toLista = function(){ //Redirecciona a la parte principal de la app. 
    $state.go('app.listadoRestaurantes');
  }
})

.controller('loginCtrl', function($scope, $state) {
    $scope.toPrincipal = function(){ //Redirecciona a la parte principal de la app. 
    $state.go('principal');
  }
})

.controller('listRestaurantesCtrl', function($scope) {
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

   $scope.toPrincipal = function(){ //Redirecciona a la parte principal de la app. 
    $state.go('login');
  }
})

.controller('MainCtrl', function($scope, $state) {
  console.log('MainCtrl');
  
  $scope.toIntro = function(){
    $state.go('intro');
  }
});
