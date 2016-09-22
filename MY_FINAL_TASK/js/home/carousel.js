var carousel = document.querySelectorAll('.carousel');
var carouselPhone = document.querySelector('.carousel-phone')
var points = document.querySelectorAll('.points li a');
var position = +document.querySelector('.points li a.active').getAttribute('data-shift');
var interval = setInterval(nextStep, 3000);//добавляет интервал автоматическому смещению
/*------------------------------------------------------------
Смещает карусель при клике на поинт
-------------------------------------------------------------*/
function addActiveClass(e){
	for(var i =0; i< points.length; i++){
		var point = points[i];
		point.classList.remove('active');
	}
	e.target.classList.add('active');
	for(var j =0; j<carousel.length; j++){
		carousel[j].style.left = e.target.dataset.shift + '%';
	}
	position = +e.target.dataset.shift;
	clearInterval(interval);
	return false;
}

for(var i =0; i<points.length; i++){
	var point = points[i];
	point.addEventListener('click', addActiveClass);
}
/*------------------------------------------------------------
Автоматическое смещение изображений
-------------------------------------------------------------*/	
function nextStep(){
	if(position <= -300){
		position = 0;
		carousel[0].style.left = 0;	
		carouselPhone.style.left = 0		
	} else{			
		carousel[0].style.left = position - 100 + '%';
		carouselPhone.style.left = position - 100 + '%';
		position -= 100;			
	}
	for(var i = 0; i<points.length; i++){
		var point = points[i];
		point.classList.remove('active');
		if(+point.dataset.shift === position){
			point.classList.add('active');
		}
	}				
}
var nextArrow = document.querySelector('.next');
var prevArrow = document.querySelector('.prev');
for(var j =0; j<carousel.length; j++){	
	var carouselLeft = parseInt(getComputedStyle(carousel[j]).left);
}
nextArrow.onclick = function(){
	clearInterval(interval);
	if(position <= -300){
		position = 0;
		carousel[0].style.left = 0;	
		carouselPhone.style.left = 0		
	} else{			
		carousel[0].style.left = position - 100 + '%';
		carouselPhone.style.left = position - 100 + '%';
		position -= 100;			
	}
	for(var i = 0; i<points.length; i++){
		var point = points[i];
		point.classList.remove('active');
		if(+point.dataset.shift === position){
			point.classList.add('active');
		}
	}
}
prevArrow.onclick = function(){
	clearInterval(interval);
	if(position === 0){
		position = -300;
		carousel[0].style.left = '-300%';	
		carouselPhone.style.left = '-300%';		
	} else{			
		carousel[0].style.left = position + 100 + '%';
		carouselPhone.style.left = position + 100 + '%';
		position += 100;			
	}
	for(var i = 0; i<points.length; i++){
		var point = points[i];
		point.classList.remove('active');
		if(+point.dataset.shift === position){
			point.classList.add('active');
		}
	}
}

	

