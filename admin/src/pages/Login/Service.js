export default angular.module('LoginService',[])
	.factory('LoginSer',['$http','CommonJs',($http,CommonJs)=>{
		
		let SERVER_PATH = CommonJs.SERVER_PATH;

		return {

			// 登录
			loginIn(formData){

				return $http({
					method : 'post',
					withCredentials: true,
					url : `${SERVER_PATH}login/loginIn`,
					data : formData
				})

			},
			// 检测登录状态是否有效
			validLoginStaus(Token){

				return $http({
					method : 'get',
					url :`${SERVER_PATH}login/validLoginStaus`,
					params : { Token }
				});

			}

		}

	}])
	.name;