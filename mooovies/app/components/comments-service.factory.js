;(function(angular, firebase) {
	"use strict";

	angular
	.module('mApp')
	.factory('CommentsService', ['$q', CommentsServiceFactory]);

	function CommentsServiceFactory($q) {

		let ref = firebase.database().ref();

		function getNewCommentsCount() {
			let promise = $q(function (resolve) {
				ref.child('/new-comments').once('value', function (snapshot) {
					resolve(snapshot.numChildren());
				});
			});
			return promise;
		}
		
		return {
			getNewCommentsCount: getNewCommentsCount
		};
	}

})(angular, firebase);