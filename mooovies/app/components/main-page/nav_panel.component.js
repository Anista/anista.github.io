(function (angular) {
	angular
	.module('mApp')
	.component('navPanel', {
	    templateUrl: 'app/components/main-page/nav_panel.view.html',
	    controller: ['$scope', '$location', '$firebaseAuth', function ($scope, $location, $firebaseAuth) {
	    	const auth = $firebaseAuth();

	    	$scope.signOut = function () {
	    		auth.$signOut();
	    		$location.url("signin");
	    	};

	    	$scope.goToMain = function() {
	    		$location.url("");
	    	}

	    	

	    	auth.$onAuthStateChanged(user => {
	    		if (user) {
	    			console.log(user);
	    			$scope.username = user.displayName || user.email;
	    		} else {
	    			$scope.username = '';
	    		}
	    	});
	    }]
    });
})(angular);