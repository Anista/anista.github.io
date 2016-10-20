;(function(angular){
	"use strict";

	angular
	.module("mApp")
	.component("mostLikedMovies", {
	    templateUrl: 'app/components/movie-page/most-liked-movies.view.html',
	    controller: 'MostLikedMoviesCtrl'
    });
})(angular);