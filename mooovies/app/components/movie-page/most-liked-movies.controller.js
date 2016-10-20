;(function(angular) {
	"use strict";

	angular
	.module("mApp")
	.controller("MostLikedMoviesCtrl", ["$scope", "$location", "MovieService", MostLikedMoviesCtrl]);

	function MostLikedMoviesCtrl($scope, $location, MovieService) {
		$scope.movies = [];

		$scope.goToMovie = function (movie) {
			let movieId = movie.$id;
			$location.url('movie/' + movieId);
		};
		
		MovieService.getMostLiked().then(movies => $scope.movies = movies);
	}

})(angular);