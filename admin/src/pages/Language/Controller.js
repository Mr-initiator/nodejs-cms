export default function Controller($scope,$state,LanguageSer,CommonJs){

	// 获取登录token
	const Token = window.localStorage.getItem('Token');

	if(!Token){
		$state.go('login');
		return;
	}

	// 添加语言
	$scope.addLanguage = addLanguage;

	// 语言选择
	$scope.selectLang = selectLang;

	// 语言删除
	$scope.deleteLangById = deleteLangById;

	// 获取语言列表
	getLanguage();

	// 添加语言
	function addLanguage(lang_name,lang_field){
			
		if(!lang_name){

			swal('','请填写语言显示名称');

			return;
		}

		if(!lang_field){

			swal('','请填写语言字段名称');


			return;

		}else{

			var reg = /^[a-zA-Z]+$/g;

			if(!reg.test(lang_field)){

				swal('','字段只能填写字母');

				return;
			}

		}

		LanguageSer.addLanguage(lang_name,lang_field).then(response=>{

			var response = response.data;

			// 检查令牌是否失效
			if(CommonJs.checkRequestCode(response.code)) return;

			if(!response.code){

				$scope.lang_name = '';
				$scope.lang_field = ''; 

				// 获取语言列表
				getLanguage();


			}

			swal('',response.message);

		});

	}

	// 获取语言列表
	function getLanguage(){

		LanguageSer.getLanguage(Token).then(response=>{

			var response = response.data;

			// 检查令牌是否失效
			if(CommonJs.checkRequestCode(response.code)) return;

			if(!response.code){

				$scope.langList = response.result;

			}else{

				swal('',response.message);
				
			}

		})

	}

	// 语言选择
	function selectLang(isChecked,lang_field){

		if(isChecked){

			swal('','所选语言已经是选中状态');

			return;
		}

		LanguageSer.selectLang(Token,lang_field).then(response=>{

			var response = response.data;

			// 检查令牌是否失效
			if(CommonJs.checkRequestCode(response.code)) return;

			if(!response.code){

				getLanguage();

			}

			swal('',response.message);

		});

	}

	// 语言删除
	function deleteLangById(id,lang_field){

		LanguageSer.deleteLangById({ id,lang_field,Token }).then(response=>{

			var response = response.data;

			// 检查令牌是否失效
			if(CommonJs.checkRequestCode(response.code)) return;

			if(!response.code){

				getLanguage();

			}

			swal('',response.message);

		});

	}


}

Controller.$inject = ['$scope','$state','LanguageSer','CommonJs'];