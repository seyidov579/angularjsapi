(function() {
  var app = angular.module('front', []);

  app.controller('allUser',['$http','$scope', function($http,$scope){
    var user = this;
    user.list = [];
    $http.get('http://localhost:8080/list').success(function(data){
      user.list = data;
    });
	
	$scope.setClickedRow = function(index){
		$scope.selectedRow = index;
	}
  }]);
  
	
	app.controller("createUser",['$http', function($http){
		this.user = {}
		this.addUser = function(user) {
			$http.post('http://localhost:8080/create',user);
		};
	}]);
	
	
})();