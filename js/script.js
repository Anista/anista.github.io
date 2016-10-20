'use strict';
/*function to animate scrolling on page*/
$(function() {
	$('header>nav a').click(function(e) {
		e.preventDefault();
		if (this.hash) {
			var hash = this.hash.substr(1);
			var $toElement = $('section[id=' + hash + ']');
			var toPosition = $toElement.position().top;
			$('body,html').animate({
				scrollTop: toPosition
			}, 1000);
		}
	});
	return false;
});
/*function to show modal window with image and information about work*/
$(function() {
	var modalCreated = false;
	var worksDescription = {
		carousel: {
			bgUrl: "img/large/carousel.jpg",
			title: "Image carousel",
			description: 'The autoplay image carousel widget with jQuery and CSS3. By clicking on the sidebar navigation menu there is a transition to the corresponding image. On the page can exist several carousels.',
			information: ['html', 'css', 'js', 'jquery'],
			hrefNewtab: "../carousel/index.html",
			hrefSource: "https://github.com/Anista/anista.github.io/tree/master/carousel"
		},
		stopwatch: {
			bgUrl: "img/large/stopwatch.jpg",
			title: "Stopwatch",
			description: 'The stopwatch widget with Native JS and Bootstrap framework. Clicking on the "Start"/"Stop" button starts/stops the progress. The "Lap" button adds the current result on the list of results. The "Reset" button stops the progress, reset the stopwatch and deletes the list of laps',
			information: ['html', 'css', 'js', 'bootstrap'],
			hrefNewtab: "../stopwatch/index.html",
			hrefSource: "https://github.com/Anista/anista.github.io/tree/master/stopwatch"
		},
		tagList: {
			bgUrl: "img/large/tagList.jpg",
			title: "Tag list",
			description: 'The tag list widget with Native JS. Clicking on "Edit tags" button open editing panel. The "Add tag" button puts the entered tag in tags list. A tag can be deleted using cross-button next to the tag.',
			information: ['html', 'css', 'js'],
			hrefNewtab: "../taglist/index.html",
			hrefSource: "https://github.com/Anista/anista.github.io/tree/master/taglist"
		},
		formValidation: {
			bgUrl: "img/large/formValidation.jpg",
			title: "Form validation",
			description: 'The field is being validated in the process of input. If the field contains an invalid value, the form cannot be submitted for processing until it is corrected.',
			information: ['html', 'css', 'js', 'bootstrap'],
			hrefNewtab: "../formValidation/index.html",
			hrefSource: "https://github.com/Anista/anista.github.io/tree/master/formValidation"
		},
		contextMenu: {
			bgUrl: "img/large/contextMenu.jpg",
			title: "Context menu",
			description: 'Context menu with Native JS. Right click opens the context menu. Hovering menu item opens the submenu.',
			information: ['html', 'css', 'js'],
			hrefNewtab: "../contextMenu/index.html",
			hrefSource: "https://github.com/Anista/anista.github.io/tree/master/contextMenu"
		},
		guessing: {
			bgUrl: "img/large/guessing.jpg",
			title: "Quessing",
			description: "It's a game. Mr.Owl think of number, then user try to guess it. There is a limited number of attempts. Every time Mr.Owl gives a hint.",
			information: ['html', 'css', 'js'],
			hrefNewtab: "../guessing/index.html",
			hrefSource: "https://github.com/Anista/anista.github.io/tree/master/guessing"
		},
		thePortfolio: {
			bgUrl: "img/large/the_portfolio.jpg",
			title: "The portfolio",
			description: "This is a webpage converted from PSD. Used free PSD template from: www.pcklab.com",
			information: ['html', 'css'],
			hrefNewtab: "../thePortfolio/index.html",
			hrefSource: "https://github.com/Anista/anista.github.io/tree/master/thePortfolio"
		},
		constellation: {
			bgUrl: "img/large/constellation.jpg",
			title: "Constellation",
			description: "This is a website converted from PSD. Used free PSD template from: dribbble.com. It consists of Home page and Post page. Also created menu using Native JS.",
			information: ['html', 'css', 'js'],
			hrefNewtab: "../constellation/index.html",
			hrefSource: "https://github.com/Anista/anista.github.io/tree/master/constellation"
		},
		arcadia: {
			bgUrl: "img/large/arcadia.jpg",
			title: "Arcadia",
			description: "This is a website converted from PSD. Used free PSD template from: dribbble.com. Created menu and smoth scrolling using JS and jQuery. Also created carousel using Bootstrap.",
			information: ['html', 'css', 'js', 'jQuery','bootstrap'],
			hrefNewtab: "../arcadia/index.html",
			hrefSource: "https://github.com/Anista/anista.github.io/tree/master/arcadia"
		},
		restaurantMenu: {
			bgUrl: "img/large/restaurantMenu.jpg",
			title: "Restaurant menu",
			description: "This is a webpage converted from PSD. Used CSS3 properties. All web browsers support.",
			information: ['html', 'css', 'css3'],
			hrefNewtab: "../restaurantMenu/index.html",
			hrefSource: "https://github.com/Anista/anista.github.io/tree/master/restaurantMenu"
		},
		mooovies: {
			bgUrl: "img/large/mooovies.jpg",
			title: "Mooovies",
			description: "It's an web application created using Bootstrap classes and layout, AngularJS framework and Firebase as a back-end. Admin can add and edit movies, approve users comments before they are shown on the page. Users can add comments, like movies and search for movies by title. ",
			information: ['bootstrap', 'AngularJS', 'firebase'],
			hrefNewtab: "https://movies-c2f1d.firebaseapp.com/",
			hrefSource: "https://github.com/Anista/anista.github.io/tree/master/mooovies"
		}
	};
	var modal = $('.modal');
	var modalBg = $('.modal-bg');
	var imgWrapper = $('.img-wrapper');
	var img = imgWrapper.find('img');
	var description = $('.description');
	var title = description.find('.title');
	var workDescr = $('.work-descr');
	var workInfo = description.find('.work-info');
	var btNewTab = description.find('#newTab');
	var btSource = description.find('#source');
	var modalOpened = false;

	$('.works').on('click', '.work-item', function() {
		var id = $(this).attr('id');
		var work = worksDescription[id];
		showModal(work);
	});
	modalBg.on('click', hideModal);
	$('.bt').on('click', hideModal);

	//show modal window 
	function showModal(work) {
		modal.fadeIn('slow');
			img.attr('src', work.bgUrl);
			title.text(work.title);
			workDescr.text(work.description);
			for (var i = 0; i < work.information.length; i++) {
				var inf = $('<span></span>').addClass('inf').text(work.information[i]);
				workInfo.append(inf);
			}
			btNewTab.attr('href', work.hrefNewtab);
			btSource.attr('href', work.hrefSource);
			modalOpened = true;
	}
	//function to hide modal window
	function hideModal() {
		modal.fadeOut('slow', function() {
			workInfo.text('');
			img.attr('src','');
			modalOpened = false;
		});
	}
	return false;
});
//function to show work title on hover
$(function (){
	var work = $('.work-item');
	work.on('mouseenter', function(){
		$(this).find('.work-title').fadeIn(400);
	});
	work.on('mouseleave', function(){
		$(this).find('.work-title').fadeOut(400);
	});
return false;
});
