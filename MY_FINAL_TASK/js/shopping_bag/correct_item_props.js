var newItems = JSON.parse(localStorage.getItem("itemToBag"));
function ItemOptions(image, name, price){
	this.image = image;
	this.name = name;
	this.price = price;
}
function correctItem(e){
	var target = e.target.closest('.item');
	//localStorage.setItem('someItemsRemoved', 'false');
	console.log(target.innerHTML);
	var bagContainer = target.parentElement;
	var itemName = target.querySelector('.item-name').textContent;
	var itemPrice = target.querySelector('.item-price').textContent;
	var itemQuntity = target.querySelector('.quantity').textContent;
	var itemColor = target.querySelector('.color').textContent;
	var itemSize = target.querySelector('.size').textContent;
	var itemPhoto = target.querySelector('.image-wrap img').src;
	if(target.classList.contains('existed')){
		
		var itemObject = new ItemOptions(itemPhoto, itemName, itemPrice);
		var jsonItem = JSON.stringify(itemObject);
		localStorage.setItem("itemProp", jsonItem);	
		bagContainer.removeChild(target);
		localStorage.setItem('someItemsRemoved', 'true');	
		var existedItems = document.querySelectorAll('.existed');//сохраняем html использованных элементов
		var existedInnerHTML = '';
		for(var i=0; i<existedItems.length; i++){
			existedInnerHTML += existedItems[i].outerHTML;
		}
		localStorage.setItem('shoppingBagHTML', existedInnerHTML);
		//if(!existedItems.length){
			//localStorage.setItem('shoppingBagHTML', '');
		//}
		renewHeaderPrice(itemPrice);
		renewHeaderCount(itemQuntity);
	} else {
		bagContainer.removeChild(target);
		var itemObject = new ItemOptions(itemPhoto, itemName, itemPrice);
		var jsonItem = JSON.stringify(itemObject);
		localStorage.setItem("itemProp", jsonItem);	
		for(var i=0; i<newItems.length; i++){
			var item = newItems[i];
			if(item.name === itemName && item.size === itemSize && item.color === itemColor){
				newItems.splice(i, 1);
				newItems = JSON.stringify(newItems);
				localStorage.setItem('itemToBag', newItems);
				break;
			}
		}
		renewHeaderPrice(itemPrice);
		renewHeaderCount(itemQuntity);
		
	}
	window.location.href = 'own_item.html';
	return false;
}
var headerPrice = document.querySelector('.header-price');
var headerCount = document.querySelector('.header-count');
function renewHeaderPrice(itemPrice){	
	var intRemovedPrice = itemPrice.split('').slice(1).join('').replace(/\s+/g, '');
	var intHeaderPrice = headerPrice.textContent.split('').slice(1).join('').replace(/\s+/g, '');
	var newPrice = parseFloat(intHeaderPrice) - parseFloat(intRemovedPrice);
	newPrice = ''  + newPrice.toFixed(2);
	newPrice = newPrice.replace(/(\d{1,3}(?=(\d{3})+(?:\.\d|\b)))/g,"\$1 ");//разбиваем цену по 3 цифры
	headerPrice.textContent = '£' + newPrice;
	totalPrice.textContent = '£' + newPrice;
	localStorage.setItem('headerPrice', headerPrice.textContent);
}
function renewHeaderCount(itemQuantity){	
	var countStringArr = headerCount.textContent.split('');
	var count = countStringArr.slice(1, countStringArr.length-1).join('');	
	count = +count - +itemQuantity;		
	headerCount.textContent = '('+ count + ')';
	localStorage.setItem('headerCount', headerCount.textContent);
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
			localStorage.setItem('shoppingBagHTML', '');
	}
}

var hidePhotos = document.querySelectorAll('.hide-photo');
for(var i =0; i<hidePhotos.length; i++){
	hidePhotos[i].addEventListener('click', correctItem);
}