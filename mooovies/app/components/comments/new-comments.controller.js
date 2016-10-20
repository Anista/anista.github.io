;(function(angular, firebase){
	"use strict";

	angular
	.module("mApp")
	.controller("NewCommentsCtrl", ["$scope", "$firebaseArray", NewCommentsCtrl]);

	function NewCommentsCtrl($scope, $firebaseArray) {
		let ref = firebase.database().ref();
		let newCommentsRef = ref.child('/new-comments');

		$scope.newComments = $firebaseArray(newCommentsRef);

		$scope.approveComment = function (comment) {
			let commentId = comment.$id;
			let newComment = {
				movieId: comment.movieId,
				content: comment.content,
				userUid: comment.userUid,
				name: comment.name,
				date: comment.date
			};
			let movieId = comment.movieId;
			let userUid = comment.userUid;
			let updates = {};
			updates['/comments/' + commentId] = newComment;
			updates['/users/' + userUid + '/movie-comments/' + movieId + '/' + commentId] = true;
			updates['/movies/' + movieId + '/comments/' + commentId] = true;
			updates['/new-comments/' + commentId] = null;
			ref.update(updates).then(function () {
				ref.child('/movies/' + movieId + '/').transaction(function (movie) {
					let count = 0;
					if (movie.comments) {
						for (var key in movie.comments) {
							count++;
						}
					}
					movie.numberOfComments = count;
					return movie;
				});
		    }).catch(function (error) {
		    	console.error(error);
		    })
		};

		$scope.deleteComment = function (comment) {
			let commentId = comment.$id;
			newCommentsRef.child(commentId).remove();
		};
	}
})(angular, firebase);