export default angular.module('LanguageService',[])
	.factory('LanguageSer',['$http','CommonJs',($http,CommonJs)=>{
		
		let SERVER_PATH = CommonJs.SERVER_PATH;

		return {

			// 添加语言
			addLanguage(lang_name,lang_field){

				return $http({
					method:'post',
					url:`${SERVER_PATH}language/addLanguage`,
					data:{ lang_name,lang_field }
				})

			},
			// 获取语言列表
			getLanguage(Token){

				return $http({
					method:'get',
					url:`${SERVER_PATH}language/getLanguage`,
					params:{ Token }
				})

			},
			// 设置语言
			selectLang(Token,lang_field){

				return $http({
					method:'get',
					url:`${SERVER_PATH}language/selectLang`,
					params:{ Token,lang_field }
				})

			},
			// 删除语言
			deleteLangById(params){

				return $http({
					method:'get',
					url:`${SERVER_PATH}language/deleteLangById`,
					params:params
				});

			}

		}

	}])
	.name;