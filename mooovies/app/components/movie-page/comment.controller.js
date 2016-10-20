;(function(angular, firebase){
	"use strict";

	angular
	.module("mApp")
	.controller("CommentCtrl", ["$scope", "$firebaseArray", "$firebaseAuth", "$firebaseObject", CommentCtrl]);

	function CommentCtrl($scope, $firebaseArray, $firebaseAuth, $firebaseObject) {

		const movieId = this.movieId;
		
		let ref = firebase.database().ref();
		let comments = ref.child("comments");
		let newComments = ref.child("new-comments");

		$scope.currMovieComments = [];


		$scope.addComment = function() {
			let content = $scope.commentContent;
			let userUid = $firebaseAuth().$getAuth().uid;
			let name = $firebaseAuth().$getAuth().displayName;
			let dateNow = (new Date()).toJSON().slice(0,10);
			let selectedMovie = movieId;

			newComments.push({
				movieId: selectedMovie,
				content: content,
				userUid: userUid,
				name: name,
				date: dateNow
			}).then(function () {
				$scope.$apply(function () {
					$scope.commentContent = '';
				});
			}).catch(function (error) {
				console.log(error);
			});
		};

		let commentsIds = ref.child('/movies/' + movieId + '/comments');

		commentsIds.on('child_added', function (snapshot) {
			let commentId = snapshot.key;
			let commentRef = comments.child(commentId);
			let commentObj = $firebaseObject(commentRef);
			$scope.currMovieComments.push(commentObj);
		}, $scope);
    }

})(angular, firebase);

