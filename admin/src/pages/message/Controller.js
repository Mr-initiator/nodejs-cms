export default function Controller($scope,$state,MessageSer,CommonJs){

	// 获取登录token
	const Token = window.localStorage.getItem('Token');

	if(!Token){
		$state.go('login');
		return;
	}

	// 获取留言列表
	getMessage();

	// 标记已读
	$scope.signRead = signRead;

	// 删除消息
	$scope.deleteMessage = deleteMessage;

	// 分页
	$scope.pagination = pagination;

	let pageConfig = $scope.pageConfig = {
		page:1,
		pageSize:15,
		total:100
	}


	// 消息默认分类
	$scope.divide = 1;

	// 筛选消息
	$scope.filter = filter;

	// 获取留言列表
	function getMessage(){

		CommonJs.getCurrentLang(Token,function(language){

			MessageSer.getMessage({
				page : pageConfig.page,
				limit : pageConfig.pageSize,
				Token : Token,
				language : language.lang_field
			}).then(response=>{

				var response = response.data;

				// 检查令牌是否失效
				if(CommonJs.checkRequestCode(response.code)) return;

				// 获取成功
				if(!response.code){

					pageConfig.page = response.result.page;
					pageConfig.pageSize = response.result.limit;
					pageConfig.total = response.result.total;

					var result = response.result;

					$scope.messageList = result.docs;

				}

			});

		});

	}

	// 标记已读
	function signRead(sign,id){

		if(sign){

			MessageSer.signRead({id,Token}).then((response)=>{

				var response = response.data;

				// 检查令牌是否失效
				if(CommonJs.checkRequestCode(response.code)) return;

				if(!response.code){

					angular.forEach($scope.messageList,value=>{

						if(value._id == id){

							value.unread = false;

						}

					})

				}else{

					swal('标记已读失败',response.message,'error');

				}

			})

		}else{

			swal('标记已读失败','已经是已读状态,请不要重复标记','error');

		}

	}

	// 删除消息
	function deleteMessage(id){

		if(!id){

			swal('','请传入要删除消息的ID');

			return;
		}

		// 确认是否退出
		swal({
			title:"确定要删除此条留言吗?",
			text:"删除后将不可恢复",
			type:"warning",
			showCancelButton:true,
			confirmButtonColor:"#DD6B55",
			confirmButtonText:"确定",
			cancelButtonText:'取消',
			closeOnConfirm:false
		},
		function(){

			MessageSer.deleteMessage({Token,id}).then(response=>{

				var response = response.data;

				// 检查令牌是否失效
				if(CommonJs.checkRequestCode(response.code)) return;

				if(!response.code){

					swal({
						title: "留言删除成功",
						text: "",
						imageUrl: "images/thumbs-up.jpg"
					});

					getMessage();

				}else{

					swal("发生错误",response.message,"error");

				}

			});

		});

	}

	// 分页
	function pagination(page){

		pageConfig.page = page;

		getMessage();

	}

	// 筛选消息
	function filter(condition){

		// 1 全部
		// 2 已读
		// 3 未读

		pageConfig.page = 1;

		$scope.messageList = [];

		CommonJs.getCurrentLang(Token,function(language){
			
			MessageSer.filterMessage({
				page : pageConfig.page,
				limit : pageConfig.pageSize,
				Token : Token,
				language : language.lang_field,
				condition : condition
			}).then(response=>{

				var response = response.data;

				// 检查令牌是否失效
				if(CommonJs.checkRequestCode(response.code)) return;

				// 获取成功
				if(!response.code){

					pageConfig.page = response.result.page;
					pageConfig.pageSize = response.result.limit;
					pageConfig.total = response.result.total;

					var result = response.result;

					$scope.messageList = result.docs;

				}

			});

		});

	}

	

}

Controller.$inject = ['$scope','$state','MessageSer','CommonJs'];