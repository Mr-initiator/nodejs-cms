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

	// 初始化文章编辑器
	let EdtorModule = initEditor();

	// 文章模型弹出按钮
	var articleTrigger = $('#article-trigger');

	// 全选
	$scope.selectAll = selectAll;

	// 反选
	$scope.convertAll = convertAll;

	// 全不选
	$scope.cancelALL = cancelALL;

	// 批量删除
	$scope.deleteMany = deleteMany;

	// 根据ID删除文章
	$scope.deleteByID = deleteByID;

	// 单个文章切换状态
	$scope.toggle = toggle;

	// 搜索文章
	$scope.search = search;

	// 分页
	$scope.pagination = pagination;

	// 重置搜索
	$scope.reset = reset;

	// 清空文章表单信息
	$scope.resizeArticle = resizeArticle;

	// 获取所有文章列表
	getArticleList();

	// 添加文章弹出
	$scope.addContent = addContent;

	// 添加文章
	$scope.addArticle = addArticle;

	// 更新 是否推荐
	$scope.updateCommand = updateCommand;

	// 文章封面上传
	uploadArticlefile();

	// 修改文章 获取指定文章信息
	$scope.modifyByID = modifyByID;

	// 修改文章 发送修改请求
	$scope.sendModifyArticle = sendModifyArticle;

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

	// 文章模型的源
	let articleModelOrigin = {};

	// 文章模型
	$scope.articleModel = {
		'title' : '',
		'isActive' : true,
		'recommend' : [],
		'columnID' : '',
		'columnName' : '',
		'author' : '',
		'clickVolume' : '',
		'forceUrl' : '',
		'articleCover' : 'images/image.jpg',
		'published' : new Date(),
		'articleBrief' : '',
		'articleContent' : '',
		'pagetitle' : '',
		'pagekeywords' : '',
		'pagedescription' : '',
		'language' : 'ch'
	};

	// 将文章模型复制一份到源中 以备使用
	Object.assign(articleModelOrigin,$scope.articleModel);

	// 更新 是否推荐
	function updateCommand(evt,option){

		// 是否选中状态
		var checked = evt.target.checked;

		// 给结果数组取别名
		var recommend = $scope.articleModel.recommend;

		// 获取当前选项在结果数组中的索引
		var index = recommend.indexOf(option)

		// 选中状态
		if(checked){

			// 将当前选项放入结果数组
			recommend.push(option);

		}else{

			// 取消选中,将选中从结果数组中删除
			if(index != -1){

				recommend.splice(index,1);

			}
		}

	}

	// 根据栏目模型弹出对应表单
	function addContent(model){

		// 添加 非修改
		$scope.sign = { isModify : false,modifyID : 0 };

		if(model == 'article'){

			CommonJs.getCurrentLang(Token,function(language){

				// 当前语言
				var currentLanguage = language.lang_field;

				TextSer.getAllColumn(Token,currentLanguage).then(response=>{

					var response = response.data;

					// 检查令牌是否失效
					if(CommonJs.checkRequestCode(response.code)) return;

					if(!response.code){

						$scope.allColumns = response.result;

						articleTrigger.trigger('click');

					}else{

						swal("栏目信息获取失败","","error");

					}
					

				})

			});

		}

	}

	// 添加文章
	function addArticle(){

		// 获取栏目简介
		$scope.articleModel.articleBrief = EdtorModule.articleIns.$txt.html();

		// 获取栏目内容
		$scope.articleModel.articleContent = EdtorModule.articleCon.$txt.html();

		// 筛选网站公告名称
		angular.forEach($scope.allColumns,function(value){

			if(value._id == $scope.articleModel.columnID){

				$scope.articleModel.columnName = value.title;

			}

		});
		

		if(!$.trim($scope.articleModel.title)){

			swal("文章添加失败","文章标题不能为空","error");

			return;

		}

		if(!$.trim($scope.articleModel.columnID)){

			swal("文章添加失败","栏目ID不能为空","error");

			return;
		}

		// 发送添加文章请求
		TextSer.addArticle($scope.articleModel,Token).then(response=>{

			var response = response.data;

			// 检查令牌是否失效
			if(CommonJs.checkRequestCode(response.code)) return;

			// 如果文章添加成功
			if(!response.code){

				// 关闭添加栏目弹出层
				$.fancybox.close();

				// 获取文章列表
				getArticleList();

				// 表单重置
				resizeArticle();

			}

			// 提示添加成功与否的信息
			swal(response.message,"");

		});

	}

	// 修改文章 获取指定文章信息
	function modifyByID(id,cid){
		
		$scope.sign = { isModify : true,modifyID : id };

		// 根据栏目ID获取栏目模型
		TextSer.getModelByCID(Token,cid).then(response=>{

			var response = response.data;

			// 检查令牌是否失效
			if(CommonJs.checkRequestCode(response.code)) return;

			if(!response.code){

				// 栏目模型
				var model = response.result.model

				// 根据ID获取指定文章信息
				TextSer.getArticleByID(id,Token).then(response=>{

					var response = response.data;

					// 获取成功
					if(!response.code){

						if(model == 'article'){

							var result = response.result

							// 格式化发布日期
							result.published = new Date(result.published);

							// 文章简介
							EdtorModule.articleIns.$txt.html(result.articleBrief);

							// 文章内容
							EdtorModule.articleCon.$txt.html(result.articleContent);

							// 展示到页面中
							$scope.articleModel = result;

							articleTrigger.trigger('click');

						}
					
					}

				});

			}else{

				swal("栏目模型获取失败","","error");

			}
			

		})

	}

	// 修改文章 发送修改请求
	function sendModifyArticle(modifyID){

		// 获取栏目简介
		$scope.articleModel.articleBrief = EdtorModule.articleIns.$txt.html();

		// 获取栏目内容
		$scope.articleModel.articleContent = EdtorModule.articleCon.$txt.html();

		if(!$.trim($scope.articleModel.title)){

			swal("文章添加失败","文章标题不能为空","error");

			return;

		}

		// 根据ID修改指定文章
		TextSer.modifyByID($scope.articleModel,modifyID,Token).then(response=>{

			var response = response.data;

			// 检查令牌是否失效
			if(CommonJs.checkRequestCode(response.code)) return;

			// 修改成功
			if(!response.code){

				$.fancybox.close();

				// 获取文章列表
				getArticleList();

				// 表单重置
				resizeArticle();

			}

			// 提示添加成功与否的信息
			swal(response.message,"");

		})

	}

	// 文章封面上传
	function uploadArticlefile(){

		var uploader = $scope.uploader = new FileUploader({
			url: `${CommonJs.SERVER_PATH}fileUpload`
		});

		uploader.onSuccessItem = fileItem => {

			var path = JSON.parse(fileItem._xhr.responseText).file.path.split('server')[1].substr(1);

			$scope.articleModel.articleCover = path;

		};

		uploader.onErrorItem = fileItem => {

			swal("文件上传失败","","error");

		};

	}

	// 初始化编辑器
	function initEditor(){

		wangEditor.config.printLog = false;

		let articleIns = new wangEditor('article-ins');
		let articleCon = new wangEditor('article-con');

		articleIns.config.menus = $.map(wangEditor.config.menus,(item, key)=>{

		    return item === 'location' ? null : item;

		});

		articleIns.create();
		articleCon.create();

		articleIns.$editorContainer.css('z-index', 20);
		articleCon.$editorContainer.css('z-index', 10);

		return { articleIns,articleCon }

	}

	// 清空文章表单信息
	function resizeArticle(){

		// 清空本次添加文章的值
		Object.assign($scope.articleModel,articleModelOrigin);

		// 获取栏目简介
		$scope.articleModel.articleBrief = EdtorModule.articleIns.$txt.html('<p><br></p>');

		// 获取栏目内容
		$scope.articleModel.articleContent = EdtorModule.articleCon.$txt.html('<p><br></p>');

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

	// 发送删除请求
	function sendDelete(ID){

		// 发送删除请求
		TextSer.deleteByID(ID,Token).then(response=>{

	    	var response = response.data;

	    	// 检查令牌是否失效
	    	if(CommonJs.checkRequestCode(response.code)) return;

	    	// 获取文章列表
	    	if(!response.code) getArticleList();

	    	// 用户提示
	    	swal(response.message,'');

	    });

	}



}

Controller.$inject = ['$scope','$state','$stateParams','TextSer','CommonJs','FileUploader'];