/*------------------------------------------------------------
При клике на итем в каталоге копирует его свойства и запоминает в localStorage
-------------------------------------------------------------*/
var items = document.querySelectorAll('.item');
function ItemOptions(image, name, price){
	this.image = image;
	this.name = name;
	this.price = price;
}
function saveOptions(e){
	var target = e.target;
	if(target.className !== 'item-link'){
		target = target.parentElement;
	}		
	var item = target.parentElement;
	while(!item.classList.contains('item')){
		item = item.parentElement;
	}
	var itemName = item.querySelector('.item-descr').textContent;
	var itemPhoto = item.querySelector('.item-image').src;
	var itemPrice = item.querySelector('.item-price .price').textContent;

	var itemObject = new ItemOptions(itemPhoto, itemName, itemPrice);
	var jsonItem = JSON.stringify(itemObject);

	localStorage.setItem("itemProp", jsonItem);		
		
}
for(var i = 0; i<items.length; i++){
	items[i].addEventListener('click', saveOptions);
}	