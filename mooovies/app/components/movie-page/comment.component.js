;(function(angular){
	"use strict";

	angular
	.module("mApp")
	.component("movieComments", {
	    templateUrl: 'app/components/movie-page/comment.view.html',
	    controller: 'CommentCtrl',
	    bindings: {
	    	movieId: '<'
	    }
    });
})(angular);