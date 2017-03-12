export default function Controller($scope,$state,UserSer,CommonJs,FileUploader){

	// 获取登录token
	const Token = window.localStorage.getItem('Token');

	if(!Token){
		$state.go('login');
		return;
	}

	var fancyboxTrigger = $('#fancybox-trigger');

	fancyboxTrigger.fancybox();

	// 分页信息
	let pageConfig = $scope.pageConfig = {
		page:1,
		pageSize:15,
		total:100
	}

	$scope.UserData = {
		username : '',
		password : '',
		realname : '',
		email : '',
		photo : '',
		userhead : '',
		isAdmin : false
	}

	// 分页
	$scope.pagination = pagination;

	// [获取用户操作] 获取用户列表
	getUserList();

	// 根据ID删除用户
	$scope.deleteUserByID = deleteUserByID;

	// 文件上传
	uploadfile();

	// 添加用户
	$scope.addUser = addUser;

	// 获取用户列表
	function getUserList(){

		UserSer.getUserList({
			page : pageConfig.page,
			limit : pageConfig.pageSize,
			Token : Token,
		}).then(response=>{
				
			var response = response.data;

			// 检查令牌是否失效
			if(CommonJs.checkRequestCode(response.code)) return;

			// 获取成功
			if(!response.code){

				pageConfig.page = response.result.page;
				pageConfig.pageSize = response.result.limit;
				pageConfig.total = response.result.total;

				var result = response.result

				// 为每篇文章添加 是否选中状态
				angular.forEach(result.docs,function(val){

					val.state = false;

				});

				$scope.userinfos = result;

			}

		})

	}

	// 添加用户
	function addUser(){

		// 发送添加用户请求
		UserSer.addUser($scope.UserData,Token).then(response=>{

			var response = response.data;

			// 检查令牌是否失效
			if(CommonJs.checkRequestCode(response.code)) return;

			// 添加用户成功
			if(!response.code){

				$.fancybox.close();

				$scope.UserData = {
					username : '',
					password : '',
					realname : '',
					email : '',
					photo : '',
					isAdmin : false
				}

				swal('用户添加成功','','success');

				// 获取用户列表
				getUserList();

			}else{

				swal('用户添加失败',response.message,'error');

			}

		});

	}

	// 根据ID删除用户
	function deleteUserByID(id){

		if(!id){

			swal("用户ID不能为空","","error");

			return;
		}

		// 发送删除用户请求
		UserSer.deleteUserByID(id,Token).then(response=>{

			var response = response.data;

			// 检查令牌是否失效
			if(CommonJs.checkRequestCode(response.code)) return;

			if(!response.code){

				getUserList();

				swal("用户删除成功","","success");

			}

		});

	}

	// 分页
	function pagination(page){

		pageConfig.page = page;

		getUserList();

	}

	// 文件上传
	function uploadfile(){

		var uploader = $scope.uploader = new FileUploader({
			url: `${CommonJs.SERVER_PATH}fileUpload`
		});

		uploader.onSuccessItem = fileItem => {

			var path = JSON.parse(fileItem._xhr.responseText).file.path.split('server')[1].substr(1);

			$scope.UserData.photo = path;

			$scope.UserData.userhead = `${CommonJs.SERVER_PATH}${path}`;

		};

		uploader.onErrorItem = fileItem => {

			swal("文件上传失败","","error");

		};

	}
	


}

Controller.$inject = ['$scope','$state','UserSer','CommonJs','FileUploader'];