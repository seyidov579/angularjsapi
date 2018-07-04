jsaApp.controller('getFilesController', ['$scope', '$http', function($scope, $http){
    $scope.doGetFiles = function(){
       var url = "http://127.0.0.1:8080/list";
       $http.get(url).then(function (response) {
			$scope.lstFiles = response.data;
		}, function (response) {
			alert(response.data);
		});
    };
}]);
