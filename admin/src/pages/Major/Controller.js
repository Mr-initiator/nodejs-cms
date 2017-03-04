export default function Controller($scope,$document,$state){

	// 获取登录token
	const Token = window.localStorage.getItem('Token');

	// 如果登录Token不存在 跳转到登录页面
	if(!Token){
		$state.go('login');
		return;
	}

	// 取消登录时的回车登录
	$document.off('keyup');

	// 获取用户信息
	let user = localStorage.getItem('user');

	// 向外暴露用户信息
	$scope.user = (user && JSON.parse(user)) || '';

	// 退出登录
	$scope.logout = logout;

	// 退出登录
	function logout(){

		// 确认是否退出
		swal({
			title:"您确定要退出吗?",
			text:"退出后将不能对网站内容进行配置!",
			type:"warning",
			showCancelButton:true,
			confirmButtonColor:"#DD6B55",
			confirmButtonText:"确定",
			cancelButtonText:'取消',
			closeOnConfirm:false
		},
		function(){

			// 清空会话消息
			localStorage.clear();

			swal("成功退出CMS","2秒后自动跳转到登录页面","success");

			setTimeout(()=>{

				//关闭弹出
				swal.close();

				// 跳转到登录页面
				$state.go('login');

			},2000);

		});

	}

}

Controller.$inject = ['$scope','$document','$state'];