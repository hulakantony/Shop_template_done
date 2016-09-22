/*------------------------------------------------------------
Обновление цены и кол-ва в хэдере
-------------------------------------------------------------*/
(function (){
	var totalPrice = document.querySelector('.total-price');
	var newHeaderPrice = localStorage.getItem('headerPrice');
	var newHeaderCount = localStorage.getItem('headerCount');
	if(newHeaderCount !== null || newHeaderPrice !== null){
		var headerPrice = document.querySelector('.header-price');
		var headerCount = document.querySelector('.header-count');
		headerPrice.textContent = newHeaderPrice;
		headerCount.textContent = newHeaderCount;
		if(newHeaderCount === ''){
			headerPrice.style.display = 'none';
			headerCount.style.display = 'none';
		}
	} else {
		return;
	}	
	if(totalPrice){
		totalPrice.textContent = newHeaderPrice;
	}				
	
})();