/*------------------------------------------------------------
Меню для мобильной версии
-------------------------------------------------------------*/
var menuButton = document.querySelector('.menu-phone a');
var dropMenu = document.querySelector('.dropdown-menu-wrap');
var menuImage = document.querySelector('.menu-ico');
var pressed = false;
menuButton.onclick = function(e){
	dropMenu.classList.toggle('pressed');
	if(dropMenu.classList.contains('pressed')){
		menuImage.src = 'img/home/phone/ico_close.png';
	} else{
		menuImage.src = 'img/home/phone/ico_menu.png';
	}		
	return false;
}

	
