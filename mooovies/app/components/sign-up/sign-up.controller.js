;(function(angular, firebase) {
	"use strict";

	angular
	.module("mApp")
	.controller("SignUpCtrl", ["$scope", "$location", "$firebaseAuth", "$firebaseArray", SignUpCtrl]);

	function SignUpCtrl($scope, $location, $firebaseAuth, $firebaseArray) {

		const auth = $firebaseAuth();

		$scope.signUp = function() {
			const email = $scope.email;
			const pass = $scope.pass;
			const name = $scope.userName;

		    const promis = auth.$createUserWithEmailAndPassword(email, pass)
		    .then(user => {
		    	user.updateProfile({displayName: name})
		    	.then(() => {
		    		addToBase(user);
		    		$scope.$apply(() => $location.url(""));
		    	});
		    });

		    let ref = firebase.database().ref();
		    let users = ref.child("users");
		    $scope.users = $firebaseArray(users);

		    function addToBase(user) {
		    	$scope.users.$ref().child(user.uid).set({
		    		name: $scope.userName,
		    		email: $scope.email
				});
		    }   
		};

		$scope.goToSignIn = function() {
			$location.url("signin");	
		};
	}

})(angular, firebase);