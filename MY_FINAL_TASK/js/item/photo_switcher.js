/*------------------------------------------------------------
Фото-свитчер
-------------------------------------------------------------*/
var largeImg = document.querySelector('.large-image');
var thumbs = document.querySelector('.thumbs');

thumbs.onclick = function(e){
	var target = e.target;
	if(target.href === largeImg.src){
		return;
	}
	while (target != this) {

    if (target.nodeName == 'A') {
        var targetImg = target.querySelector('img');        	
        showThumb(target.href);
        e.preventDefault();        
        getDark(target);
        
    }  
    target = target.parentNode;
    }
}
function showThumb(href){
	largeImg.src = href;
}

function getDark(elem){
	var thumbLi = elem.parentElement;
	var darkDiv = thumbLi.querySelector('.darkness');	
	if(darkDiv.classList.contains('get-dark')){
		return;
	}
	var darkElem = document.querySelector('.get-dark');
	darkElem.classList.remove('get-dark');
	darkDiv.classList.add('get-dark');
}