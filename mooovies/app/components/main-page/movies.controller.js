;(function(angular){
	"use strict";

	angular
	.module("mApp")
	.controller("MoviesCtrl", ["$scope", "MovieService", "CommentsService", "$location", MoviesCtrl]); 

	function MoviesCtrl($scope, MovieService, CommentsService, $location) {
		$scope.orderByKey = 'date';
		
		$scope.movies = [];

		MovieService.getAll().then(movies => $scope.movies = movies);

		$scope.goToMovie = function(mId) {
			$location.url('/movie/' + mId);
		};

		$scope.showAllMovies = function () {
			$scope.orderByKey = 'date';
			MovieService.getAll().then(movies => $scope.movies = movies);
		};

		$scope.showYouCommented = function () {
			$scope.orderByKey = 'date';
			MovieService.getCommentedByMe().then(movies => $scope.movies = movies);
		};

		$scope.showYouLiked = function () {
			$scope.orderByKey = 'date';
			MovieService.getLikedByMe().then(movies => $scope.movies = movies);
		};

		$scope.showMostLiked = function () {
			$scope.orderByKey = 'numberOfLikes';
			// all movies have already loaded
		};

		$scope.showMostCommented = function () {
			$scope.orderByKey = 'numberOfComments';
			// all movies have already loaded
		};

		$scope.goToNewComments = function() {
			$location.url('/comments');
		};

		$scope.numberOfNewComments = 0;

		CommentsService.getNewCommentsCount().then(count => $scope.numberOfNewComments = count);

		$scope.movieFilter = {};

		$scope.search = function(movieTitle) {
			$scope.movieFilter.title = movieTitle;
		}

		$scope.addMovie = function() {
			$location.url("movie/add");
		}
	}
})(angular);
