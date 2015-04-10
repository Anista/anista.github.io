'use strict';

$(window).load(function() {
	var $load_screen = $(".load-screen");
	$load_screen.fadeOut(2000, function() {
		$load_screen.remove()
	});
});

(function() {
	var ESC_KEY = 27;
	var SUBMENU = 'context-menu-submenu';

	function ContextMenu(node, menuStructure) {
			this.root = node;
			this.menu = this._createMenuStructure(menuStructure);
			this._subMenu();
			document.body.appendChild(this.menu);
			this.root.addEventListener('contextmenu', this._onContextMenu.bind(this), false);
			document.documentElement.addEventListener('click', this._onGlobalClick.bind(this), false);
		}
		/* Function to create context menu */
	ContextMenu.prototype._createMenuStructure = function(structure) {
		var menuList = document.createElement('ul');
		menuList.className = 'context-menu';
		var menuItem;
		var menuElem;

		for (var i = 0; i < structure.length; i += 1) {
			menuItem = document.createElement('li');
			menuElem = structure[i];
			menuItem.textContent = menuElem.title;
			if (menuElem.submenu) {
				menuItem.className += SUBMENU;
				menuItem.appendChild(this._createMenuStructure(menuElem.submenu));
				var arrow = document.createElement('div');
				arrow.textContent = '➢';
				arrow.style.display = "inline-block";
				arrow.style.cssFloat = "right";
				arrow.style.clear = "both";
				arrow.style.height = "22px";
				menuItem.appendChild(arrow);
			} else {
				menuItem.addEventListener('click', menuElem.action, false);
			}
			menuList.appendChild(menuItem);
		}
		return menuList;
	};
	/*Function to create submenu*/
	ContextMenu.prototype._subMenu = function() {
		var subMenus = this.menu.querySelectorAll('.' + SUBMENU);
		for (var i = 0; i < subMenus.length; i += 1) {
			(function(i) {
				var subMenu = subMenus[i].querySelector('ul');
				subMenus[i].addEventListener('mouseenter', function() {
					subMenu.style.display = 'block';
				});
				subMenus[i].addEventListener('mouseleave', function() {
					subMenu.style.display = 'none';
				});
			})(i);
		}
	};
	/* Function to show menu */
	ContextMenu.prototype.show = function(x, y) {
		this.menu.style.display = 'block';
		this.menu.style.left = x + 'px';
		this.menu.style.top = y + 'px';
	};
	/* Function hide menu */
	ContextMenu.prototype.hide = function() {
		this.menu.style.display = 'none';
	};

	function topWalker(node, testFunc, lastParent) {
		while (node && node !== lastParent) {
			if (testFunc(node)) {
				return node;
			}
			node = node.parentNode;
		}
	}
	ContextMenu.prototype._onGlobalClick = function(event) {
		var menu = this.menu;
		if (!topWalker(event.target, function(node) {
				return menu === node;
			})) {
			this.hide();
		}
	};
	ContextMenu.prototype._onContextMenu = function(event) {
		event.preventDefault();
		var x = event.pageX;
		var y = event.pageY;
		this.show(x, y);
	};
	window.ContextMenu = ContextMenu;
})();