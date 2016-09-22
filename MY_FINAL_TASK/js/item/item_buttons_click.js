/*------------------------------------------------------------
Переключение кнопок выбора
-------------------------------------------------------------*/
var sizeUl = document.querySelector('ul.size-buttons');
var sizeButtons = document.querySelectorAll('ul.size-buttons li');
var colorUl = document.querySelector('.color-buttons');
var colorButtons = document.querySelectorAll('ul.color-buttons li');
sizeUl.onclick = function(e){
	var target = e.target;
	if(target.className === 'selected'){
		return;
	}		
	for(var i = 0; i<sizeButtons.length; i++){
		sizeButtons[i].classList.remove('selected');
	}
	target.classList.add('selected');
}
colorUl.onclick = function(e){
	var target = e.target;
	if(target.className === 'selected'){
		return;
	}		
	for(var i = 0; i<colorButtons.length; i++){
		colorButtons[i].classList.remove('selected');
	}
	target.classList.add('selected');
}