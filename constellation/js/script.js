(function(){
	"use strict";
	var menu = document.querySelector(".menu");
	var openMenuBt = document.querySelector(".open-menu");
	openMenuBt.addEventListener("click", openMenu, false);
	var closeMenuBt = document.querySelector(".close");
	closeMenuBt.addEventListener("click", closeMenu, false);
	var links = menu.querySelectorAll("a");
	for(var i=0;i<links.length;i++){
		links[i].addEventListener("click", closeMenu, false);
	}
	var menuOpend = false;
	document.addEventListener("click", function(event){
		if(menuOpend){
			if(!findParent(event.target,"menu")){
				closeMenu();
			}
		}else{
			document.removeEventListener("click");
		}
	},false);

	function openMenu(){
		var interval = setInterval(show, 2);
		function show(){
			var leftPosition = window.getComputedStyle(menu).left;
			var left = parseInt(leftPosition);
			var plused = Math.abs(left)/10;
			menu.style.left =left + plused +'px';
			if(parseInt(leftPosition) >= 0){
				clearInterval(interval);
				menuOpend = true;
			}
		}
	}

	function closeMenu(){
		var interval = setInterval(hide, 2);
		function hide(){
			var width = parseInt(window.getComputedStyle(menu).width);
			var left = parseInt(window.getComputedStyle(menu).left);
			var minused = width/50;
			menu.style.left = left - minused +'px';
			if(Math.abs(left)>=width){
				clearInterval(interval);
				menuOpend = false;
			}
		}
	}

	function findParent(node,cls){
		while(node && !node.classList.contains(cls)){
			node = node.parentElement;
		}
		return !!node && node.classList.contains(cls);
	}
})();










