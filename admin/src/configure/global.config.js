export default angular.module('globalConfig',[])
	.factory('CommonJs',['$http','$rootScope',function($http,$rootScope){

		$rootScope.SERVER_PATH = 'http://localhost:3000/';

		return {

			SERVER_PATH : 'http://localhost:3000/'
			
		}

	}])
	.name;