;(function(angular) {
	"use strict";

	angular
	.module("mApp")
	.controller('SignInCtrl', ["$scope", "$location", "$firebaseAuth", SignInCtrl]);

	function SignInCtrl($scope, $location, $firebaseAuth) {
		const auth = $firebaseAuth();

		let ref = firebase.database().ref();
		let admins = ref.child("admins");

		$scope.signIn = function() {
			const email = $scope.email;
			const pass = $scope.pass;
			auth.$signInWithEmailAndPassword(email, pass).then((user) => {
				console.log(user.uid);
				$location.url("");
			});
		};

		$scope.goToSignUp = function() {
			$location.url("signup");
		};

	}
})(angular);