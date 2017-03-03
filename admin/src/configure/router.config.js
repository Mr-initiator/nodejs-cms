export default function routerConfig($urlRouterProvider){
	
	$urlRouterProvider.otherwise('major/index');

}

routerConfig.$inject = ['$urlRouterProvider'];


