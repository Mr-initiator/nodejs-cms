export default function Controller($scope,$state,$stateParams,ContentSer,CommonJs){

	// 获取登录token
	const Token = window.localStorage.getItem('Token');

	if(!Token){
		$state.go('login');
		return;
	}

	// 栏目ID
	var cid = $stateParams.id;

	// 栏目模型
	var model = $stateParams.model;

	// 分页
	$scope.pagination = pagination;

	let pageConfig = $scope.pageConfig = {
		page:1,
		pageSize:15,
		total:100
	}

	// 根据栏目ID获取文章列表
	GetArticleListByID();

	// 根据ID删除文章
	$scope.deleteByID = deleteByID;

	// 全选
	$scope.selectAll = selectAll;

	// 反选
	$scope.convertAll = convertAll;

	// 全不选
	$scope.cancelALL = cancelALL;

	// 批量删除
	$scope.deleteMany = deleteMany;

	// 单个文章切换状态
	$scope.toggle = toggle;

	// 根据栏目ID获取文章列表
	function GetArticleListByID(){

		ContentSer.getArticleListByID({
			page:pageConfig.page,
			limit:pageConfig.pageSize,
			cid : cid,
			Token : Token
		}).then(response=>{
				
			var response = response.data;

			// 检查令牌是否失效
			if(CommonJs.checkRequestCode(response.code)) return;

			// 列表请求成功
			if(!response.code){

				var result = response.result;

				pageConfig.page = response.result.page;
				pageConfig.pageSize = response.result.limit;
				pageConfig.total = response.result.total;

				// 为每篇文章添加 是否选中状态
				angular.forEach(result.docs,function(value){

					value.state = false;

				});

				// 展示数据
				$scope.articleList = result;
		
			}

		})

	}

	// 文章列表分页
	function pagination(page){

		pageConfig.page = page;

		// 根据栏目ID获取文章列表
		GetArticleListByID();

	}

	// 根据ID删除文章
	function deleteByID(ID,flag){

		if(!ID){

			swal("删除文章的ID不能为空",response.message,"error");

			return;
		}

		// flag true 为批量删除 false 为单个删除

		if(flag){

			sendDelete(ID);

		}else{

			swal({
				title:"您确定要删除吗?",
				text: "删除后不可恢复!",
				type: "warning",
				showCancelButton: true,
				confirmButtonColor: "#DD6B55",
				confirmButtonText:"确定",
				cancelButtonText:'取消',
				closeOnConfirm: false
			},function(){

				sendDelete(ID);

			});

		}

	}

	function sendDelete(ID){

		// 发送删除请求
		ContentSer.deleteByID(ID,Token).then(response=>{

	    	var response = response.data;

	    	// 检查令牌是否失效
	    	if(CommonJs.checkRequestCode(response.code)) return;

	    	// 获取文章列表
	    	if(!response.code) GetArticleListByID();

	    	// 用户提示
	    	swal(response.message,'');

	    });

	}

	// [全选]
	function selectAll(){

		angular.forEach($scope.articleList.docs,function(value){

			value.state = true;

		});
		
	}

	// [反选]
	function convertAll(){

		angular.forEach($scope.articleList.docs,function(value){

			value.state = !value.state;

		});

	}

	// [全不选]
	function cancelALL(){

		angular.forEach($scope.articleList.docs,function(value){

			value.state = false;

		});

	}

	// [批量删除]
	function deleteMany(){

		var sign = false;

		angular.forEach($scope.articleList.docs,function(value){

			if(value.state){

				sign = true;

			}

		});

		if(sign){

			swal({
				title:"您确定要删除吗?",
				text: "删除后不可恢复!",
				type: "warning",
				showCancelButton: true,
				confirmButtonColor: "#DD6B55",
				confirmButtonText:"确定",
				cancelButtonText:'取消',
				closeOnConfirm: false
			},function(){

				angular.forEach($scope.articleList.docs,function(value){

					if(value.state){

						deleteByID(value._id,true);

					}

				});

			});

		}else{

			swal('请选择要删除的文章','','error');

		}

	}

	// 页面操作 单个文章切换状态
	function toggle(index,state){

		$scope.articleList.docs[index].state = state;

	}


}

Controller.$inject = ['$scope','$state','$stateParams','ContentSer','CommonJs'];