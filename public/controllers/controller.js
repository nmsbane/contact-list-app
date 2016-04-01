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
		var emailRegex = /\S+@\S+\.\S+/;
		var numberRegex = /^\d{10}$/;
		var nameRegex = /^[a-zA-Z]{2,30}$/;

		var isValidate = true;
		$scope.isNameNotValid = false;
		$scope.isEmailNotValid = false;
		$scope.isNumberNotValid = false;
		// validate name
		if(!nameRegex.test($scope.contact.name) || !($scope.contact.name)) {
			$scope.isNameNotValid = true;
			isValidate = false;
		};
		// validate email address
		if(!emailRegex.test($scope.contact.email)){
			$scope.isEmailNotValid = true;
			isValidate = false;
		};
		// validate mobile number
		if(!numberRegex.test($scope.contact.number)){
			$scope.isNumberNotValid = true;
			isValidate = false;
		};
		// if every field is valid, then only call the post method
		if(isValidate) {
			$http.post('/contactlist', $scope.contact).success(function(response) {
			console.log("calling refresh function");
			refresh();
			});
		}
		
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