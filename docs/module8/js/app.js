(function() {
  'use strict';
  angular
  .module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItemsDirective)
  .factory('MenuSearchFactory', MenuSearchFactory)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");
  
  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;

    service.getMatchedMenuItems = function(searchTerm) {
        return $http({
          method: 'GET',
          url: (ApiBasePath + '/menu_items.json')
        }).then(function (result) {
      
        var items = result.data.menu_items;

        var foundItems = [];

        for (var i = 0; i < items.length; i++) {
          if (items[i].description.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0) {
            foundItems.push(items[i]);
          }
        }

        return foundItems;
      });
    };
  }
  
  function MenuSearchFactory() {
    var factory = function () {
      return new MenuSearchService();
    };

    return factory;
  }
  
  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var ndController = this;

    ndController.searchTerm = "";

    ndController.narrowSearch = function() {
      if (ndController.searchTerm === "") {
        ndController.items = [];
        return;
      }
      
      var promise = MenuSearchService.getMatchedMenuItems(ndController.searchTerm);
      
      promise.then(function(response) {
        ndController.items = response;
      }).catch(function(error) {
        console.log("The following error has occured: ", error);
      });
    };

  ndController.removeItem = function(index) {
      ndController.items.splice(index, 1);
    };
  }

  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        found: '<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'itemsList',
      bindToController: true
    };
    
    return ddo;
  }

  function FoundItemsDirectiveController() {
    var itemsList = this;

    itemsList.isEmpty = function() {
      return itemsList.found != undefined && itemsList.found.length === 0;
    }
  }

})();
