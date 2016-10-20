;(function(angular){
	"use strict";

	angular
	.module("mApp")
	.controller("AddMovieCtrl", ["$scope", "MovieService", AddMovieCtrl]);

	function AddMovieCtrl($scope, MovieService) {
		$scope.movieTitle = "";
		$scope.movieDescription = "";
		$scope.movieImgUrl = "";

		$scope.addMovie = function() {
			let dateNow = new Date().toJSON().slice(0, 10);
			
			MovieService.addMovie({
				title: $scope.movieTitle,
				description: $scope.movieDescription,
				imgUrl: $scope.movieImgUrl,
				date: dateNow,
				numberOfLikes: 0,
				numberOfComments: 0
			}).then(() => {
				$scope.movieTitle = "";
				$scope.movieDescription = "";
				$scope.movieImgUrl = "";
			});
		};
	}
})(angular);