var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ["$scope", "$http",  function($scope, $http) {
	console.log("hello world from controller");

	var refresh = function() {
		$http.get('/contactlist').success(function(response) {
			console.log(response);
			$scope.contactList = response;
		});

		$scope.contact = '';
	}
	refresh();

	
	$scope.addContact = function(){
		$http.post('/contactlist', $scope.contact).success(function(response) {
			console.log("calling refresh function");
			refresh();
		});

	}	
	
	
}]);