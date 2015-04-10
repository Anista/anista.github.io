(function() {
	'use strict';

	var mode = {
		edit: 'Edit tags',
		finish: 'Finish edit tags'
	};

	//function to create tags list 
	function Taglist(node, tags) {
			//create button to change mode
			var tagListWrapper = $('<div>').addClass('tagListWrapper').appendTo(node);
			var editing = $('<div>').addClass('editing').appendTo(tagListWrapper)
			var changeMode = $('<span></span>').addClass('changeMode').appendTo(editing);
			changeMode.text(mode.edit);
			//create input field
			var inputField = $('<div></div>').addClass('input-field').insertAfter(changeMode).hide();
			var input = $('<input>').addClass('input').appendTo(inputField);
			var addButton = $('<input type="button" value = "Add tag"/>').addClass('add-button').appendTo(inputField);
			//create tags field
			var tagsField = $('<div></div>').addClass('tagsField').appendTo(tagListWrapper);
			//create tags if tags exist
			if (tags) {
				for (var i = 0; i < tags.length; i++) {
					var inputText = tags[i].trim();
					if (inputText) {
						var tag = $('<span></span>').addClass('tag').appendTo(tagsField).text(inputText);
						//add different colors
						var colorClass = addColorClass();
						tag.addClass(colorClass);
						//add remove button
						var removeTag = $('<span>x</span>').addClass('remove-tag-button').insertAfter(tag).hide();
						removeTag.addClass(colorClass);
					}
				}
				return tagListWrapper;
			}
		}
	//function to get different color class to every tag
	var counter = 0;
	function addColorClass() {
		var colorClasses = ['yellow', 'green', 'red', 'blue', 'pink'];
		counter++;
		if (counter === colorClasses.length) {
			counter = 0;
		}
		return colorClasses[counter];
	}
	window.addColorClass = addColorClass;
	window.Taglist = Taglist;
})();

$(function() {
	'use strict';
	var mode = {
		edit: 'Edit tags',
		finish: 'Finish edit tags'
	};

	$('.tagListWrapper').each(function(index, element) {
		var list = $(element);
		var addButton = list.find('.add-button');
		addButton.on('click', function() {
			createTag(list);
			/*list.find('.input').val('');*/
		});
		var tagsField = list.find('.tagsField');
		tagsField.on('click', '.remove-tag-button', function() {
			removeTag($(this));
		});
		var changeModeButton = list.find('.changeMode');
		changeModeButton.on('click', function() {
			var button = $(this);
			changeMode(button, list);
		});

		//on enter click - create new tag, using value of current active input
		list.find('.input').on('keydown', function(e) {
			if (e.keyCode === 13) {
				createTag(list);
				list.find('.input').focus().val('');
			}
		});
	});
	//function to create every tag
	function createTag(list) {
		var inputText = list.find('.input').val().trim();

		if(inputText.length>50){
			createError(list);

		} else{
			list.find('.error').hide();

		//check exist input text
			if (!checkExistTag(inputText, list) && inputText) {
				var tag = $('<span></span>').addClass('tag').appendTo(list.find('.tagsField')).text(inputText);
				//add different colors
				var colorClass = addColorClass();
				tag.addClass(colorClass);

				//add remove button
				var removeTag = $('<span>x</span>').addClass('remove-tag-button').insertAfter(tag);
				removeTag.addClass(colorClass);
				list.find('.input').val('');
			}
		}
	}

	//function to remove tag after click on remove button
	function removeTag(button) {
		var removedTag = button.prev();
		removedTag.remove();
		button.remove();
	}

	//check exist tag in tags field
	function checkExistTag(tag, list) {
		var tags = list.find('.tag').get();
		for (var i = 0; i < tags.length; i++) {
			if (tags[i].outerText === tag) {
				return true;
			}
		}
		return false;
	}

	//function to change edit mode
	function changeMode(button, list) {
		var changeModeButton = list.find('.changeMode');
		var buttonText = button.text();
		if (buttonText === mode.finish) {
			changeModeButton.text(mode.edit);
			list.find('.input-field').hide();
			list.find('.remove-tag-button').hide();
			list.find('.error').hide();
		} else {
			changeModeButton.text(mode.finish);
			list.find('.input-field').show();
			list.find('.remove-tag-button').show();
		}
	}

	//function to create error
	function createError(list){
		var error = $('<div>').addClass('error').appendTo(list.find('.input-field')).text("Max tag's length is 50 characters");
	}
})