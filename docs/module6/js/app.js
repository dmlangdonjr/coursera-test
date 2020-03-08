
(function () {
	'use strict';
	
	angular.module('LunchCheck', [])
	
	.controller('LunchCheckController', LunchCheckController);

	LunchCheckController.$inject = ['$scope'];  

	function LunchCheckController($scope) {
		$scope.message = "";
		$scope.lunchItems = "";
		$scope.warning = "";
		$scope.messageColor = "";
		$scope.textBoxColor = "";

		$scope.checkTooMuch = function () {
			$scope.warning = "";
			$scope.messageColor = "";
			$scope.textBoxColor = "";

			if($scope.lunchItems == "") {
				$scope.message = "Please enter data first";
				$scope.messageColor = "red";
				$scope.textBoxColor = "red";
				return;
			}

			var list = $scope.lunchItems.split(',');
			var count = listCount(list);

			if(count == 0) {
				$scope.message = "Please enter data first";
				$scope.warning = "We do not consider empty items valid lunch items i.e. , , ,"
				$scope.messageColor = "red";
				$scope.textBoxColor = "red";
				return;
			} else if(count !== list.length) {
				$scope.warning = "We do not consider empty items valid lunch items i.e. , , ,"
			}

			if(count > 3) {
				$scope.message = "Too much! Length: " + count;
				$scope.messageColor = "green";
				$scope.textBoxColor = "green";
			} else {
				$scope.message = "Enjoy! Length: " + count;
				$scope.messageColor = "green";
				$scope.textBoxColor = "green";
			}
		};

		function listCount(list) {
			var total = 0;

			for(var i = 0; i < list.length; i++) {
				if(list[i].trim() !== "") {
					total++;
				}
			}

			return total;
		};
	};
})();
