export default function Controller($scope,$state,$stateParams,TextSer,CommonJs,FileUploader){

	// 获取登录token
	const Token = window.localStorage.getItem('Token');

	if(!Token){
		$state.go('login');
		return;
	}

	let pageConfig = $scope.pageConfig = {
		page:1,
		pageSize:15,
		total:100
	}

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

	// 搜索文章
	$scope.search = search;

	// 分页
	$scope.pagination = pagination;

	// 重置搜索
	$scope.reset = reset;

	// 获取所有文章列表
	getArticleList();

	// 获取所有文章列表
	function getArticleList(){

		CommonJs.getCurrentLang(Token,function(language){

			// 当前选中语言
			var currentLanguage = language.lang_field;

			TextSer.getArticleList({
				page:pageConfig.page,
				limit:pageConfig.pageSize,
				Token : Token,
				language : currentLanguage
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

	// 搜索文章
	function search(key){

		if(!key){

			swal("搜索失败","请输入搜索关键字","error");
			return;
		}

		CommonJs.getCurrentLang(Token,function(language){

			TextSer.search({
				key : key,
				Token : Token,
				page: 0 ,
				limit : 15,
				language:language.lang_field
			}).then(response=>{

				// 检查令牌是否失效
				if(CommonJs.checkRequestCode(response.code)) return;

				var response = response.data;

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

				}else{

					swal("搜索失败",response.message,"error");

				}
				

			});

		});

		

	}

	// 文章列表分页
	function pagination(page){

		pageConfig.page = page;

		// 获取文章列表
		getArticleList();

	}

	// 重置搜索
	function reset(){

		$scope.key = '';

		getArticleList();

	}



}

Controller.$inject = ['$scope','$state','$stateParams','TextSer','CommonJs','FileUploader'];