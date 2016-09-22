/*------------------------------------------------------------
Функция при клике на иконку поиска открывает блок с инпутом
-------------------------------------------------------------*/	
var searchIcon = document.querySelector('.search-icon-tablet');
var searchInputforTablet = document.querySelector('.search-for-tablet');
searchIcon.onclick = function(){
	if(document.body.offsetWidth < 1024 && document.body.offsetWidth > 480){
		searchInputforTablet.classList.toggle('search-open');
	}
	return false;
}