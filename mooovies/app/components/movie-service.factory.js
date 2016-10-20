;(function(angular, firebase) {
	"use strict";

	angular
	.module('mApp')
	.factory('MovieService', ['$q', '$firebaseObject', MovieServiceFactory]);

	function MovieServiceFactory($q, $firebaseObject) {

		let ref = firebase.database().ref();

		function getAllMovies() {
			let promise = $q(function (resolve) {
				ref.child('/movies').once('value', function (snapshot) {
					let movies = [];
					let moviesObj = snapshot.val();
					if (moviesObj) {
						for (var movieId in moviesObj) {
							let movie = moviesObj[movieId];
							movie.$id = movieId;
							movies.push(movie);
						}
					}
					resolve(movies);
				});
			});
			return promise;
		}

		function getMoviesCommentedByMe() {
			let promise = $q(function (resolve) {
				let unsubscribe = firebase.auth().onAuthStateChanged(function (user) {
					if (user) {
						let uid = user.uid;
						ref.child('/users/' + uid + '/movie-comments').once('value', function (snapshot) {
							let movies = [];
							let movieCommentsObj = snapshot.val();
							if (movieCommentsObj) {
								for (var movieId in movieCommentsObj) {
									movies.push($firebaseObject(ref.child('/movies/' + movieId)));
								}
							}
							resolve(movies);
						});
						unsubscribe();
					}
				});
			});
			return promise;
		}

		function getMoviesLikedByMe() {
			let promise = $q(function (resolve) {
				let unsubscribe = firebase.auth().onAuthStateChanged(function (user) {
					if (user) {
						let uid = user.uid;
						ref.child('/users/' + uid + '/likes').once('value', function (snapshot) {
							let movies = [];
							let movieCommentsObj = snapshot.val();
							if (movieCommentsObj) {
								for (var movieId in movieCommentsObj) {
									movies.push($firebaseObject(ref.child('/movies/' + movieId)));
								}
							}
							resolve(movies);
						});
						unsubscribe();
					}
				});
			});
			return promise;
		}

		function getMostLikedMovies() {
			let promise = $q(function (resolve) {
				let query = ref.child('/movies').orderByChild('numberOfLikes').limitToLast(3);
				query.once('value', function (snapshot) {
					let movies = [];
					let moviesObj = snapshot.val();
					if (moviesObj) {
						for (var movieId in moviesObj) {
							let movie = moviesObj[movieId];
							movie.$id = movieId;
							movies.push(movie);
						}
					}
					resolve(movies);
				});
			});
			return promise;
		}

		function addMovie(movie) {
			let promise = $q(function (resolve) {
				ref.child('/movies').push(movie).then(resolve);
			});
			return promise;
		}

		return {
			getAll: getAllMovies,
			getCommentedByMe: getMoviesCommentedByMe,
			getLikedByMe: getMoviesLikedByMe,
			getMostLiked: getMostLikedMovies,
			addMovie: addMovie
		};
	}

})(angular, firebase);