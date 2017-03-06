(function() {
	'use strict';

	angular.module('ShoppingListCheckOff', [])
		.controller('ToBuyController', ToBuyController)
		.controller('AlreadyBoughtController', AlreadyBoughtController)
		.service('ShoppingListCheckOffService', ShoppingListCheckOffService)
		.filter('AngularMoney', asAngularMoney);

	// filters
	function asAngularMoney(){
		return function(value){
			return '$$$' + value.toFixed(2);
		}
	}

	// controllers
	// protect against minification
	ToBuyController.$inject = ['ShoppingListCheckOffService'];

	function ToBuyController(ShoppingListCheckOffService){
		var tobuy = this;

		tobuy.items = ShoppingListCheckOffService.getToBuy();
		
		tobuy.buyItem = function(index){
			ShoppingListCheckOffService.buyItem(index);
		}

		tobuy.errorMessage = function(){
			return ShoppingListCheckOffService.everythingBought();
		}
	}

	// protect against minification
	AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

	function AlreadyBoughtController(ShoppingListCheckOffService){
		var bought = this;

		bought.items = ShoppingListCheckOffService.getBought();

		bought.errorMessage = function() {
			return ShoppingListCheckOffService.nothingBought();
		}
	}

	// services
	function ShoppingListCheckOffService(){
		var service = this;

		// initial buy lists
		var tobuy = [
				{'name':'packs of Cookies', 'qty': 10, 'pricePerItem': 3.50},
				{'name': 'gallons of Milk', 'qty': 2, 'pricePerItem': 2.99}, 
				{'name':'lbs. of Chicken', 'qty': 2, 'pricePerItem': 6.75}
			],
			bought = [];

		service.buyItem = function(index){
			var item = tobuy.splice(index,1)[0];
			bought.push(item);
		}

		// return the list of items
		service.getToBuy = function(){
			return tobuy;
		}

		service.getBought = function(){
			return bought;
		}

		// return whether or not a list is empty
		service.everythingBought = function(){
			return tobuy.length == 0;
		}

		service.nothingBought = function(){
			return bought.length == 0;
		}
	}
})();