/*------------------------------------------------------------
Подгружаю свойства из товара из localStorage и добавляем на страницу
-------------------------------------------------------------*/
window.onload = function(){
	var itemObj = JSON.parse(localStorage.getItem("itemProp"));
	var largeImage = document.querySelector('.large-image');
	var itemName = document.querySelector('.item-name');
	var itemPrice = document.querySelector('.info-price');
	largeImage.src = itemObj.image;
	itemName.textContent = itemObj.name;
	itemPrice.textContent = itemObj.price;
	var thumbsImg = document.querySelectorAll('.thumbs li img');
	for(var i =0; i<thumbsImg.length; i++){
		thumbsImg[i].src = itemObj.image;
	}
	var thumbsA = document.querySelectorAll('.thumbs li a');
	for(var j =0; j<thumbsA.length; j++){
		thumbsA[j].href = itemObj.image;
	}
	//обновляем цену и количество в хэдере		
	var newHeaderPrice = localStorage.getItem('headerPrice');
	var newHeaderCount = localStorage.getItem('headerCount');
	if(newHeaderCount !== null || newHeaderPrice !== null){
		var headerPrice = document.querySelector('.header-price');
		var headerCount = document.querySelector('.header-count');
		headerPrice.textContent = newHeaderPrice;
		headerCount.textContent = newHeaderCount;
	} else {
		return;
	}
		
}

window.onbeforeunload = function() {
	localStorage.removeItem("ItemProp");
};
	
/*------------------------------------------------------------
Конструктор объекта товара
-------------------------------------------------------------*/
function AddToBagOptions(image, price, name, size, color, quantity){
	this.image = image;
	this.price = price;
	this.name = name;
	this.color = color;
	this.size = size;
	this.quantity = quantity;
}
/*------------------------------------------------------------
Обработчик события добавления товара в корзину
-------------------------------------------------------------*/	
var addToBagButton = document.querySelector('.add-to-bag-btn');
addToBagButton.addEventListener('click', addToBag);
var popup = document.querySelector('.modal-window');
function addToBag(e){	
	popup.style.display = 'block';
	popup.style.top = addToBagButton.getBoundingClientRect().top + pageYOffset - popup.offsetHeight + 'px';
	popup.style.left = addToBagButton.getBoundingClientRect().left + 'px';
	var goToBag = document.querySelector('.go-to-bag');
	var cancel = document.querySelector('.cancel')
	goToBag.onclick = function(){
		var itemObj = JSON.parse(localStorage.getItem("itemProp"));
		jsonArray = JSON.parse(localStorage.getItem('itemToBag'));
		 if(!jsonArray){//проверка
	 		var jsonArray = [];
		 }
		var image = itemObj.image;
		var price = itemObj.price;
		var name = itemObj.name;
		var size = document.querySelector('.size-buttons li.selected').textContent;
		var color = document.querySelector('.color-buttons li.selected').textContent;
		var quantity = 1;

		var bagObject = new AddToBagOptions(image, price, name, size, color, quantity);
		jsonArray.push(bagObject);
		var bagJson = JSON.stringify(jsonArray);//записываем свойства в массив в JSON		
		localStorage.setItem('itemToBag', bagJson);//сохраняем в localStorage

		updateHeaderPrice(price);
		updateItemsCount();
		localStorage.setItem('newItemAdded', 'true');//запоминаем в хранилище, что добавили элемент, для проверки на странице корзины
	//window.location.href = 'shopping_bag.html'; //сразу переходим в корзину
	
		window.location.href = 'shopping_bag.html';
	}
	cancel.onclick = function(){
		popup.style.display = 'none';
	}
}
/*------------------------------------------------------------
Добавление события кнопке
-------------------------------------------------------------*/



/*------------------------------------------------------------
Функция изменения в хэдере и сохранения в localStorage цены
-------------------------------------------------------------*/
function updateHeaderPrice(value){
	var headerPrice = document.querySelector('.header-price');
	var intAddedPrice = value.split('').slice(1).join('').replace(/\s+/g, '');
	var intHeaderPrice = headerPrice.textContent.split('').slice(1).join('').replace(/\s+/g, '');
	var newPrice = 0;
	if(headerPrice.textContent === ''){		//если значений нет	
		newPrice =  parseFloat(intAddedPrice);
		newPrice = ''  + newPrice.toFixed(2);
		newPrice = newPrice.replace(/(\d{1,3}(?=(\d{3})+(?:\.\d|\b)))/g,"\$1 ");
		headerPrice.textContent = '£' + newPrice;
		localStorage.setItem('headerPrice', headerPrice.textContent);
	} else {		//если значения есть 		
		newPrice = parseFloat(intHeaderPrice) + parseFloat(intAddedPrice);
		newPrice = ''  + newPrice.toFixed(2);
		newPrice = newPrice.replace(/(\d{1,3}(?=(\d{3})+(?:\.\d|\b)))/g,"\$1 ");
		headerPrice.textContent = '£' + newPrice;
		localStorage.setItem('headerPrice', headerPrice.textContent);
	}
}
/*------------------------------------------------------------
Функция изменения в хэдере и сохранения в localStorage количества
-------------------------------------------------------------*/
function updateItemsCount(){
	var headerCount = document.querySelector('.header-count');
	var countStringArr = headerCount.textContent.split('');
	var count = countStringArr.slice(1, countStringArr.length-1).join('');
	count = +count + 1;
	console.log(count);
	headerCount.textContent = '('+ count + ')';
	localStorage.setItem('headerCount', headerCount.textContent);		
}