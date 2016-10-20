;(function(angular, firebase) {
	"use strict";

	var mApp = angular.module("mApp", ["firebase", "ngRoute"]);

	//_______routing_________________________________________________________________________________
	angular
	.module("mApp")
	.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
		$locationProvider.html5Mode(true);
		$routeProvider
		.when("/", {
			controller: "MoviesCtrl",
			templateUrl : "app/components/main-page/main_page.view.html"
		})
		.when("/signup", {
			controller: "SignUpCtrl",
			templateUrl: "app/components/sign-up/sign-up.view.html"
		})
		.when("/signin", {
			controller: "SignInCtrl",
			templateUrl : "app/components/sign-in/sign-in.view.html"
		})

		.when("/movie/add",{
			controller: "AddMovieCtrl",
			templateUrl: "app/components/add-movie/add_movie.view.html"
		})
		.when("/movie/:id", {
			controller: "MovieCtrl",
			templateUrl: "app/components/movie-page/movie.view.html"
		})
		.when("/comments", {
			controller: "NewCommentsCtrl",
			templateUrl: "app/components/comments/new-comments.view.html"
		});
	}]);

	function initFirebase() {
		// Initialize Firebase
		var config = {
			apiKey: "AIzaSyB7eksad9SUgC0K_orunmy5_L95DqI4Gks",
			authDomain: "movies-c2f1d.firebaseapp.com",
			databaseURL: "https://movies-c2f1d.firebaseio.com",
			storageBucket: "movies-c2f1d.appspot.com",
			messagingSenderId: "76393713091"
		};
		firebase.initializeApp(config);

  		// // Initialize Firebase
  		// var config = {
  		// 	apiKey: "AIzaSyCwVW8YZWmAzQr5Z1xUlvN1-JYHm86U9_0",
  		// 	authDomain: "project-1e9de.firebaseapp.com",
  		// 	databaseURL: "https://project-1e9de.firebaseio.com",
  		// 	storageBucket: "project-1e9de.appspot.com",
  		// 	messagingSenderId: "1036731458660"
  		// };

  		// firebase.initializeApp(config);
  	};

  	initFirebase();

  	angular
  	.module("mApp")
  	.run(['$rootScope', '$location', function ($rootScope, $location) {
  		firebase.auth().onAuthStateChanged(function (user) {
  			if (user) {
  				let uid = user.uid;
  				firebase.database().ref('/admins/' + uid).on('value', function (snapshot) {
  					$rootScope.$applyAsync(function () {
  						$rootScope.isAdmin = !!snapshot.val();
  					});
  				});
  			} else {
  				$location.url('signin');
  			}
  		});
  	}])
  })(angular, firebase);