var firstChildSelected = false;
var lastChildSelected = false;
var filterWrap = document.querySelector('.filter-desctop');
var firstFilterElem = document.querySelector('.options:first-child');
var lastFilterElem = document.querySelector('.options:last-child');
var filterTablet = document.querySelector('.filter-tablet');
var values = document.querySelectorAll('.values');

/*------------------------------------------------------------
Функционал для филтра(desctop версия)
-------------------------------------------------------------*/
function selectFilter(e){		
	var target = e.target;
	if(target.tagName !== 'A'){
		return;
	}
	e.preventDefault();		
	var targetName = target.innerHTML;
	var optionParent = target.parentElement;
	while(optionParent.className !== 'options'){
		optionParent = optionParent.parentElement;
	}
	var tabletFilter = document.querySelectorAll('.tablet-filter-text span');
		
	var optionTitle = optionParent.querySelector('.option-title');
	var optionP = optionParent.querySelector('.option-title p');		
	optionP.style.cssText = 'font-size: 12px; padding-top: 15px;';		
	var selected = optionTitle.querySelector('.selected');
		
	selected.innerHTML = targetName;
	optionParent.style.backgroundColor = '#f7f7f7';

	var optionsBlock = target.parentElement;
	while(optionsBlock.className !== 'select-filter'){
		optionsBlock = optionsBlock.parentElement;
	}	
	//убираем блок с выбором фильтра	
	optionsBlock.style.display = 'none';
	setTimeout(function(){
		optionsBlock.style.display = '';
	}, 100);
	//---------------------------------
	for(var i =0; i<tabletFilter.length; i++){
		if(tabletFilter[i].classList.contains(selected.dataset.filtered)){
			tabletFilter[i].innerHTML = targetName;
			tabletFilter[i].style.color = "#c82749";				
			SelectInTabletModalFilter(tabletFilter[i]);				
		}
	}			
	//добавление градента при выборе первой или последней из опций фильтра
	if(firstChildSelected && lastChildSelected){
			filterWrap.style.background = '#f7f7f7';
		} 
	else if(optionParent === firstFilterElem){
		firstChildSelected = true;	
		filterWrap.style.background = "linear-gradient(to right, #f7f7f7 50%, #fff 50%, #fff 100%)";
		if(lastChildSelected){
			filterWrap.style.background = '#f7f7f7';
		} 								
	}
	else if(optionParent === lastFilterElem){
		lastChildSelected = true;			 
		filterWrap.style.background = "linear-gradient(to left, #f7f7f7 50%, #fff 50%, #fff 100%)";	
		if(firstChildSelected){
			filterWrap.style.background = '#f7f7f7';
		} 			 		
	}	
	//---------------------------------------------------------------
	return false;		
}
/*------------------------------------------------------------
функция изменияет значение в фильтре для планшета(при выборе в desctop версии)
-------------------------------------------------------------*/
function SelectInTabletModalFilter(tabletTitleElem){
	var valuesContainer = document.querySelectorAll('.values');
	for(var i = 0; i <valuesContainer.length; i++){
		var valueSpans = valuesContainer[i].querySelectorAll('.value');
		for(var j = 0; j<valueSpans.length; j++){
			var value = valueSpans[j];			
			if(value.firstChild.textContent === tabletTitleElem.textContent){
				console.log(value.firstChild.textContent )
				if(value.closest('.selected') !== null){
					value.closest('.selected').classList.remove('selected');
				}
				
				value.classList.add('selected');
				var valueContainer = value.closest('.values');
				var notSelectedElem = valueContainer.querySelector('.not-selected');
				valueContainer.removeChild(notSelectedElem);				
			}
		}
	}

}
/*------------------------------------------------------------
Функция для нахождения позиции фильтра при скролле
-------------------------------------------------------------*/
function getScrollCoords(elem) {
    var box = elem.getBoundingClientRect();
    var body = document.body;
    var docEl = document.documentElement;
    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;
    var top = box.top + scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;
    return {
    	top: top,
        left: left
      };
}
/*------------------------------------------------------------
Обработчик события ресайза
-------------------------------------------------------------*/
var contentElem = document.querySelector('.content-wrap');//блок контента
var contentLeftPosition = getCoords(contentElem).left;//запоминаем край контента
window.onresize = function(){	
	contentLeftPosition = getCoords(contentElem).left;//запоминаем отступ		
	document.querySelector('.filter-modal').classList.remove('pressed');//при ресайзе убираем модальное окно		
}
/*------------------------------------------------------------
Обработчик события скролла
-------------------------------------------------------------*/
var bottomEdge = 2100;
var filterModal = document.querySelector('.filter-modal');
var filterTablet = document.querySelector('.filter-tablet');
var filterTopPosition = getCoords(filterTablet).top + window.pageYOffset;
window.onscroll = function(){	
	if(document.body.offsetWidth < 480){
		bottomEdge = 1750;
	} else{
		bottomEdge = 2100;
	}
	var filterTabletPosition = getScrollCoords(filterTablet);	
	filterModal.style.top = filterTabletPosition.top + filterTablet.offsetHeight + 'px';
	if(filterTablet.classList.contains('fixed-filter') && filterTopPosition > window.pageYOffset){
		filterTablet.classList.remove('fixed-filter');
				
	} else if(window.pageYOffset >= filterTopPosition){
		filterTablet.classList.add('fixed-filter');		
		filterTablet.style.display = '';
		filterModal.style.visibility = '';
		if(window.pageYOffset >= bottomEdge){
			filterTablet.classList.remove('fixed-filter');
			filterTablet.style.display = 'none';
			filterModal.style.visibility = 'hidden';
		}
	} 
}

/*------------------------------------------------------------
Drag and drop для каждой строки фильтра
-------------------------------------------------------------*/
var dragging = false;//для определения движения элемента
function dragStart(e){
	var target = e.target;
	if(target.className !== 'values'){
		target = target.parentElement;
	}
		
	var valueElems = target.querySelectorAll('.value');
	var notSelectedElem = target.querySelector('.not-selected');		
	var valuesCoords = getCoords(target);
	var shiftX = e.pageX - valuesCoords.left;
	var minDistance = 0;
	var bodyCoords = getCoords(document.body);
	var lastChildPosition = target.querySelector('.value:last-of-type').getBoundingClientRect().left;
		
	document.onmousemove = function(e){
		contentLeftPosition = contentElem.getBoundingClientRect().left;
		e.stopImmediatePropagation();
		var newLeft = e.pageX - shiftX - bodyCoords.left;
		if(newLeft > 0){
			newLeft = 0;
		}
		lastChildPosition = valueElems[valueElems.length-1].getBoundingClientRect().left;			
		if(lastChildPosition < contentLeftPosition){					
			dragging = true;//объект движется
			return;			
		}
		target.style.left = newLeft + 'px';			
		dragging = true;//объект движется
		target.style.transition = 'none';//отменяем плавный переход			
	}

	document.onmouseup = function(e){
		document.onmousemove = null;
		var minDistance = getMinDistance(valueElems).minDistance;		
		target.style.left = getCoords(target).left - minDistance + 'px';			
	}					
	dragging = false;//объкт закончил движение(можно кликать)
	target.style.transition = '';//возобновляем планый переход(для кликов)	
	return false;
	}
/*------------------------------------------------------------
Узнаем ближайший элемент к краю контента(для drag and drop)
-------------------------------------------------------------*/
function getMinDistance(array){
	var firstElem = array[0];
	var firstElemPosition = getCoords(firstElem).left;
	var minDistance = 0;
	if(firstElemPosition < 0){
		minDistance = Math.abs(firstElemPosition) + contentLeftPosition;
	} else {
		minDistance = firstElemPosition - contentLeftPosition;
	}
		
	for(var i =1; i< array.length; i++){
		var elem = array[i];
		var elemPosition = getCoords(elem).left;
		var elemDistance = 0;
		if(elemPosition < 0){				
			continue;
		} else {
			elemDistance = elemPosition - contentLeftPosition;
		}			
		if(elemDistance < minDistance) {
			minDistance = elemDistance;				
		}	
	}
	return {
		minDistance: minDistance			
	};
}

/*------------------------------------------------------------
Функция при клике сдвигает элемент
-------------------------------------------------------------*/
var filterWrap = document.querySelector('.filter-desctop');
var filterBlock = filterWrap.querySelector('.filter-block');
var valuesPosition = 0;
function selectFilterValue(e){
	if(!dragging){
		var target = e.target;			
		if(!target.classList.contains('value')){
			target = target.parentElement;
		} 
		var valuesContainer = target.closest('.values');
//---------------------------делаем в desctop-версии выбранным
		var targetData = valuesContainer.getAttribute('data-filtered');			
		var desctopSelectFilters = filterWrap.querySelectorAll('.option-title p.selected');
		for(var i = 0; i<desctopSelectFilters.length; i++){
			var elem = desctopSelectFilters[i];
			if(elem.getAttribute('data-filtered') === targetData){
				elem.textContent = target.firstChild.textContent;
				var elemWrap = elem.closest('.options');
				elemWrap.style.backgroundColor = '#f7f7f7';
				var desctopFilterTitle = elem.previousElementSibling;
				desctopFilterTitle.style.cssText = 'font-size: 12px; padding-top: 15px;';
				//добавляем градиент-------------
				if(firstChildSelected && lastChildSelected){
					filterWrap.style.background = '#f7f7f7';
				} 
				else if(elemWrap === firstFilterElem){
					filterWrap.style.background = "linear-gradient(to right, #f7f7f7 50%, #fff 50%, #fff 100%)";
					firstChildSelected = true;
					if(lastChildSelected){
						filterWrap.style.background = '#f7f7f7';
					} 		
				}
				else if(elemWrap === lastFilterElem){
					filterWrap.style.background = "linear-gradient(to left, #f7f7f7 50%, #fff 50%, #fff 100%)";	
					lastChildSelected = true;
					if(firstChildSelected){
						filterWrap.style.background = '#f7f7f7';
					} 
				}
				//---------------------------------
			}
		}
		var valuesWrap = valuesContainer.closest('.values-wrap');
		var valuesContainerTitle = valuesWrap.querySelector('.style-title');			

		var filterTablet  = document.querySelector('.filter-tablet');
		var filterTabletCategories = filterTablet.querySelectorAll('.tablet-filter-text span');			
		var targetLeftPosition = getCoords(target).left;
		valuesPosition = getCoords(valuesContainer).left;			
		var values = valuesContainer.querySelectorAll('.value');
		
		for(var i =0; i<values.length; i++){
			values[i].classList.remove('selected');				
		}
		for(var j = 0; j<filterTabletCategories.length; j++){
			if(valuesContainerTitle.classList.contains(filterTabletCategories[j].className)){
				filterTabletCategories[j].textContent = target.firstChild.textContent;
				filterTabletCategories[j].style.color = "#c82749";
			}
		}
		target.classList.add('selected');			
		var notSelectedElem = valuesContainer.querySelector('.not-selected');
			
		if(notSelectedElem !== null){
			valuesContainer.style.left = parseInt(valuesPosition) -targetLeftPosition + contentLeftPosition + notSelectedElem.offsetWidth + 'px';
			valuesContainer.removeChild(notSelectedElem);		
		} else {		
			valuesContainer.style.left = parseInt(valuesPosition) + contentLeftPosition - targetLeftPosition + 'px';			
		}	
	}
}
/*------------------------------------------------------------
Функция нахождения координат
-------------------------------------------------------------*/	
function getCoords(elem) { 
    var box = elem.getBoundingClientRect();
    return {
    	top: box.top + pageYOffset,
    	left: box.left + pageXOffset
    };
}
/*------------------------------------------------------------
Функция при клике на фильтр сдвигает скроки в выбранным позициям
-------------------------------------------------------------*/	
function shiftOnClick(){
	var valueSpans = document.querySelectorAll('.value');
	for(var j = 0; j<valueSpans.length; j++){
		var value = valueSpans[j];
		var valuesContainer = value.closest('.values');
		//если был сдвинут возвращаем на нулевую позицию
		if(valuesContainer.querySelector('.not-selected')){
			valuesContainer.style.left = '0';
			continue;
		}
		var valuePosition = getCoords(value).left;
		var valuesContainerPosition = getCoords(valuesContainer).left;
		if(value.classList.contains('selected')){			
			valuesContainer.style.left = valuesContainerPosition - valuePosition + contentLeftPosition + 'px';			
		}	

	}	
}
/*------------------------------------------------------------
Клик событие на открытие модального окна с фильтром
-------------------------------------------------------------*/	
var contentWrap = document.querySelector('.content-wrap');
var scrollHeightBlock = document.querySelector('.height-scroll');
filterTablet.onclick = function(){		
	filterModal.classList.toggle('pressed');
	if(filterModal.classList.contains('pressed')){
		filterModal.style.top = filterTablet.getBoundingClientRect().bottom + window.pageYOffset;
		filterModal.style.overflowY = 'auto';
		filterModal.style.overflowX = 'auto';
		document.addEventListener('scroll', removeScroll);		
	shiftOnClick();		
	} else {
		document.removeEventListener('scroll', removeScroll);
		filterModal.style.position = '';
		filterModal.style.top = '';
		filterModal.style.overflowY = '';
		contentWrap.style.width = '';
		scrollHeightBlock.style.left = '800px';

	}
}
/*------------------------------------------------------------
Назначаю обработчики
-------------------------------------------------------------*/	
for(var i = 0; i< values.length; i++){			
		values[i].addEventListener('click', selectFilterValue);		
		values[i].addEventListener('mousedown', dragStart, true);
		values[i].ondragstart = function() {return false;};
}
var selection = document.querySelectorAll('.select-filter li a');
	for(var i =0; i<selection.length; i++){
		selection[i].addEventListener('click', selectFilter);
}

//------------------------------------------------------------

function removeScroll(e){
	e.preventDefault();
	return false;
}