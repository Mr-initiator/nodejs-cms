export default function Controller($scope,$state,SettingSer,CommonJs,FileUploader){

	// 获取登录token
	const Token = window.localStorage.getItem('Token');

	if(!Token){
		$state.go('login');
		return;
	}

	// 表单字段
	$scope.formData = {
		rootDir : '',
		webTitle : '',
		webLogo : '',
		WordLogo : '',
		description : '',
		keywords : '',
		copyright : '',
		recordNumber : '',
		language:'ch'
	}

	// 表单提交
	$scope.submitForm = submitForm;

	// 获取配置
	GetConfig();

	// 文件上传
	uploadfile();

	// 表单提交
	function submitForm(){

		CommonJs.getCurrentLang(Token,function(language){

			// 当前选中语言
			$scope.formData.language = language.lang_field;

			SettingSer.setInfos($scope.formData,Token).then(response=>{

				var response = response.data;

				// 检查令牌是否失效
				if(CommonJs.checkRequestCode(response.code)) return;

				if(!response.code){

					swal("配置写入成功","","success");

					// 获取最新配置
					GetConfig();

				}else{

		  		 	swal("配置写入失败","","error");

				}

			});

		});

	}

	// 获取配置
	function GetConfig(){

		CommonJs.getCurrentLang(Token,function(language){

			SettingSer.getInfo(Token,language.lang_field).then(response=>{

				var response = response.data;

				// 检查令牌是否失效
				if(CommonJs.checkRequestCode(response.code)) return;

				if(!response.code){

					$scope.formData = response.result;

				}else{

					swal("配置获取失败","","error");

				}

			});

		});

	}

	// 文件上传
	function uploadfile(){

		var uploader = $scope.uploader = new FileUploader({
			url: `${CommonJs.SERVER_PATH}fileUpload`
		});

		uploader.onSuccessItem = fileItem => {

			var path = JSON.parse(fileItem._xhr.responseText).file.path.split('server')[1].substr(1);

			$scope.formData.webLogo = path;

		};

		uploader.onErrorItem = fileItem => {

			swal("文件上传失败","","error");

		};

	}


}

Controller.$inject = ['$scope','$state','SettingSer','CommonJs','FileUploader'];