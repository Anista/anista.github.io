//Function to animate menu scrolling
$(function() {
	"use strict";
	
	$('.scroll').click(function(e) {
		e.preventDefault();
		if (this.hash) {
			var hash = this.hash;
			var $toElement = $(hash);
			var toPosition = $toElement.position().top;
			$('body, html').animate({
				scrollTop: toPosition
			}, 1000);
		}
	});
	return false;
});
//Function to open/close menu
$(function(){
	"use strict";

	var menu = $(".menu");
	var menuOpened = false;
	var menuBt = $(".menu-bt").on("click", function(){
		if(!menuOpened){
			menuOpened = true;
			menu.slideDown(300);
		}else{
			menuOpened = false;
			menu.slideUp(400);
		}
	});
});