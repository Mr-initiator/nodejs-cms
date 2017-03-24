export default function Controller($scope,$state,ColumnSer,CommonJs,FileUploader){

	// 获取登录token
	const Token = window.localStorage.getItem('Token');

	if(!Token){
		$state.go('login');
		return;
	}

	// 获取弹框按钮
	let columnTrigger = $('#column-trigger');

	// 存储栏目信息 没格式化成树状结构 删除时候用
	let allColumns = [];

	// 要删除的栏目id数组
	let deleteIDArr = [];

	// 初始化编辑器
	let EdtorModule = initEditor();

	// 区分是添加还是修改
	$scope.sign = { isModify : false,modifyID : 0 };

	// 表单字段
	$scope.formData = {
		parent : 'none',
		title : '',
		alias : '',
		link : '',
		language : 'ch',
		model : 'article',
		columnIndex : '',
		forceUrl : '',
		weight : '',
		route : '',
		cover : 'images/image.jpg',
		linksType : '0',
		switch : true,
		columnBrief : '',
		columnContent : ''
	}

	// 添加栏目弹出
	columnFancy();

	// 获取栏目信息
	getAllColumn();

	// 栏目封面上传
	uploadfile();

	// 展开子栏目
	$scope.slideMenu = slideMenu;

	// 删除栏目
	$scope.deleteColumn = deleteColumn;

	// 添加栏目
	$scope.addColumn = addColumn;

	// 重置表单
	$scope.resetForm = resetForm;

	// 修改栏目弹出
	$scope.modifyfancy = modifyfancy;

	// 修改栏目
	$scope.modifyColumn = modifyColumn;

	// 增加子栏目
	$scope.addChildColumn = addChildColumn;

	// 获取栏目信息
	function getAllColumn(){

		// 获取当前选中的语言
		CommonJs.getCurrentLang(Token,function(language){

			// 获取当前语言的栏目信息
			ColumnSer.getAllColumn(Token,language.lang_field).then(response=>{

				var response = response.data;

				// 检查令牌是否失效
				if(CommonJs.checkRequestCode(response.code)) return;

				if(!response.code){

					// 所有栏目信息 删除时候用
					allColumns = response.result;

					// 获取所有栏目信息 并格式化成树状结构
					$scope.allColumnTree = formatTreeData(response.result);

				}else{

					// 栏目信息获取失败
					swal("栏目信息获取失败",response.message,"error");

				}

			});

		});
		
	}

	// 展开子栏目
	function slideMenu(event,id){

		// 获取当前点击的元素
		var currentTarget = $(event.currentTarget);

		// 当前要展开的子节点
		var columnlist = currentTarget.siblings('.column-list');

		// 当前要展开的子节点存在
		if(columnlist.length>0){

			// 当前要展开的子节点切换收缩展开效果
			columnlist.stop().slideToggle();

			// 其他收缩
			currentTarget.parent().siblings().find('.column-list').stop().slideUp();

		}
		
		// 阻止事件冒泡
		event.stopPropagation();

	}

	// 删除栏目
	function deleteColumn(id){

		// 要删除的栏目和子栏目的ID
		find(id,allColumns);

		// 将当前栏目ID存放到数组中
		deleteIDArr.push(id);

		// 确认是否退出
		swal({
			title:"确定要删除栏目吗?",
			text:"删除后栏目不可恢复",
			type:"warning",
			showCancelButton:true,
			confirmButtonColor:"#DD6B55",
			confirmButtonText:"确定",
			cancelButtonText:'取消',
			closeOnConfirm:false
		},
		function(){

			 angular.forEach(deleteIDArr,function(id){

				// 发送删除栏目请求
				ColumnSer.deleteColumn(id,Token).then(response=>{

					var response = response.data;

					// 检查令牌是否失效
					if(CommonJs.checkRequestCode(response.code)) return;

					// 栏目删除成功
					if(!response.code){

						swal("栏目删除成功","","success");

						// 重新获取栏目
						getAllColumn();

					}else{

						// 栏目删除失败
						swal("栏目删除失败","","error");

					}

				})

		    });

		});

	}

	// 初始化编辑器
	function initEditor(){

		wangEditor.config.printLog = false;

		let editorIns = new wangEditor('col-ins');
		let editorCon = new wangEditor('col-con');

		editorIns.config.menus = $.map(wangEditor.config.menus,(item, key)=>{

		    return item === 'location' ? null : item;

		});

		editorIns.create();
		editorCon.create();

		editorIns.$editorContainer.css('z-index', 20);
		editorCon.$editorContainer.css('z-index', 10);

		return { editorIns,editorCon }

	}
	
	// 栏目封面上传
	function uploadfile(){

		var uploader = $scope.uploader = new FileUploader({
			url: `${CommonJs.SERVER_PATH}fileUpload`
		});

		uploader.onSuccessItem = fileItem => {

			var path = JSON.parse(fileItem._xhr.responseText).file.path.split('server')[1].substr(1);

			$scope.formData.cover = path;

		};

		uploader.onErrorItem = fileItem => {

			swal("文件上传失败","","error");

		};

	}

	// 添加栏目弹出
	function columnFancy(){

		$scope.sign = { isModify : false,modifyID : 0 } 

		// 调用fancybox插件
		columnTrigger.fancybox({

			beforeLoad(){

				resetForm();

				// 弹出之前 获取当前栏目语言 父级栏目集合
				CommonJs.getCurrentLang(Token,language=>{

					// 当前选中语言
					let currentLanguage = $scope.formData.language = language.lang_field;

					// 获取所有栏目信息
					ColumnSer.getAllColumn(Token,currentLanguage).then(response=>{

						var response = response.data;

						// 检查令牌是否失效
						if(CommonJs.checkRequestCode(response.code)) return;

						if(!response.code){

							// 放在弹框中的父栏目中
							$scope.columnInfomations = response.result;

						}else{

							// 栏目信息获取失败
							swal("父级栏目信息获取失败",response.message,"error");

						}

					});

				});

			}

		});

	}

	// 添加栏目
	function addColumn(){
			
		// 获取栏目简介
		$scope.formData.columnBrief = EdtorModule.editorIns.$txt.html();

		// 获取栏目内容
		$scope.formData.columnContent = EdtorModule.editorCon.$txt.html();

		// 获取权重
		$scope.formData.weight = !$scope.formData.weight ? 1 : $scope.formData.weight;
		
		// 发送添加栏目请求
		ColumnSer.addColumn($scope.formData,Token).then(response=>{

			var response = response.data;

			// 检查令牌是否失效
			if(CommonJs.checkRequestCode(response.code)) return;

			// 栏目删除成功
			if(!response.code){

				// 重新获取栏目
				getAllColumn();

				$.fancybox.close();

				resetForm();

			}

			// 提示添加成功与否的信息
			swal('',response.message);

		});
		
	}

	// 重置表单
	function resetForm(){

		// 重置表单
		$scope.formData = {
			parent : 'none',
			title : '',
			alias : '',
			language : 'ch',
			model : 'article',
			columnIndex : '',
			forceUrl : '',
			weight : '',
			route : '',
			cover : 'images/image.jpg',
			linksType : '0',
			switch : true,
			columnBrief : '',
			columnContent : ''
		}

		// 获取栏目简介
		$scope.formData.columnBrief = EdtorModule.editorIns.$txt.html('<p><br></p>');

		// 获取栏目内容
		$scope.formData.columnContent = EdtorModule.editorCon.$txt.html('<p><br></p>');

	}

	// 修改栏目弹出
	function modifyfancy(id){

		$scope.sign = { isModify : true,modifyID : id }

		CommonJs.getCurrentLang(Token,function(language){

			// 获取所有栏目信息 放在父栏目中
			ColumnSer.getAllColumn(Token,language.lang_field).then(response=>{
					
				var response = response.data;

				// 检查令牌是否失效
				if(CommonJs.checkRequestCode(response.code)) return;

				if(!response.code){

					// 获取所有栏目信息 放在弹框中的父栏目中
					$scope.columnInfomations = response.result;

					// 根据ID获取指定栏目信息
					ColumnSer.getOneColumnById(id,Token).then(response=>{

						var response = response.data;

						// 检查令牌是否失效
						if(CommonJs.checkRequestCode(response.code)) return;

						// 栏目信息获取成功
						if(!response.code){

							var result = response.result[0];

							// 获取表单信息 用户修改栏目 为表单赋默认值
							$scope.formData = result;

							// 当前选择语言
							$scope.formData.language =  language.lang_field;

							// 栏目简介
							EdtorModule.editorIns.$txt.html(result.columnBrief);

							// 栏目内容
							EdtorModule.editorCon.$txt.html(result.columnContent);


						}else{

							// 栏目信息获取失败
							swal("",response.message,"error");

						}

					});

				}

			});

		});
		
	}

	// 修改栏目
	function modifyColumn(id){

		// 获取栏目简介
		$scope.formData.columnBrief = EdtorModule.editorIns.$txt.html();

		// 获取栏目内容
		$scope.formData.columnContent = EdtorModule.editorCon.$txt.html();

		// 获取权重
		$scope.formData.weight = !$scope.formData.weight ? 1 : $scope.formData.weight;

		ColumnSer.modifyColumnById(id,$scope.formData,Token).then(response=>{

			var response = response.data;

			// 检查令牌是否失效
			if(CommonJs.checkRequestCode(response.code)) return;

			if(!response.code){

				// 关闭添加栏目弹出层
				$.fancybox.close();

				// 重新获取栏目
				getAllColumn();

			}

			// 提示添加成功与否的信息
			swal(response.message,'');

		});

	}

	// 增加子栏目
	function addChildColumn(id){

		$scope.sign = { isModify : false,modifyID : 0 };

		CommonJs.getCurrentLang(Token,function(language){

			// 当前选中语言
			var currentLanguage = language.lang_field;

			// 根据栏目ID获取指定栏目信息
			ColumnSer.getOneColumnById(id,Token).then(response=>{

				var response = response.data;

				// 检查令牌是否失效
				if(CommonJs.checkRequestCode(response.code)) return;

				if(!response.code){

					// 让当前父栏目选中
					$scope.formData.parent = id;
					
					// 为父栏目重新赋值
					$scope.columnInfomations = response.result;

					// 当前选中语言
					$scope.formData.language = currentLanguage;

				}

			});

		});

	}


	// 将数据格式化成树状结构
	function formatTreeData(data){ 
	    
	    var result = []; 

	    var temp = []; 

	    for(var i = 0; i< data.length; i++){ 

	       temp[data[i]["_id"]] = data[i];

	    } 

	    for(var i = 0; i < data.length; i++) { 

	        if(temp[data[i]["parent"]] && data[i]["_id"] != data[i]["parent"]){

	            if (!temp[data[i]["parent"]]["children"]) temp[data[i]["parent"]]["children"] = [];

	            temp[data[i]["parent"]]["children"].push(data[i]);

	        } else { 

	            result.push(data[i]); 
	            
	        }

	    } 
	    
	    return result;
	}

	// 在data里面找id 和 此id的子栏目
	function find(id,data){
		
		if(data.length <= 1) return;

		angular.forEach(data,function(value,index){

			if(value.parent == id){

				deleteIDArr.push(value._id)

				data.splice(index,1)

				find(value._id,data);
				
			}

		})

	}


}

Controller.$inject = ['$scope','$state','ColumnSer','CommonJs','FileUploader'];