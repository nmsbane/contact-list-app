var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ["$scope", function($scope) {
	console.log("hello world from controller");
}]);