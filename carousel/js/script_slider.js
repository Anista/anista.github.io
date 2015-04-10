'use strict';
$(window).load(function() {
	var $load_screen = $(".load-screen");
	$load_screen.fadeOut(2000, function() {
		$load_screen.remove()
	});
});


(function() {
	//function to create slider's DOM
	function createSliderDom(parent, images) {
		//create wrapper for slider
		var $wrapper = $('<div>');
		$wrapper.addClass('wrapper');
		parent.append($wrapper);
		//add id to every wrapper
		var index = $('.wrapper').length;
		$wrapper.attr('id', 'wr_' + index);
		//create slider navigation
		var $nav = $('<ul>').addClass('nav').appendTo($wrapper);
		for (var i = 0; i < 4; i++) {
			$nav.append($('<li>').addClass('navItem image_'+i).attr('id', i));
		}
		//create images section
		var $imagesWrapper = $('<div>');
		$imagesWrapper.addClass('imagesWrapper');
		$wrapper.append($imagesWrapper);
		var $imagesItems = $('<ul>');
		$imagesItems.addClass('imagesItems');
		$imagesWrapper.append($imagesItems);
		for (var j = 0; j < 4; j++) {
			var $imageItem = $('<li>');
			$imageItem.addClass('imageItem');
			$imageItem.attr('id', 'imIt_' + j);
			$imagesItems.append($imageItem);
			var $img = $('<img>').attr('src', images[j]);
			$imageItem.append($img);
		}
	}
	window.createSliderDom = createSliderDom;
})();

//function to animate slider
$(function() {
	'use strict';
	var width = 910;
	var animationSpeed = 1000;
	var pause = 2000;
	var pause2 = 5000; // pause onclick on navigation bar (must be bigger than pause)
	//add animation to every slider
	$('.wrapper').each(function(index, element) {
		var $slider = $(element);
		var $nav = $slider.find('.nav');
		var $navItem = $nav.find('.navItem');
		var $firstItem = $navItem.first();
		$firstItem.addClass('active');
		var navInterval = startAnimation($slider);
		var timeout;
		// add click event to navigation bar
		$slider.on('click', '.navItem', function() {
			var $selectedNavItem = $(this);
			$slider.find('.nav .navItem').removeClass('active');
			$selectedNavItem.addClass('active');
			resetAnimation($slider);
			var index = $selectedNavItem.attr('id');
			sliderSwitch(index, $slider);
			clearInterval(navInterval);
			clearTimeout(timeout);
			timeout = setTimeout(function() {
				navInterval = startAnimation($slider);
			}, pause2 - pause);
			return false;
		});
	});

	//automatic start animation with time
	function startAnimation(slider) {
		return setInterval(function() {
			var $slider = $(slider);
			var $nav = $slider.find('.nav');
			var $navItem = $nav.find('.navItem');
			var $firstItem = $navItem.first();
			var $activeItem = $nav.find('.active');
			$activeItem.removeClass('active');
			var $nextItem = $activeItem.next();
			if ($nextItem.length === 0) {
				$nextItem = $firstItem;
			}
			$nextItem.addClass('active');
			var $nextItemId = $nextItem.attr('id');
			sliderSwitch($nextItemId, $slider);
		}, pause);
	}

	//function to slide images
	function sliderSwitch(index, currentSlider) {
		var $imagesItems = $(currentSlider).find('.imagesItems');
		$imagesItems.animate({
			'margin-left': '-' + width * index
		}, animationSpeed);
	}
	//if there are a lot of click - clear images queue
	function resetAnimation(slider) {
		var $imagesItems = $(slider).find('.imagesItems');
		$imagesItems.clearQueue();
	}

});