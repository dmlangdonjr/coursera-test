
(function () {
	'use strict';
	
	angular.module('ShoppingListCheckOff', [])
	.controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
	.service('ShoppingListCheckOffService', ShoppingListCheckOffService)
	.filter('dollar', DollarFilter);

	function ShoppingListCheckOffService() {
        var service = this;

        var toBuyItems = [];
        var boughtItems = [];

        toBuyItems = [{name: "boxes of cookies", quantity: 10, pricePerItem: 2},
	        {name: "bottles of water", quantity: 4, pricePerItem: 1},
	        {name: "bars of soap", quantity: 3, pricePerItem: 3},
	        {name: "gallon of milk", quantity: 1, pricePerItem: 2},
	        {name: "boxes of cereal", quantity: 4, pricePerItem: 3}];

        service.getItemsToBuy = function () {
            return toBuyItems;
        };

        service.getItemsBought = function () {
            return boughtItems;
        };

        service.buyItem = function (itemIndex) {
            var removedItems = toBuyItems.splice(itemIndex,1);
            boughtItems.push(removedItems[0]);
        };
    };

	ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController (ShoppingListCheckOffService) {
        var toBuy = this;

        toBuy.items = ShoppingListCheckOffService.getItemsToBuy();

        toBuy.buyItem = function (itemIndex) {
            ShoppingListCheckOffService.buyItem(itemIndex);
        };
    };

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController (ShoppingListCheckOffService) {
        var alreadyBought = this;

        alreadyBought.items = ShoppingListCheckOffService.getItemsBought();
    };

    function DollarFilter() {
    	return function (input) {
    		return "$$$" + input + ".00"
    	}
    }

})();
