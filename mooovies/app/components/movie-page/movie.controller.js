(function(angular, firebase){
	"use strict";

	angular
	.module("mApp")
	.controller("MovieCtrl", ["$scope", "$routeParams", "$firebaseObject", "$location", "$firebaseAuth", MovieCtrl]);

	function MovieCtrl($scope, $routeParams, $firebaseObject, $location, $firebaseAuth) {

		const movieId = $routeParams.id;
		$scope.movieId = movieId;
		const ref = firebase.database().ref();
		const movieRef = firebase.database().ref('/movies/' + movieId);

		$scope.selectedMovie = $firebaseObject(movieRef);
		$scope.editMode = false;
		$scope.editedMovie = {};
		$scope.likedByMe = false;

		firebase.auth().onAuthStateChanged(function (user) {
			if (user) {
				let uid = user.uid;
				movieRef.child('/likes/' + uid).on('value', function (snapshot) {
					$scope.$applyAsync(() => {
						$scope.likedByMe = !!snapshot.val();
					});
				})
			}
		});

		$scope.changeMode = function() {
			$scope.editMode = !$scope.editMode;
			if ($scope.editMode) {
				$scope.editedMovie.title = $scope.selectedMovie.title;
				$scope.editedMovie.description = $scope.selectedMovie.description;
			}
		};

		$scope.saveMovie = function() {
			let dateNow = (new Date()).toJSON().slice(0,10);

			$scope.selectedMovie.title = $scope.editedMovie.title;
			$scope.selectedMovie.description = $scope.editedMovie.description;
			$scope.selectedMovie.date = dateNow;
			$scope.selectedMovie.$save().then($scope.changeMode);
		};

		$scope.toggleLike = function() {
			let uid = firebase.auth().currentUser.uid;
			movieRef.child("likes").child(uid).transaction(function (currValue) {
				return !currValue ? true : null; // null = remove
			}).then(function () {
				movieRef.child("likes").child(uid).once('value', function (snapshot) {
					ref.child('/users/' + uid + '/likes/' + movieId).set(snapshot.val());
				});
				movieRef.transaction(function (movie) {
					let count = 0;
					if (movie.likes) {
						for (var key in movie.likes) {
							count++;
						}
					}
					movie.numberOfLikes = count;
					return movie;
				});
			});

		};
	}
})(angular, firebase);