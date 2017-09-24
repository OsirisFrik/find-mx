var app = angular.module('app', ['ui.router', 'ngCookies']);
var token;

app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $urlRouterProvider.otherwise("/");

  $httpProvider.defaults.transformRequest = function(data){
        if (data === undefined) {
            return data;
        }
        return $.param(data);
    }

  $stateProvider.state('home', {
    url: "/",
    templateUrl: "views/home.html"
  }).state('registrar', {
    url: "/registrar",
    templateUrl: "views/registro.html"
  }).state('placa', {
    url: "/placa/:placa",
    templateUrl: "views/placa.html"
  });

});

app.controller('main', function ($scope, $state, $rootScope) {
  $scope.loading = false;

  $rootScope.back = function () {
    $state.go('home');
    $scope.loading = false;
  }
})

app.controller("home", function($scope, $http, $state, $rootScope, $cookies) {
  $rootScope.tieneBack = false;

  token = $cookies.get('key');

  if (!$rootScope.token) {
    $http({
      method: 'POST',
      //url: 'http://212.237.31.8:3457/getToken',
      url: 'http://localhost:3457/getToken',
    }).then(function (response) {
      $cookies.put('key', response.data);
    })
  }

  $scope.getPlaca = function () {
    $scope.loading = true;
    $state.go('placa', {placa: $scope.placa}, {reload: true});
  }
});

app.controller('registro', function ($scope, $http, $rootScope, $state) {
  $scope.personalInfo = false;
  $scope.inputPersonalInfo = function () {
    $scope.personalInfo = true;
  }

  $http({
    method: 'GET',
    url: 'http://localhost:3000/api/v1/personas'
  }).then(function (response) {
    console.log(response);
  });

  $scope.registrar = function () {
    var transform = function(data){
        return $.param(data);
    }

    $http.post("http://localhost:3000/api/v2/registro", $scope.reg, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
        transformRequest: transform
    }).then(function(responseData) {
        //do stuff with response
    });
  }

})

app.controller('placas', function ($scope, $http, $state, $rootScope, $cookies) {
  $rootScope.tieneBack = true;
  $scope.loading = true;
  $scope.error = false;
  var key = $cookies.get('key');

  console.log($cookies.get('key'));

  $scope.enviarPlaca = function(placa) {
    $scope.loading = true;
    var config = {headers:{
      'Content-Type': 'application/x-www-form-urlencoded',
      'token': key
    }};
    $http({
      method: 'POST',
      //url: 'http://212.237.31.8:3457/getPlacas',
      url: 'http://localhost:3457/getPlacas',
      data: 'placa='+placa, //ALC3436
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'token': key
      }
    }).then(function (response) {
      if (response.data.Solicitud.Datos) {
        $scope.datos = response.data.Solicitud.Datos[0].Dato;
      } else {
        $scope.error = true;
      }
      $scope.loading = false;
    }, function (err) {
      $scope.loading = false;
      $scope.error = true;
    });
  }
  if ($state.params.placa) {
    $scope.enviarPlaca($state.params.placa)
  }
})
