export default angular.module('SettingService',[])
	.factory('SettingSer',['$http','CommonJs',($http,CommonJs)=>{
		
		let SERVER_PATH = CommonJs.SERVER_PATH;

		return {

			// 设置系统信息
			setInfos(data,Token){

				return $http({
					method:'post',
					url:`${SERVER_PATH}settings/setConfig`,
					data:data,
					params:{ Token }
				})

			},
			// 获取系统信息
			getInfo(Token,language){

				return $http({
					method:'get',
					url:`${SERVER_PATH}settings/getConfig`,
					params:{ Token,language }
				})
			},
			// 获取当前选中的语言
			getCurrentLang(Token){

				return $http({
					method:'get',
					url:`${SERVER_PATH}language/getCurrentLang`,
					params:{ Token }
				});

			}

		}

	}])
	.name;