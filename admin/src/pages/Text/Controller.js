export default function Controller($scope,$state,$stateParams,TextSer,CommonJs,FileUploader){

	// 获取登录token
	const Token = window.localStorage.getItem('Token');

	if(!Token){
		$state.go('login');
		return;
	}



}

Controller.$inject = ['$scope','$state','$stateParams','TextSer','CommonJs','FileUploader'];