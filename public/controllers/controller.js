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

	$scope.remove = function(id){
		console.log(id);
		$http.delete('/contactlist/' + id).success(function(response) {
			refresh();
		});
	}

	$scope.update = function(id) {
		$http.get('/contactlist/' + id).success(function(response) {
			$scope.contact = response;
		});
	}

	$scope.edit = function() {
		var id = $scope.contact._id;
		$http.put('/contactlist/'+id, $scope.contact).success(function(response) {
			refresh();
		});
	}

	$scope.clear = function() {
		$scope.contact = '';
	}
	
	
}]);