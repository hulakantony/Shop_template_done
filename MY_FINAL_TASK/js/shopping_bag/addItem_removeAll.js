
var container = document.querySelector('.shopping-bag-items .content-wrap');
var totalPrice = document.querySelector('.total-price');
var newItems = JSON.parse(localStorage.getItem("itemToBag"));

(function(){		
	addNewItemToBag();	

})();
/*------------------------------------------------------------
Добавление элемента на страницу + проверка идентичности с существующеми
-------------------------------------------------------------*/
function addNewItemToBag(){		
	if(newItems !== null){
		var items = document.querySelectorAll('.item');			
		for(var i =0; i< newItems.length; i++){	
			var newItem = newItems[i];
			for(var j = 0; j<items.length; j++){
				var item = items[j];
				var name = item.querySelector('.item-name').textContent.toLowerCase();					
				var color = item.querySelector('.color').textContent.toLowerCase();					
				var size = item.querySelector('.size').textContent.toLowerCase();					
				var quantity = item.querySelector('.quantity').textContent;					
				if(newItem.name.toLowerCase() == name && newItem.color.toLowerCase() == color && newItem.size.toLowerCase() == size){					
				quantity.textContent = parseInt(quantity) + 1;//если товар идентичен существующему увеличиваем количество
				return ;
				} 							
			}			
			createElement(newItem);	

		}
	}

}
/*------------------------------------------------------------
Создания нового элемента
-------------------------------------------------------------*/	
function createElement(itemProps){
	var item = document.createElement('div');
	item.className = 'item';
	item.style.marginTop = '45px';

	var photoPriceDiv = document.createElement('figure');
	photoPriceDiv.className = 'photo-price remove';		

	var imageWrap = document.createElement('div');
	imageWrap.className = 'image-wrap';

	var itemImage = document.createElement('img');
	itemImage.src = itemProps.image;
	var hidePhoto = document.createElement('div');
	hidePhoto.className = 'hide-photo';
			
	imageWrap.appendChild(itemImage);
	imageWrap.appendChild(hidePhoto);

	var itemPrice = document.createElement('p');
	itemPrice.className = 'item-price';		
	itemPrice.innerHTML = itemProps.price;

	photoPriceDiv.appendChild(imageWrap);			
	photoPriceDiv.appendChild(itemPrice);

	var itemDescription = document.createElement('div');
	itemDescription.className ='item-description remove';		

	var itemName = document.createElement('p');
	itemName.className ='item-name';
	itemName.innerHTML = itemProps.name;

	var itemColor = document.createElement('p');
	itemColor.className ='item-color characteristics';
	var colorSpan = document.createElement('span');
	colorSpan.className = 'color';
	colorSpan.innerHTML = itemProps.color;		
	itemColor.textContent = 'Color: ';
	itemColor.appendChild(colorSpan);

	var itemSize = document.createElement('p');
	itemSize.className ='item-size characteristics';
	var sizeSpan = document.createElement('span');
	sizeSpan.className = 'size';
	sizeSpan.innerHTML = itemProps.size;	
	itemSize.innerHTML = 'Size: ';
	itemSize.appendChild(sizeSpan);					

	var itemQuantity = document.createElement('p');
	itemQuantity.className ='item-quantity characteristics';
	var quantSpan = document.createElement('span');
	quantSpan.className = 'quantity';
	quantSpan.innerHTML = itemProps.quantity;
	quantSpan.style.cursor = 'pointer';
	quantSpan.onclick = function(){
		var selectQuantity = document.createElement('input');
		selectQuantity.style.width = "15px";
		itemQuantity.appendChild(selectQuantity);
		quantSpan.style.display = 'none';
		selectQuantity.onblur = function(){
			quantSpan.innerHTML = selectQuantity.value;
			selectQuantity.style.display = 'none';
			quantSpan.style.display = '';
			itemProps.quantity = selectQuantity.value;
						
		}
	}		
	itemQuantity.innerHTML = 'Quantity: ';
	itemQuantity.appendChild(quantSpan);

	var removeButton = document.createElement('a');
	removeButton.className = 'remove-button';
	removeButton.setAttribute('href', '');		

	var removeButtonText = document.createElement('p');
	removeButtonText.textContent = 'Remove item';

	removeButton.appendChild(removeButtonText);
	removeButton.onclick = function(e){
		e.preventDefault();
		var headerCount = document.querySelector('.header-count');
		var countStringArr = headerCount.textContent.split('');
		var count = countStringArr.slice(1, countStringArr.length-1).join('');				
		count = +count - itemProps.quantity;				
		headerCount.textContent = '('+ count + ')';

		var headerPrice = document.querySelector('.header-price');	
		var intRemovedPrice = itemProps.price.split('').slice(1).join('').replace(/\s+/g, '');			
		var intHeaderPrice = headerPrice.textContent.split('').slice(1).join('').replace(/\s+/g, '');
		var newPrice = parseFloat(intHeaderPrice) - parseFloat(intRemovedPrice) * itemProps.quantity;
		newPrice = ''  + newPrice.toFixed(2);
		newPrice = newPrice.replace(/(\d{1,3}(?=(\d{3})+(?:\.\d|\b)))/g,"\$1 ");
		headerPrice.textContent = '£' + newPrice;
		totalPrice.textContent = '£' + newPrice;
		localStorage.setItem('headerPrice', headerPrice.textContent);
		localStorage.setItem('headerCount', headerCount.textContent);				
		localStorage.setItem('someItemsRemoved', 'true');
				
		if(count === 0){
			headerCount.textContent = '';
			headerPrice.textContent = '';
			headerPrice.style.display = 'none';
			headerCount.style.display = 'none';
			localStorage.setItem('headerPrice', headerPrice.textContent);
			localStorage.setItem('headerCount', headerCount.textContent);
			container.innerHTML = '<h2 class="when-empty-bag">Your shopping bag is empty. Use Catalog to add new items</h2>';
			localStorage.setItem('isEmpty', 'true');
			localStorage.setItem('newItemAdded', 'false');
			localStorage.removeItem('itemToBag');
		}
		removeFromJsonArray(itemProps.name, itemProps.size, itemProps.color);
		container.removeChild(item);
		return false;
	}
	itemDescription.appendChild(itemName);
	itemDescription.appendChild(itemColor);
	itemDescription.appendChild(itemSize);
	itemDescription.appendChild(itemQuantity);
	itemDescription.appendChild(removeButton);

	item.appendChild(photoPriceDiv);
	item.appendChild(itemDescription);
			
	container.appendChild(item);
}
function renewQuantity(name, color, size){
	
		for(var j=0; j<newItems.length; j++){
			var localItem = newItems[j];
			if(localItem.name.toLowerCase() == name && localItem.color.toLowerCase() == color && localItem.size.toLowerCase() == size){	
				console.log(localItem.quantity)	;			
				localItem.quantity = quantity;
			} 
		}
	newItems = JSON.stringify(newItems);
	localStorage.setItem('itemToBag', newItems);
}

/*var quant = document.querySelectorAll('.quantity');
for(var i = 0; i<quant.length; i++){
	var quantSpan = quant[i];
	quantSpan.onclick = function(){
		var parent = quantSpan.closest('.item-description');
		parentItem = parent.parentElement;
		//console.log(parent)
		//while(!parent.classList.contains('.item')){
			//parent = parent.parentElement;
		//}
		var name = parentItem.q('.item-name').textContent;
		var color = parentItem.closest('.color').textContent;
		var size = parentItem.closest('.size').textContent;
		var selectQuantity = document.createElement('input');
		selectQuantity.style.width = "15px";
		itemQuantity.appendChild(selectQuantity);
		quantSpan.style.display = 'none';
		selectQuantity.onblur = function(){
			quantSpan.innerHTML = selectQuantity.value;
			selectQuantity.style.display = 'none';
			quantSpan.style.display = '';
			itemProps.quantity = selectQuantity.value;
			renewQuantity(name, color, size);			
		}
	}	
}
function renewQuantity(name, color, size){
	for(var i = 0; i<newItems.legth; i++){
			var item = newItems[i];
			console.log(item.name);
			if(item.name === itemProps.name && item.size === itemProps.size && item.color === itemProps.color){
				item.quantity = selectQuantity.value;
				console.log(item.quantity);
			}

		}
		newItems = JSON.stringify(newItems);
		localStorage.setItem('itemToBag', newItems);
}*/
/*------------------------------------------------------------
Удаление всех элементов из корзины
-------------------------------------------------------------*/
var makeBagEmpty = document.querySelector('.empty-bag');
makeBagEmpty.onclick = function(e){		
	var target = e.target;
	if(target.nodName !== 'A'){
		target = target.parentNode;
	}
	e.preventDefault();

	var catalogItems = document.querySelectorAll('.item');
	for(var i =0; i<catalogItems.length; i++){
		container.removeChild(catalogItems[i]);
	}
	container.innerHTML = '<h2 class="when-empty-bag">Your shopping bag is empty. Use Catalog to add new items</h2>';
	localStorage.removeItem('itemToBag');
	localStorage.setItem('isEmpty', 'true');
	localStorage.setItem('newItemAdded', 'false');
	localStorage.setItem('shoppingBagHTML', '');
	var headerPrice = document.querySelector('.header-price');
	var headerCount = document.querySelector('.header-count');
	headerPrice.textContent = '';
	headerCount.textContent = '';
	headerPrice.style.display = 'none';
	headerCount.style.display = 'none';
	localStorage.setItem('headerPrice', headerPrice.textContent);
	localStorage.setItem('headerCount', headerCount.textContent);
	totalPrice.textContent = '';
	return false;
}
/*------------------------------------------------------------
При покупке(удаление всех элементов)
-------------------------------------------------------------*/
var buyNowButton = document.querySelector('.buy-now-btn');
buyNowButton.onclick = function(e){
	var catalogItems = document.querySelectorAll('.item');
	for(var i =0; i<catalogItems.length; i++){
		container.removeChild(catalogItems[i]);
	}
	container.innerHTML = '<h2 class="when-empty-bag">Thank you for your purchase</h2>';
	localStorage.removeItem('itemToBag');
	localStorage.setItem('isEmpty', 'true');
	localStorage.setItem('newItemAdded', 'false');
	localStorage.setItem('shoppingBagHTML', '');
	var headerPrice = document.querySelector('.header-price');
	var headerCount = document.querySelector('.header-count');
	headerPrice.textContent = '';
	headerCount.textContent = '';
	headerPrice.style.display = 'none';
	headerCount.style.display = 'none';
	localStorage.setItem('headerPrice', headerPrice.textContent);
	localStorage.setItem('headerCount', headerCount.textContent);
	totalPrice.textContent = '';		
}
/*------------------------------------------------------------
Если в localStorage есть аналогичный элемент - удаляем его из массива localStorage
-------------------------------------------------------------*/
function removeFromJsonArray(iname, isize, icolor){	
	if(newItems !== null){
		for(var i =0; i<newItems.length; i++){
			var item = newItems[i];
			if(item.name === iname && item.size === isize && item.color === icolor){
				newItems.splice(i, 1);
				var bagWithDeletedItem = JSON.stringify(newItems);
				localStorage.setItem('itemToBag', bagWithDeletedItem);
				break;
			}
		}			
	}
}
