/*------------------------------------------------------------
Проверка состояний localStorage, в зависимости 
от состояние подгружает различный html
-------------------------------------------------------------*/
(function(){
	var container = document.querySelector('.shopping-bag-items .content-wrap');
	if(localStorage.getItem('isEmpty') === 'true' && localStorage.getItem('newItemAdded') === 'false'){
		container.innerHTML = '<h2 class="when-empty-bag">Your shopping bag is empty. Use Catalog to add new items</h2>';
	} 
	else if(localStorage.getItem('newItemAdded') === 'true' && localStorage.getItem('isEmpty') === 'false'){
		container.innerHTML = '';
	}
	else if(localStorage.getItem('someItemsRemoved') === 'true'){
		container.innerHTML = localStorage.getItem('shoppingBagHTML');
	}
	else if(localStorage.getItem('someItemsRemoved') === 'true' && localStorage.getItem('isEmpty') === 'true'){
		container.innerHTML = '<h2 class="when-empty-bag">Your shopping bag is empty. Use Catalog to add new items</h2>';
	}
	else if(localStorage.getItem('isEmpty') === 'true'){
		container.innerHTML = '<h2 class="when-empty-bag">Your shopping bag is empty. Use Catalog to add new items</h2>';
	}
})();


