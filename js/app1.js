var app = angular.module('app',[]);

app.directive("fileInput", function($parse){  
      return{  
           link: function($scope, element, attrs){  
                element.on("change", function(event){  
                     var files = event.target.files;  
                     //console.log(files[0].name);  
                     $parse(attrs.fileInput).assign($scope, element[0].files);  
                     $scope.$apply();  
                });  
           }  
      }  
 });  

app.controller('UserCRUDCtrl', ['$scope','$http','UserCRUDService', function ($scope,$http,UserCRUDService) {
	$scope.reset = function() {
		$scope.user.first_name="";
		$scope.user.last_name="";
		$scope.user.number="";
		$scope.user.date_of_birth="";
	}  
	  
    $scope.updateUser = function () {
        UserCRUDService.updateUser($scope.user.id,$scope.user.first_name,$scope.user.last_name,$scope.user.date_of_birth,$scope.user.number)
          .then(function success(response){
              $scope.message = 'User data updated!';
              $scope.errorMessage = '';
          },
          function error(response){
              $scope.errorMessage = 'Error updating user!';
              $scope.message = '';
          });
    }
    
	$scope.setClickedRow = function(index){
		$scope.selectedRow = index;
		return $http.get('http://localhost:8080/find/'+index).success(function(data){
		  $scope.user = data;
		  $scope.user.id = index;
		  $scope.selectedRow = index;
		  $scope.message='';
		  $scope.errorMessage = '';
		}); 
	}
	
    $scope.getUser = function () {
        var id = $scope.user.id;
        UserCRUDService.getUser($scope.user.id)
          .then(function success(response){
              $scope.user = response.data;
              $scope.user.id = id;
			  $scope.selectedRow = id;
              $scope.message='';
              $scope.errorMessage = '';
          },
          function error (response ){
              $scope.message = '';
              if (response.status === 404){
                  $scope.errorMessage = 'User not found!';
              }
              else {
                  $scope.errorMessage = "Error getting user!";
              }
          });
    }
    
    $scope.addUser = function () {
        if ($scope.user != null && $scope.user.first_name, $scope.user.last_name,$scope.user.date_of_birth,$scope.user.number,$scope.files) {
            UserCRUDService.addUser($scope.user.first_name,$scope.user.last_name,$scope.user.date_of_birth,$scope.user.number,$scope.files)
              .then (function success(response){
                  $scope.message = 'User added!';
                  $scope.errorMessage = '';
              },
              function error(response){
                  $scope.errorMessage = 'Error adding user!';
                  $scope.message = '';
            });
        }
        else {
            $scope.errorMessage = 'Complete all fields!';
            $scope.message = '';
        }
    }
    
    $scope.deleteUser = function () {
        UserCRUDService.deleteUser($scope.user.id)
          .then (function success(response){
              $scope.message = 'User deleted!';
              $scope.user = null;
              $scope.errorMessage='';
          },
          function error(response){
              $scope.errorMessage = 'Error deleting user!';
              $scope.message='';
          })
    }
    
    $scope.getAllUsers = function () {
        UserCRUDService.getAllUsers()
          .then(function success(response){
              $scope.users = response.data;
              $scope.message='';
              $scope.errorMessage = '';
          },
          function error (response ){
              $scope.message='';
              $scope.errorMessage = 'Error getting users!';
          });
    }
	
	$scope.deleteAllUsers = function () {
        UserCRUDService.deleteAllUsers()
          .then(function success(response){
              $scope.users = response.data;
              $scope.message='';
              $scope.errorMessage = '';
          },
          function error (response ){
              $scope.message='';
              $scope.errorMessage = 'Error delete user!';
          });
    }

}]);

app.service('UserCRUDService',['$http', function ($http) {
	
    this.getUser = function getUser(userId){
        return $http({
          method: 'GET',
          url: 'http://localhost:8080/find/'+userId
        });
	}
	
    this.addUser = function addUser(first_name, last_name, date_of_birth, number, files){
		var form_data = new FormData();     
                form_data.append('first_name', first_name);  
                form_data.append('last_name', last_name);  
                form_data.append('date_of_birth', date_of_birth);  
                form_data.append('number', number);  
				angular.forEach(files, function(file){  
						form_data.append('photo', file);  
				}); 
		return $http.post('http://localhost:8080/create', form_data,  
           {  
                transformRequest: angular.identity,  
                headers: {'Content-Type': undefined,'Process-Data': false}  
           })
    }
	
    this.deleteUser = function deleteUser(id){
        return $http({
          method: 'DELETE',
          url: 'http://localhost:8080/delete/'+id
        })
    }
	
    this.updateUser = function updateUser(id,first_name, last_name, date_of_birth, number){

        return $http({
          method: 'PUT',
          url: 'http://localhost:8080/edit/'+id,
          data: {first_name:first_name, last_name:last_name, date_of_birth: date_of_birth, number:number}
        })
    }
	
    this.getAllUsers = function getAllUsers(){
        return $http({
          method: 'GET',
          url: 'http://localhost:8080/list'
        });
    }
	
	this.deleteAllUsers = function deleteAllUsers(){
        return $http({
          method: 'GET',
          url: 'http://localhost:8080/deleteall'
        });
    }

}]);