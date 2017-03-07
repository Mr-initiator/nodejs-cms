export default function Controller($scope,$state,ContentSer,CommonJs){

	// 获取登录token
	const Token = window.localStorage.getItem('Token');

	if(!Token){
		$state.go('login');
		return;
	}


}

Controller.$inject = ['$scope','$state','ContentSer','CommonJs'];