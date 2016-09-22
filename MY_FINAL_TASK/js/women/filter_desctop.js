	var firstChildSelected = false;
	var lastChildSelected = false;
	var filterWrap = document.querySelector('.filter-desctop');
	var firstFilterElem = document.querySelector('.options:first-child');
	var lastFilterElem = document.querySelector('.options:last-child');
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
		optionsBlock.style.display = 'none';//убираем блок с выбором фильтра
		setTimeout(function(){
			optionsBlock.style.display = '';
		}, 100);
		for(var i =0; i<tabletFilter.length; i++){
			if(tabletFilter[i].classList.contains(selected.dataset.filtered)){
				tabletFilter[i].innerHTML = targetName;
				tabletFilter[i].style.color = "#c82749";
				
			}
		}		
		
		
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

		return false;		
	}
	function addEvent(evnt, elem, func) {
	   if (elem.addEventListener)  
	      elem.addEventListener(evnt,func,false);
	   else if (elem.attachEvent) { 
	      elem.attachEvent("on"+evnt, func);
	   }
	   else { 
	      elem[evnt] = func;
	   }
	}
	var selection = document.querySelectorAll('.select-filter li a');
	for(var i =0; i<selection.length; i++){
		addEvent('click', selection[i], selectFilter);
	}
		