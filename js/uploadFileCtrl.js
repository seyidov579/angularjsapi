// CONTROLLER UPLOAD FILE
jsaApp.controller('uploadFileController', ['$scope', '$http', function($scope, $http){
    $scope.doUploadFile = function(){
       var file = $scope.uploadedFile;
       var url = "http://127.0.0.1:8080/create";
       
       var data = new FormData();
       data.append('photo', file);
    
       var config = {
    	   	transformRequest: angular.identity,
    	   	transformResponse: angular.identity,
       }
       
       $http.post(url, data, config).then(function (response) {
			$scope.uploadResult=response.data;
		}, function (response) {
			$scope.uploadResult=response.data;
		});
    };
}]);
