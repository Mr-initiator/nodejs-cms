export default function Controller($scope,$state,$document,LoginSer,CommonJs){

	// 获取登录token
	const Token = localStorage.getItem('Token');

	// 检测登录状态是否有效
	if(Token){

		var response = CommonJs.validLoginStaus(Token);

		if(response.code == 10 || response.code == 11 || response.code == 12){

			localStorage.clear();

			return;

		}

	}


	// 方法集合
	let methods = {
		loginin, // 登录
		validLoginStaus, // 检查登录状态是否有效
		changeCheckCode, // 更换验证码
		reset //重置表单
	}

	// 配置信息
	let config = $scope.config = {
		SERVER_PATH : CommonJs.SERVER_PATH,
		checkCodePath : `${CommonJs.SERVER_PATH}checkcode.png`
	}
	
	



	// 回车登录
	$document.on('keyup',enterLogin);

	// 向视图暴露方法
	$scope.methods = methods;

	// 登录
	function loginin(username,password,checkcode){
		
		// 验证用户名
		if(!$.trim(username)){

			swal('','请输入用户名');

			return;

		}

		// 验证密码
		if(!$.trim(password)){

			swal('','请输入密码');

			return;

		}

		// 验证验证码是否填写
		if(!$.trim(checkcode)){

			swal('','请输入验证码');

			return;

		}

		// 发送登录请求
		LoginSer.loginIn({username,password,checkcode}).then(response =>{
			
			// 获取返回数据
			let data = response.data;

			// 登录成功
			if(!data.code){

				// 存储Token
				localStorage.setItem('Token',data.Token);

				// 存储用户信息
				localStorage.setItem('user',JSON.stringify(data.user));

				// 跳转到首页
				$state.go('major.index');

				return;

			}else{

				// 更换验证码
				changeCheckCode();

				// 清空用户输入的错误值
				$scope.checkcode = '';

			}

			// 提示信息
			swal('',data.message);

		});

	}

	// 检测登录状态是否有效
	function validLoginStaus(Token){

		LoginSer.validLoginStaus(Token).then(response=>{
			
			// 登录状态有效
			if(!response.code){

				$state.go('major.index');

			}

		});

	}

	// 更换验证码
	function changeCheckCode(){

		config.checkCodePath = `${config.SERVER_PATH}checkcode.png?t=${Date.now()}`;

	}

	// 按回车登录
	function enterLogin(event){

		if(event.keyCode == 13){

			loginin($scope.userName,$scope.userPass,$scope.checkcode);

		}

	}

	// 重置
	function reset(){

		$scope.userName = $scope.userPass = $scope.checkcode = '';

	}

}

Controller.$inject = ['$scope','$state','$document','LoginSer','CommonJs'];