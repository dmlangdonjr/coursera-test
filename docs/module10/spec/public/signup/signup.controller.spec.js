describe('SignUpController', function() {
  'use strict';

  var $httpBackend;
  var MenuService;
  var MyInfoService;
  var SignUpController;
  var ApiPath;

  var menuItem = {
    "id": 55,
    "short_name": "F1",
    "name": "Beef Broccoli",
    "description": "sliced beef sauteed with broccoli in brown sauce",
    "price_small": 11.45,
    "price_large": 15.45,
    "small_portion_name": "pint",
    "large_portion_name": "large",
    "created_at": "2020-05-10T18:23:16.628Z",
    "updated_at": "2020-05-10T18:23:16.628Z",
    "category_short_name": "F",
    "image_present": true
  };

  beforeEach(function() {
    module('restaurant');

    inject(function ($injector) {
      ApiPath = $injector.get('ApiPath');
      $httpBackend = $injector.get('$httpBackend');

      var $controller = $injector.get('$controller');
      var MyInfoService = $injector.get('MyInfoService');
      var MenuService = $injector.get('MenuService');

      SignUpController = $controller('SignUpController', {
        MenuService: MenuService,
        MyInfoService: MyInfoService
      });

      $httpBackend.whenGET('src/public/public.html').respond('');
      $httpBackend.whenGET('src/public/home/home.html').respond('');
    });
  });

  it('should show error message if the item number is invalid', function() {
    expect(SignUpController.invalidFavorite).not.toBeDefined();
    var shortName = "F1";

    SignUpController.info = {
      'favorite': shortName
    }

    $httpBackend.expectGET(ApiPath + "/menu_items/" + shortName + ".json").respond(500, '');

    SignUpController.validateFavorite(shortName);

    $httpBackend.flush();

    expect(SignUpController.invalidFavorite).toBe(true);
  });

  it('should show error message if the item number is valid', function() {
    expect(SignUpController.invalidFavorite).not.toBeDefined();
    var shortName = "F1";

    SignUpController.info = {
      'favorite': shortName
    }
    
    $httpBackend.expectGET(ApiPath + "/menu_items/" + shortName + ".json").respond(menuItem);

    SignUpController.validateFavorite(shortName);

    $httpBackend.flush();

    expect(SignUpController.invalidFavorite).toBe(false);
  });

});
