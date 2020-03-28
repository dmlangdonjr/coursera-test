
(function () {
	'use strict';
	
	angular.module('ShoppingListCheckOff', [])
	.controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
	.service('ShoppingListCheckOffService', ShoppingListCheckOffService)
	.filter('dollar', DollarFilter);

	function ShoppingListCheckOffService() {
        var shoppingService = this;

        var boughtItems = [];

        var toBuyItems = [{name: "boxes of cookies", quantity: 10, pricePerItem: 2},
	        {name: "bottles of water", quantity: 4, pricePerItem: 1},
	        {name: "bars of soap", quantity: 3, pricePerItem: 3},
	        {name: "gallon of milk", quantity: 1, pricePerItem: 2},
	        {name: "boxes of cereal", quantity: 4, pricePerItem: 3}];

        shoppingService.getToBuyItems = function () {
            return toBuyItems;
        };

        shoppingService.getBoughtItems = function () {
            return boughtItems;
        };

        shoppingService.buyItem = function (itemIndex) {
            var removedItems = toBuyItems.splice(itemIndex,1);
            boughtItems.push(removedItems[0]);
        };
    };

	ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController (ShoppingListCheckOffService) {
        var toBuy = this;

        toBuy.items = ShoppingListCheckOffService.getToBuyItems();

        toBuy.buyItem = function (itemIndex) {
            ShoppingListCheckOffService.buyItem(itemIndex);
        };
    };

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController (ShoppingListCheckOffService) {
        var alreadyBought = this;

        alreadyBought.items = ShoppingListCheckOffService.getBoughtItems();
    };

    function DollarFilter() {
    	return function (input) {
    		return "$$$" + input + ".00"
    	}
    }

})();
